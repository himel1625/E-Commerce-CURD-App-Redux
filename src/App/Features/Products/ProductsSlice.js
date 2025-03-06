import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Products: [],
    IsLoading: false,
    error: null,
};

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        //
    },
});

export default ProductsSlice.reducer;
