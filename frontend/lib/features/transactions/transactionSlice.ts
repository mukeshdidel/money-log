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



const initialState: {
  loading: boolean;
  error: string | null;
  transactions: Transaction[];
} = {
  loading: false,
  error: null,
  transactions: [],
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTransactionsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  }
})

export const { setTransactions, setTransactionsLoading, setTransactionsError } = transactionSlice.actions
export const selectTransactions = (state: RootState) => state.transactionReducer.transactions;
export const selectTransactionsLoading = (state: RootState) => state.transactionReducer.loading;
export const selectTransactionsError = (state: RootState) => state.transactionReducer.error;

export default transactionSlice.reducer