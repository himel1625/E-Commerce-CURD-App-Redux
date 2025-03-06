import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Features/Products/ProductsSlice';

const Store = configureStore({
    reducer: {
        productsR: productReducer,
    },
});

export default Store;
