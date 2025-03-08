import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../Components/Spinner/LoadingSpinner';
import { deleteProductsAsync, fetchProductsAsync } from './ProductsSlice';

const ProductsListView = ({ onEdit }) => {
   const { Products, IsLoading, error } = useSelector(state => state.productsR);

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
      <div className='p-6 bg-gradient-to-r from-[#f0f4f8] to-[#e2e8f0] min-h-screen'>
         <h2 className='text-4xl font-bold mb-8 text-center text-[#2F4F6F]'>🌟 Product List 🌟</h2>
         {Products && Products.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
               {Products.map(product => (
                  <div
                     key={product.id}
                     className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-2xl flex flex-col'
                     style={{ height: '100%' }}
                  >
                     <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-56 object-cover'
                     />
                     <div className='p-5 bg-gradient-to-b from-white to-[#f9fafb] flex flex-col flex-grow'>
                        <h3 className='text-xl font-semibold text-[#9538e2] mb-2'>
                           {product.name}
                        </h3>
                        <p className='text-gray-700 mb-3 flex-grow'>{product.description}</p>
                        <p className='text-lg font-semibold text-[#22c55e] mb-4'>
                           ${product.price}
                        </p>
                        <div className='mb-4'>
                           <p className='text-sm text-gray-500'>
                              <strong>Category:</strong> {product.category}
                           </p>
                           <p className='text-sm text-gray-500'>
                              <strong>In Stock:</strong> {product.stock}
                           </p>
                        </div>
                        <div className='flex gap-2 mt-auto'>
                           <button
                              onClick={() => onEdit(product)}
                              className='h-10 w-full bg-gradient-to-r from-[#34d399] to-[#10b981] text-white rounded-xl hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#059669] transition-colors duration-300 shadow-md'
                           >
                              ✏️ Edit
                           </button>
                           <button
                              onClick={() => dispatch(deleteProductsAsync(product.id))}
                              className='h-10 w-full bg-gradient-to-r from-[#f87171] to-[#ef4444] text-white rounded-xl hover:bg-gradient-to-r hover:from-[#ef4444] hover:to-[#dc2626] transition-colors duration-300 shadow-md'
                           >
                              🗑️ Delete
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className='text-center text-gray-600'>No products found.</div>
         )}
      </div>
   );
};

export default ProductsListView;
