import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    id: number;
    email: string;
    username: string
    fullName: string;
    loading: boolean;
}

const initialState: UserState = {
    id: -1,
    email: "",
    username: "", 
    fullName: "",
    loading: false,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
        console.log(action);
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.id = action.payload.id;
        state.username = action.payload.username;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    }
  } 
})

export const { setUser, setUserLoading } = userSlice.actions
export const selectUser = (state: RootState) => state.userReducer;
export const selectUserLoading = (state: RootState) => state.userReducer.loading;

export default userSlice.reducer