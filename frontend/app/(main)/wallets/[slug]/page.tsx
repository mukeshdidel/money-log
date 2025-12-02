'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import TransactionHistory from '@/components/TransactionHistory'
import { selectWalletById, selectWalletsLoading } from '@/lib/features/wallets/walletSlice'
import { useState } from 'react'
import MakeTransaction from '@/components/MakeTransaction'
import { CreditCard } from 'lucide-react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'


const page = () => {

    const {slug} = useParams();
    const [showForm, setShowForm] = useState(false)
    const router = useRouter();
    const wallet = useAppSelector(selectWalletById(Number(slug)))!;
    const isWalletsLoading = useAppSelector(selectWalletsLoading);  
    
    
    return (
        <div className="h-full text-slate-100 lg:p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <button 
                    onClick={() => router.back()} 
                    className="hover:text-slate-300 transition-colors flex items-center gap-1"
                >
                Back to Wallets
                </button>
                <span>/</span>
                <span className="text-slate-300">{wallet?.name}</span>
            </div>

            <div className="relative overflow-hidden bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    
                    <div className="flex items-start gap-2 lg:gap-5">
                        {isWalletsLoading ? <Skeleton height={55} borderRadius={16} /> :
                        <div className="p-4 rounded-lg lg:rounded-2xl bg-slate-700/50 border border-slate-600 flex items-center justify-center text-emerald-400 shadow-inner">
                             <CreditCard  /> 
                        </div>
                        }
                        <div >
                            <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-white mb-1">{isWalletsLoading ? <Skeleton width={200} /> : wallet?.name}</h1>
                            <div className="flex items-center text-sm">
                                {isWalletsLoading ? <Skeleton  /> :
                                <span className="bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700 text-slate-400 font-mono">
                                    { wallet?.currency}
                                </span>
                                }       
                            </div>
                            <p className="mt-3 text-slate-400 max-w-lg leading-relaxed">{isWalletsLoading ? <Skeleton width={200} /> : wallet?.description}</p>
                            
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                        <div className="text-right">
                            <p className="text-slate-400 text-sm font-medium mb-1">{isWalletsLoading ? <Skeleton width={100} /> : "Total Balance"}</p>
                            {isWalletsLoading ? <Skeleton width={250} height={30} /> :
                            <div className="text-2xl lg:text-4xl font-bold text-white tracking-tight">
                                { wallet?.currency} {wallet?.balance.toFixed(2)}
                            </div>
                            }
                        </div>
                        
                        <div className="flex gap-3 w-full md:w-auto">
                            {isWalletsLoading ? <Skeleton width={200} height={40} /> :
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                                onClick={() => setShowForm(true)}
                            >
                                Make Transaction
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <TransactionHistory walletId={Number(slug)}  />
            {showForm && <MakeTransaction setShowForm={setShowForm} walletId={Number(slug)} />}
        </div>
    )
}

export default page