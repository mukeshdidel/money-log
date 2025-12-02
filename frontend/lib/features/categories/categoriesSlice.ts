import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { set } from 'date-fns';

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


const initialState: {
  categories: State[];
  loading: boolean;
  error: string | null;
} = {
  categories: [],
  loading: false,
  error: null
}


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    setCategoriesError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
    },
    setCategories: (state, action: PayloadAction<State[]>) => {
        state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<State>) => {
        state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter(category => category.categoryId !== action.payload);
    },

  } 
})

export const { setCategories, addCategory, removeCategory, setCategoriesError, setCategoriesLoading } = categoriesSlice.actions
export const selectCategories = (state: RootState) => state.categoriesReducer.categories;
export const selectCategoriesLoading = (state: RootState) => state.categoriesReducer.loading;
export const selectCategoriesError = (state: RootState) => state.categoriesReducer.error;

export default categoriesSlice.reducer