"use client"
import React from 'react'
import Input from './ui/Input'
import XIcon from '@/Icons/XIcon';
import axios from 'axios';
import { BE_URL } from '@/config/appConfig';
import { useAppDispatch } from '@/lib/hooks';
import { addWallet } from '@/lib/features/wallets/walletSlice';

const AddWallet = ({setShowForm}: {setShowForm: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [name, setName] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    const [currency, setCurrency] = React.useState('USD');
    const [description, setDescription] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const dispatch = useAppDispatch();

    const createsWallet = async () => {
        if(loading) return;
        setLoading(true);
    
        if(name.trim() === '') {
            setError('Please enter a valid name for the wallet.');
            return;
        }

        if(currency.trim() === '') {
            setError('Please enter a valid currency for the wallet.');
            return;
        }

        if(description.trim() === '') {
            setError('Please enter a valid description for the wallet.');
            return;
        }        
        try {
            const res = await axios.post(`${BE_URL}/wallet`, {
                name, balance, description, currency
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = res.data;
            setShowForm(false);
            dispatch(addWallet(data));
        } catch (error) {
            setError('Failed to add wallet. Please try again.'); 
        }finally {
            setLoading(false);
        }

    }

  return (
    <div
        className="fixed inset-0 z-40 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
    >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>

        <div className="relative z-50 w-full max-w-md mx-4 bg-slate-900/95 border border-slate-800 rounded-xl p-6 shadow-xl" onClick={(e) => e.stopPropagation()} >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Add Wallet</h2>
                <button
                onClick={() => setShowForm(false)}
                className="text-slate-300 hover:text-slate-100 hover:bg-slate-800 p-1 rounded-lg"
                aria-label="Close"
                >
                <XIcon />
                </button>
            </div>

            <div className="space-y-3">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeHolder='e.g. cash' type='text' label='Name' className='w-full bg-slate-800'  />
                <Input value={balance} onChange={(e) => {
                        const value = Number(e.target.value);
                        setBalance(Math.max(0, value));
                    }} 
                    placeHolder='e.g. 1000' type='number' label='Balance' className='w-full bg-slate-800'  
                />
                <Input value={currency} onChange={(e) => setCurrency(e.target.value)} placeHolder='e.g. USD' type='text' label='Currency' className='w-full bg-slate-800'  />
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeHolder='e.g. My personal wallet' type='text' label='Description' className='w-full bg-slate-800'  />
                <div className="flex items-center justify-end gap-2 pt-2">
                {error && <p className="text-red-500 mr-auto">{error}</p>}
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-1 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
                    onClick={createsWallet}
                >
                    Create
                </button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default AddWallet