import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usePublicApiClient from '../../../Hook/usePublicApiClient';

const publicApiClient = usePublicApiClient();
const initialState = {
    Products: [],
    IsLoading: false,
    error: null,
};

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await publicApiClient.get('/products');
        return response.data || [];
    },
);

export const deleteProductsAsync = createAsyncThunk(
    'products/deleteProductsAsync',
    async id => {
        const response = await publicApiClient.delete(`/products/${id}`);
        return response.data || [];
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
            })
            .addCase(deleteProductsAsync.fulfilled, (state, action) => {
                state.Products = state.Products.filter(
                    product => product.id != action.payload,
                );
            });
    },
});

export default ProductsSlice.reducer;
