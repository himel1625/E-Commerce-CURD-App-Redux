import React, { useState } from 'react';
import ProductsForm from './App/Features/Products/ProductsForm';
import ProductsListView from './App/Features/Products/ProductsListView';

const App = () => {
   const [isEdit, setIsEdit] = useState(false);
   const [editProduct, setEditProduct] = useState({});

   const handleEditProduct = product => {
      setEditProduct(product);
      setIsEdit(true);
   };

   return (
      <div>
         <ProductsForm editProduct={editProduct} isEdit={isEdit} />
         <ProductsListView onEdit={handleEditProduct} />
      </div>
   );
};

export default App;
