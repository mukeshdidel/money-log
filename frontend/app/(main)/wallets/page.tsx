'use client'

import AddWallet from '@/components/AddWallet'
import { BE_URL } from '@/config/appConfig'
import CardIcon from '@/Icons/CardIcon'
import { selectwallets, setwallets } from '@/lib/features/wallets/walletSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'


const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)

const page = () => {

  const [showForm, setShowForm] = useState(false)
  const wallets = useAppSelector(selectwallets);



  return (
    <div className="h-full text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Wallets</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm flex items-center gap-2 shadow"
            >
              + Add wallet
            </button>
          </div>
        </header>

        <section>


          <div className="grid gap-4 md:grid-cols-2">
            {wallets.length === 0 && (
              <div className="col-span-full text-center text-slate-400 py-12 border border-dashed border-slate-700 rounded-lg">
                No wallets yet — click "Add wallet" to create one
              </div>
            )}

            {wallets.map((w) => (
                <div
                key={w.walletId}
                className="flex flex-col bg-slate-800 border border-slate-700 rounded-2xl p-6  hover:shadow-xl "
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
                                <CardIcon />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-100 tracking-tight">{w.name}</h3>
                                <p className="text-xs text-slate-500 font-medium tracking-wide">{w.currency.toUpperCase()} WALLET</p>
                            </div>
                        </div>
                        <button className="text-slate-600 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-500/10" title="Delete Wallet">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>

                    <div className="mb-2">
                        <div className="text-3xl font-bold text-white tracking-tight">
                        {formatCurrency(w.balance, w.currency)}
                        </div>
                    </div>

                    <div className="grow mb-6">
                        {w.description ? (
                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                                {w.description}
                            </p>
                        ) : (
                            <p className="text-sm text-slate-600 italic">No description</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                        <Link href={`wallets/${w.walletId}`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-900/20">
                            Open Wallet
                        </Link>
                    </div>
                </div>
            ))}
          </div>
        </section>
        </div>
        {showForm && <AddWallet setShowForm={setShowForm} />}
    </div>
  )
}

export default page