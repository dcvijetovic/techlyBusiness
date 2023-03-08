import { DataStore } from 'aws-amplify';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../models';

const ProductContext = createContext({});

const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState('')
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      DataStore.query(Product, (c) => c.productID('eq', id)).then(setProduct);
    }
  }, [id]);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

export const useProductContext = () => useContext(ProductContext);
