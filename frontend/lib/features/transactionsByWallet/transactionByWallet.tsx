import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

 interface State {
  walletId: number;
  name: string;
  balance: number;
  currency: string;
  description: string;
  updatedAt: string;
  transactions: {
    transactionId: number;
    amount: number;
    isIncome: boolean;
    transactionDate: string;
    description: string;
    createdAt: string;
    updatedAt: string | null;
    category: {
      categoryId: number;
      name: string;
      description: string;
      colorCode: string;
      createdByUser: boolean;
      userId: number | null;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}


const initialState: State = {
    walletId: -1,
    name: "",
    balance: 0,
    currency: "",
    description: "",
    updatedAt: "",
    transactions: []
}


export const transactionByWallet = createSlice({
  name: 'transactionByWallet',
  initialState,
  reducers: {
    setTransactionByWallet: (state, action: PayloadAction<State>) => {
        state.walletId = action.payload.walletId;
        state.name = action.payload.name;
        state.balance = action.payload.balance;
        state.currency = action.payload.currency;
        state.description = action.payload.description;
        state.updatedAt = action.payload.updatedAt;
        state.transactions = action.payload.transactions;
    }
  } 
})

export const { setTransactionByWallet } = transactionByWallet.actions
export const selectTransactionByWallet = (state: RootState) => state.transactionByWalletReducer;

export default transactionByWallet.reducer