import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../Components/Spinner/LoadingSpinner';
import { fetchProductsAsync } from './ProductsSlice';

const ProductsListView = () => {
    const { Products, IsLoading, error } = useSelector(
        state => state.productsR,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    if (IsLoading) {
        return (
            <div className='text-center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <div className='text-center text-red-500'>Error: {error}</div>;
    }

    return (
        <div className='p-4'>
            <h2 className='text-3xl font-semibold mb-6'>Product List</h2>
            {Products && Products.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {Products.map(product => (
                        <div
                            key={product.id}
                            className='bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200'
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className='w-full h-48 object-cover'
                            />
                            <div className='p-4'>
                                <h3 className='text-xl font-semibold text-gray-900'>
                                    {product.name}
                                </h3>
                                <p className='text-gray-700 mt-2'>
                                    {product.description}
                                </p>
                                <p className='text-lg font-semibold mt-4 text-green-600'>
                                    ${product.price}
                                </p>
                                <div className='mt-4'>
                                    <p className='text-sm text-gray-500'>
                                        <strong>Category:</strong>{' '}
                                        {product.category}
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        <strong>In Stock:</strong>{' '}
                                        {product.stock}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center'>No products found.</div>
            )}
        </div>
    );
};

export default ProductsListView;
