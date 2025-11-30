import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
interface Transaction  {
  transactionId: number;
  amount: number;
  isIncome: boolean;
  transactionDate: string;
  description: string;
  walletId: number;
  walletName: string;
  currency: string;
  categoryId: number;
  categoryName: string;
};



const initialState: Transaction[] = [];

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      return action.payload;
    },
  }
})

export const { setTransactions } = transactionSlice.actions
export const selectTransactions = (state: RootState) => state.transactionReducer;

export default transactionSlice.reducer