'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import CardIcon from '@/Icons/CardIcon' // Ensure this path is correct for your project
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectTransactionByWallet, setTransactionByWallet } from '@/lib/features/transactionsByWallet/transactionByWallet'
import axios from 'axios'
import { BE_URL } from '@/config/appConfig'


// const formatCurrency = (value: number, currency = 'USD') =>
//   new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const page = () => {
    const {slug} = useParams();
  
    const router = useRouter();
    const wallet = useAppSelector(selectTransactionByWallet);
    const dispatch = useAppDispatch();
    
    const fetchWallet = async () => {
        const res = await axios.get(`${BE_URL}/wallet/${slug}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(setTransactionByWallet(res.data));
    }
    
    useEffect(()=>{
        fetchWallet();
    }, [dispatch])


    return (
        <div className="h-full text-slate-100 p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <button 
                onClick={() => router.back()} 
                className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back to Wallets
            </button>
            <span>/</span>
            <span className="text-slate-300">{wallet.name}</span>
        </div>

        <section className="relative overflow-hidden bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-slate-700/50 border border-slate-600 flex items-center justify-center text-emerald-400 shadow-inner">
                        <CardIcon  />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">{wallet.name}</h1>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700 text-slate-400 font-mono">
                                {wallet.currency}
                            </span>
                            {/* <span className="text-slate-500">Last updated: {formatDate(wallet.updatedAt)}</span> */}
                        </div>
                        {wallet.description && (
                            <p className="mt-3 text-slate-400 max-w-lg leading-relaxed">{wallet.description}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                    <div className="text-right">
                        <p className="text-slate-400 text-sm font-medium mb-1">Total Balance</p>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            {wallet.currency} {wallet.balance.toFixed(2)}
                        </div>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Add Money
                        </button>
                        <button className="flex-1 md:flex-none px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium text-sm transition-all border border-slate-600 flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Transaction History</h2>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">View All</button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                {!wallet.transactions || wallet.transactions.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <p>No transactions found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {wallet.transactions.map((tx) => (
                            <div key={tx.transactionId} className="group p-4 flex items-center justify-between hover:bg-slate-800/80 transition-colors cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                                        tx.isIncome 
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500/20' 
                                            : 'bg-rose-500/10 border-rose-500/20 text-rose-500 group-hover:bg-rose-500/20'
                                    }`}>
                                        {tx.isIncome ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <p className="font-medium text-slate-200">
                                            {tx.description || tx.category?.name || 'Untitled Transaction'}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {/* <p className="text-xs text-slate-500">{formatDate(tx.date)}</p> */}
                                            {tx.category && (
                                                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                                                    {tx.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Amount */}
                                <div className={`text-right font-bold tracking-tight ${
                                    tx.isIncome ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                    {tx.isIncome ? '+' : '-'} {wallet.currency.toUpperCase()} {tx.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
        </div>
    )
}

export default page