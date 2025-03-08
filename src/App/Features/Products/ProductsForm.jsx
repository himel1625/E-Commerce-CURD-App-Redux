import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProducts, updateProducts } from './ProductsSlice';
const ProductsForm = ({ editProduct = {}, isEdit = false, resetForm }) => {
   const dispatch = useDispatch();
   const [formData, setFormData] = useState({
      id: '',
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      stock: '',
      rating: '',
   });

   useEffect(() => {
      if (isEdit) {
         setFormData({
            name: editProduct.name ?? '',
            description: editProduct.description ?? '',
            price: editProduct.price ?? '',
            category: editProduct.category ?? '',
            image: editProduct.image ?? '',
            stock: editProduct.stock ?? '',
            rating: editProduct.rating ?? '',
         });
      }
   }, [editProduct]);

   const handleChange = e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = e => {
      e.preventDefault();
      if (editProduct) {
         dispatch(updateProducts({ id: editProduct.id, product: formData }));
         resetForm();
      } else {
         dispatch(createProducts({ ...formData, id: nanoid() }));
      }
   };

   return (
      <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
         <h2 className='text-2xl font-semibold mb-4 text-center'>
            {editProduct ? 'Edit Product' : 'Add Product'}
         </h2>
         <form onSubmit={handleSubmit} className='space-y-4'>
            <input
               type='text'
               name='name'
               placeholder='Product Name'
               value={formData.name}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <textarea
               name='description'
               placeholder='Description'
               value={formData.description}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <input
               type='number'
               name='price'
               placeholder='Price'
               value={formData.price}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <input
               type='text'
               name='category'
               placeholder='Category'
               value={formData.category}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <input
               type='url'
               name='image'
               placeholder='Image URL'
               value={formData.image}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <input
               type='number'
               name='stock'
               placeholder='Stock'
               value={formData.stock}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <input
               type='number'
               name='rating'
               placeholder='Rating'
               step='0.1'
               value={formData.rating}
               onChange={handleChange}
               className='w-full px-4 py-2 border rounded'
               required
            />
            <button
               type='submit'
               className='w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition'
            >
               {isEdit ? 'Update Product' : 'Add Product'}
            </button>
         </form>
      </div>
   );
};

export default ProductsForm;
