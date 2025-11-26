import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    id: number;
    email: string;
    username: string
    fullName: string;
}

const initialState: UserState = {
    id: -1,
    email: "",
    username: "", 
    fullName: ""
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
    }
  } 
})

export const { setUser } = userSlice.actions
export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer