import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletState {
    walletId: number;
    name: string;
    balance: number;
    currency: string;
    description: string;
    updatedAt: string;
}

const initialState: WalletState[] = []


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallets: (state, action: PayloadAction<WalletState[]>) => {
        console.log(action);
    ;
        state = action.payload.map((wallet) => ({
            walletId: wallet.walletId,
            name: wallet.name,
            balance: wallet.balance,
            currency: wallet.currency,
            description: wallet.description,
            updatedAt: wallet.updatedAt
        }));
        return state;
    }
  } 
})

export const { addWallets } = walletSlice.actions
export const selectWallets = (state: RootState) => state.walletReducer;

export default walletSlice.reducer