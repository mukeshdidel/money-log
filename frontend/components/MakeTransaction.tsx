"use client"
import React from 'react'
import Input from './ui/Input'
import XIcon from '@/Icons/XIcon';
import axios from 'axios';
import { BE_URL } from '@/config/appConfig';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectCategories } from '@/lib/features/categories/categoriesSlice';
import Select from './ui/Select';
import { addTransaction } from '@/lib/features/wallets/walletSlice';

const MakeTransaction = ({setShowForm, walletId}: {setShowForm: React.Dispatch<React.SetStateAction<boolean>>, walletId: number}) => {4

    const categories = useAppSelector(selectCategories);

    const [amount, setAmount] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [isIncome, setIsIncome] = React.useState(false);
    const [categoryId, setCategoryId] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const dispatch = useAppDispatch();

    const makeTransaction = async () => {
        if(loading) return;
        setLoading(true);

        if(categoryId === null) {
            setError('Please select a category for the transaction.');
            return;
        }

        if(description.trim() === '') {
            setError('Please enter a valid description for the wallet.');
            return;
        }        
        try {
            const res = await axios.post(`${BE_URL}/wallet/${walletId}/transaction`, {
                amount, description, isIncome, categoryId
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = res.data;
            setShowForm(false);
            dispatch(addTransaction({walletId, transaction: data}));
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
                <h2 className="text-lg font-medium">Make Transaction</h2>
                <button
                onClick={() => setShowForm(false)}
                className="text-slate-300 hover:text-slate-100 hover:bg-slate-800 p-1 rounded-lg"
                aria-label="Close"
                >
                <XIcon />
                </button>
            </div>

            <div className="space-y-3">
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeHolder='e.g. cash' type='text' label='Description' className='w-full bg-slate-800'  />
                <Input value={amount} onChange={(e) => {
                        const value = Number(e.target.value);
                        setAmount(Math.max(0, value));
                    }} 
                    placeHolder='e.g. 1000' type='number' label='Amount' className='w-full bg-slate-800'  
                />
                <div className='grid grid-cols-2 py-2'>
                    <button
                        className={`px-4 py-1 rounded-md ${isIncome ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-200'}`}
                        onClick={() => setIsIncome(true)}
                    >
                        Income
                    </button>
                    <button
                        className={`px-4 py-1 rounded-md ${!isIncome ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200'} ml-2`}
                        onClick={() => setIsIncome(false)}
                    >
                        Expense
                    </button>
                </div>
                <Select
                    label="Category"
                    className="w-full bg-slate-800"
                    value={categoryId !== null ? categoryId.toString() : ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setCategoryId(value ? Number(value) : null);
                    }}
                    options={categories.map((category) => ({ label: category.name, value: category.categoryId }))}
                    placeHolder="Select a category"
                />
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
                    onClick={makeTransaction}
                >
                    Make transaction
                </button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default MakeTransaction