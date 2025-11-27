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


const initialState: State[] = [];


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setwallets: (state, action: PayloadAction<State[]>) => {
      state = action.payload;
      return state;
    }, 
    addWallet: (state, action: PayloadAction<State>) => {
      state.push(action.payload);
    },
    removeWallet: (state, action: PayloadAction<number>) => {
      return state.filter(wallet => wallet.walletId !== action.payload);
    },
    addTransaction: (state, action: PayloadAction<{walletId: number, transaction: State['transactions'][0]}>) => {
      const { walletId, transaction } = action.payload;
      const wallet = state.find(w => w.walletId === walletId);
      if (wallet) {
        wallet.transactions.push(transaction);
        if (transaction.isIncome) {
          wallet.balance += transaction.amount;
        } else {
          wallet.balance -= transaction.amount;
        }
      } 
    },
  }
})

export const { setwallets, addWallet, removeWallet, addTransaction } = walletSlice.actions
export const selectwallets = (state: RootState) => state.walletReducer;
export const selectWalletById = (walletId: number) => (state: RootState) => 
    state.walletReducer.find(wallet => wallet.walletId === walletId);

export default walletSlice.reducer