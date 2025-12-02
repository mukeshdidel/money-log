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


const initialState: {
  wallets: State[];
  loading: boolean;
  error: string | null;
} = {
  wallets: [],
  loading: false,
  error: null
};


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWalletsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWallets: (state, action: PayloadAction<State[]>) => {
      state.wallets = action.payload;
      return state;
    }, 
    addWallet: (state, action: PayloadAction<State>) => {
      state.wallets.push(action.payload);
    },
    removeWallet: (state, action: PayloadAction<number>) => {
      state.wallets = state.wallets.filter(wallet => wallet.walletId !== action.payload);
    },
    addTransaction: (state, action: PayloadAction<{walletId: number, transaction: State['transactions'][0]}>) => {
      const { walletId, transaction } = action.payload;
      const wallet = state.wallets.find(w => w.walletId === walletId);
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

export const { setWallets, setWalletsLoading, setWalletsError, addWallet, removeWallet, addTransaction } = walletSlice.actions
export const selectwallets = (state: RootState) => state.walletReducer.wallets;
export const selectWalletById = (walletId: number) => (state: RootState) => 
    state.walletReducer.wallets.find(wallet => wallet.walletId === walletId);
export const selectWalletsLoading = (state: RootState) => state.walletReducer.loading;
export const selectWalletsError = (state: RootState) => state.walletReducer.error;

export default walletSlice.reducer