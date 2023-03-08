import { DataStore } from 'aws-amplify';
import { Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../models';
import './editProducts.scss';
import { useShopContext } from '../../context/ShopContext';
import { message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext';

export const EditProducts = () => {
  const { id } = useParams();
  // const {product, setProduct} = useProductContext()
  // const { shop } = useShopContext();
  // const navigation = useNavigate();

  const [product, setProduct] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState(null);

  useEffect(() => {
    if (id) {
      DataStore.query(Product, id).then(setProduct);
    }
  }, [id]);

  // console.log(id, product?.name);
  // const [name, setName] = useState(product?.name);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await updateProduct();
  // };

  // const updateProduct = async () => {
  //   const updatedProduct = await DataStore.save(
  //     Product.copyOf(product, (updated) => {
  //       updated.name = name;
  //       updated.description = description;
  //       updated.price = price;
  //     })
  //   );
  //   setProduct(updatedProduct)
  //   message.success('Product updated.')
  //   // console.log(setProduct)
  // };

  return (
    <div className="container profile-container">
      {/* <h2>Edit product</h2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
        }}
        onSubmit={({ name, description, price }) => {
          const updatedProduct = DataStore.save(
            Product.copyOf(product, (updated) => {
              updated.name = name;
              updated.description = description;
              updated.price = price;
            })
          );
          setProduct(updatedProduct);
          message.success('Product updated.');
          // navigation('/products');
          console.log(Product);
        }}
      >
        <Form>
          <label>
            <span>Title</span>
            <Field type="text" name="name" required />
          </label>
          <label>
            <span>Description</span>
            <Field as="textarea" name="description" />
          </label>
          <label>
            <span>Price $</span>
            <Field type="number" name="price" required />
          </label>
          <label>
            <span>Image</span>
            <input type="file" />
          </label>
          <button type="submit">Add product</button>
        </Form>
      </Formik> */}

      <h2>Product</h2>
      <div className="profile-row">
        <span>Product name:</span>
        <h4>{product?.name}</h4>
      </div>
      <div className="profile-row">
        <span>Product SKU:</span>
        <h4>{product?.SKU}</h4>
      </div>
      <div className="profile-row">
        <span>Product price:</span>
        <h4>$ {product?.price}</h4>
      </div>
      <div className="profile-row">
        <span>Product available:</span>
        <h4>button</h4>
      </div>
      <div className="profile-row">
        <span>Product description:</span>
        <h4>{product?.description}</h4>
      </div>
      <div className="profile-image">
        <img src={product?.image} alt="product" />
      </div>
    </div>
  );
};
