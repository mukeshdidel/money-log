"use client"
import DownArrow from '@/Icons/DownArrow';
import UpArrow from '@/Icons/UpArrow';
import React, { useState } from 'react'

// --- Types ---
type Transaction = {
    transactionId: number;
    amount: number;
    isIncome: boolean;
    description: string;
    category: { name: string; color: string } | null;
    date: string;
};

type Wallet = {
    id: number;
    name: string;
    currency: string;
    transactions: Transaction[];
};

// --- Mock Data ---
const MOCK_WALLET: Wallet = {
    id: 1,
    name: "Main Wallet",
    currency: "USD",
    transactions: [
        {
            transactionId: 101,
            amount: 2500.00,
            isIncome: true,
            description: "Monthly Salary",
            category: { name: "Salary", color: "emerald" },
            date: "2023-10-25T09:00:00Z"
        },
        {
            transactionId: 102,
            amount: 45.50,
            isIncome: false,
            description: "Grocery Shopping",
            category: { name: "Food", color: "orange" },
            date: "2023-10-26T14:30:00Z"
        },
        {
            transactionId: 103,
            amount: 12.99,
            isIncome: false,
            description: "Netflix Subscription",
            category: { name: "Entertainment", color: "purple" },
            date: "2023-10-27T10:00:00Z"
        },
        {
            transactionId: 104,
            amount: 150.00,
            isIncome: true,
            description: "Freelance Project",
            category: { name: "Freelance", color: "blue" },
            date: "2023-10-28T16:20:00Z"
        },
        {
            transactionId: 105,
            amount: 60.00,
            isIncome: false,
            description: "Gas Station",
            category: { name: "Transport", color: "yellow" },
            date: "2023-10-29T18:15:00Z"
        },
    ]
};

const Page = () => {

    const wallet = MOCK_WALLET; 
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

    const filteredTransactions = wallet.transactions.filter(tx => {
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
                                                {tx?.isIncome ? <UpArrow /> : <DownArrow /> }
                                                
                                            </div>
                                            
                                            <div className="flex flex-col gap-0.5">
                                                <h4 className="font-semibold text-slate-100 text-sm md:text-base tracking-wide">
                                                    {tx.description}
                                                </h4>
                                                
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    {tx.category && (
                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border bg-slate-700 border-slate-600 text-slate-300 bg-opacity-30`}>
                                                            {tx.category.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <div className={`font-bold text-base md:text-lg tracking-tight tabular-nums ${
                                                tx.isIncome ? 'text-emerald-400' : 'text-slate-200'
                                            }`}>
                                                {tx.isIncome ? '+' : '-'}
                                                {tx.amount} {wallet.currency}
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                                {wallet.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page;