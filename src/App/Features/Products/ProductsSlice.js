//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usePublicApiClient from '../../../Hook/usePublicApiClient';

const publicApiClient = usePublicApiClient();

const initialState = {
   Products: [],
   IsLoading: false,
   error: null,
};

// Async thunk for fetching products from the API
export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {
   const response = await publicApiClient.get('/products');
   return response.data || [];
});

// Async thunk for deleting a product by ID
export const deleteProductsAsync = createAsyncThunk('products/deleteProductsAsync', async id => {
   const response = await publicApiClient.delete(`/products/${id}`);
   return response.data || [];
});

// Async thunk for creating a new product
export const createProducts = createAsyncThunk('products/createProducts', async products => {
   const response = await publicApiClient.post('/products', products);
   return response || [];
});

// Async thunk for updating an existing product by ID
export const updateProducts = createAsyncThunk(
   'products/updateProducts',
   async ({ id, product }) => {
      const response = await publicApiClient.put(`/products/${id}`, product);
      return response || [];
   },
);

// Slice to manage the products state, including async actions and reducers
const ProductsSlice = createSlice({
   name: 'products',
   initialState,
   extraReducers: builder => {
      // Handling various async action states (pending, fulfilled, rejected)
      builder
         .addCase(fetchProductsAsync.pending, state => {
            // When fetch request is pending
            state.IsLoading = true;
            state.error = null;
         })
         .addCase(fetchProductsAsync.fulfilled, (state, action) => {
            // When fetch request is successful
            state.IsLoading = false;
            state.Products = action.payload;
         })
         .addCase(fetchProductsAsync.rejected, (state, action) => {
            // When fetch request fails
            state.IsLoading = false;
            state.error = action.error.message || 'Failed to load products';
         })
         .addCase(deleteProductsAsync.fulfilled, (state, action) => {
            // When delete product action is fulfilled
            state.Products = state.Products.filter(product => product.id != action.payload);
         })
         .addCase(createProducts.fulfilled, (state, action) => {
            // When create product action is fulfilled
            state.Products.push(action.payload);
         })
         .addCase(updateProducts.fulfilled, (state, action) => {
            // When update product action is fulfilled
            const index = state.Products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
               // Ensure the product exists in the state and update it
               state.Products[index] = { ...state.Products[index], ...action.payload };
            }
         });
   },
});

// Export the reducer to be used in the store
export default ProductsSlice.reducer;
