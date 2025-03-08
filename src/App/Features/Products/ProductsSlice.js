//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usePublicApiClient from '../../../Hook/usePublicApiClient';

// Initialize the public API client hook
const publicApiClient = usePublicApiClient();

// Initial state for the products slice
const initialState = {
   Products: [], // List of products
   IsLoading: false, // Loading state to indicate if data is being fetched
   error: null, // Error state for handling any fetch-related issues
};

// Async thunk for fetching products from the API
export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {
   const response = await publicApiClient.get('/products'); // Fetch products from the backend
   return response.data || []; // Return the product data or an empty array if no data is returned
});

// Async thunk for deleting a product by ID
export const deleteProductsAsync = createAsyncThunk('products/deleteProductsAsync', async id => {
   const response = await publicApiClient.delete(`/products/${id}`); // Delete product using the product ID
   return response.data || []; // Return response data or an empty array
});

// Async thunk for creating a new product
export const createProducts = createAsyncThunk('products/createProducts', async products => {
   const response = await publicApiClient.post('/products', products); // Create a new product
   return response || []; // Return the response or an empty array
});

// Async thunk for updating an existing product by ID
export const updateProducts = createAsyncThunk(
   'products/updateProducts',
   async ({ id, product }) => {
      const response = await publicApiClient.put(`/products/${id}`, product); // Update the product by its ID
      return response || {}; // Return the updated response or an empty array
   },
);

// Slice to manage the products state, including async actions and reducers
const ProductsSlice = createSlice({
   name: 'products', // Slice name
   initialState, // The initial state for the slice
   extraReducers: builder => {
      // Handling various async action states (pending, fulfilled, rejected)
      builder
         .addCase(fetchProductsAsync.pending, state => {
            // When fetch request is pending
            state.IsLoading = true; // Set loading state to true
            state.error = null; // Reset any existing errors
         })
         .addCase(fetchProductsAsync.fulfilled, (state, action) => {
            // When fetch request is successful
            state.IsLoading = false; // Set loading state to false
            state.Products = action.payload; // Set products data to the state
         })
         .addCase(fetchProductsAsync.rejected, (state, action) => {
            // When fetch request fails
            state.IsLoading = false; // Set loading state to false
            state.error = action.error.message || 'Failed to load products'; // Set error message
         })
         .addCase(deleteProductsAsync.fulfilled, (state, action) => {
            // When delete product action is fulfilled
            state.Products = state.Products.filter(product => product.id != action.payload); // Remove deleted product
         })
         .addCase(createProducts.fulfilled, (state, action) => {
            // When create product action is fulfilled
            state.Products.push(action.payload); // Add new product to the state
         })
         .addCase(updateProducts.fulfilled, (state, action) => {
            // When update product action is fulfilled
            const index = state.Products.findIndex(product => product.id === action.payload.id); // Find the product index by ID
            if (index !== -1) {
               // Ensure the product exists in the state
               state.Products[index] = action.payload; // Update the product data in the state
            }
         });

   },
});

// Export the reducer to be used in the store
export default ProductsSlice.reducer;
