import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface State {
  categoryId: number;
  name: string;
  description: string;
  colorCode: string;
  createdByUser: boolean;
  userId: number | null;
  createdAt: string;   
  updatedAt: string;   
}


const initialState: State[] = []


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<State[]>) => {
        return action.payload;
    },
    addCategory: (state, action: PayloadAction<State>) => {
        state.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
        return state.filter(category => category.categoryId !== action.payload);
    },
  } 
})

export const { setCategories, addCategory, removeCategory } = categoriesSlice.actions
export const selectCategories = (state: RootState) => state.categoriesReducer;

export default categoriesSlice.reducer