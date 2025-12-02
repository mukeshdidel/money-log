"use client"
import { BE_URL } from '@/config/appConfig';
import { selectTransactions, selectTransactionsLoading, setTransactions, setTransactionsError, setTransactionsLoading } from '@/lib/features/transactions/transactionSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

const Page = () => {

    const transactions = useAppSelector(selectTransactions)
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const loading = useAppSelector(selectTransactionsLoading);

    const dispatch = useAppDispatch();

    const fetchTransactions = async () => {
        dispatch(setTransactionsLoading(true));
        try {
            const res = await  axios.get(`${BE_URL}/transaction`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(setTransactions(res.data));

        } catch (error) {
            console.log(error);
            dispatch(setTransactionsError("Failed to fetch transactions"));
        }
        finally {
            dispatch(setTransactionsLoading(false));
        }
    }

    useEffect(()=>{
        fetchTransactions();
    }, [dispatch])

    const filteredTransactions = transactions.filter(tx => {
        if (filter === 'income') return tx.isIncome;
        if (filter === 'expense') return !tx.isIncome;
        return true;
    });

    return (
        <div className="min-h-screen text-slate-200 lg:p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-white tracking-tight">Recent Activity</h2>
                    <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-800 backdrop-blur-sm">
                        {(['all', 'income', 'expense'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition-all duration-200 ${
                                    filter === f 
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                
                {
                loading ? <div className='space-y-3'>
                    {[1,2,3,4,5].map((_, idx) => ( <Skeleton key={idx} height={80} borderRadius={16} /> ))}
                </div> 
                : 
                <div className="space-y-3">
                    {!filteredTransactions || filteredTransactions.length === 0 ? (
                        <div className="py-20 text-center border border-dashed border-slate-800 rounded-xl">
                            <p className="text-slate-500">No transactions found</p>
                        </div>
                    ) : (
                        filteredTransactions.map((tx) => {

                            return (
                                <div 
                                    key={tx.transactionId} 
                                    className="relative bg-slate-800 rounded-2xl p-4 cursor-pointer overflow-hidden"
                                >
                                    <div className="flex items-center justify-between gap-4 relative z-10">
                                        <div className="flex items-center gap-4">
                                        
                                            <div className={`p-3 rounded-full flex items-center justify-center border transition-colors ${
                                                tx?.isIncome 
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500/20' 
                                                    : 'bg-rose-500/10 border-rose-500/20 text-rose-500 group-hover:bg-rose-500/20'
                                            }`}>
                                                {tx?.isIncome ? <TrendingUp /> : <TrendingDown /> }
                                                
                                            </div>
                                            
                                            <div className="flex flex-col gap-0.5">
                                                <h4 className="font-semibold text-slate-100 text-sm md:text-base tracking-wide">
                                                    {tx.description}
                                                </h4>
                                                
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    {tx.categoryName && (
                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border bg-slate-700 border-slate-600 text-slate-300 bg-opacity-30`}>
                                                            {tx.categoryName}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <div className={`font-bold text-base md:text-lg tracking-tight tabular-nums ${
                                                tx.isIncome ? 'text-emerald-500' : 'text-red-500'
                                            }`}>
                                                {tx.isIncome ? '+' : '-'}
                                                {tx.amount} {tx.currency}
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                                {tx.walletName} &bull; {new Date(tx.transactionDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
                }
            </div>
        </div>
    )
}

export default Page;