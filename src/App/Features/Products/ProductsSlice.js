import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchProducts from '../../../Api/fetchProducts';

const initialState = {
    Products: [],
    IsLoading: false,
    error: null,
};

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetchProducts();
        return response || [];
    },
);

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchProductsAsync.pending, state => {
                state.IsLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.IsLoading = false;
                state.Products = action.payload;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.IsLoading = false;
                state.error = action.error.message || 'Failed to load products';
            });
    },
});

export default ProductsSlice.reducer;
