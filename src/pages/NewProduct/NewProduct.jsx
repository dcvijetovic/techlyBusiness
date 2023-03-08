import { message } from 'antd';
import { DataStore, Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../../context/ShopContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Product } from '../../models';
import './newProduct.scss';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

const NewProduct = () => {
  const { business } = useShopContext();
  const navigation = useNavigate();
  const [image, setImage] = useState(null);

  const onFileUpload = (e) => {
    setImage(e.target.files[0]);
    uploadFile();
  };

  console.log(image);

  const uploadFile = async (fileUri) => {
    try {
      // const response = await fetch(fileUri);
      const key = `${uuidv4()}.png`;
      await Storage.put(key, image, {
        contentType: 'image/png',
      });
      return key;
    } catch (err) {
      console.log('Error uploading file:', err);
    }
    console.log(fileUri)
  };

  return (
    <div className="container product-container">
      <h2>Add new product</h2>
      <Formik
        initialValues={{ name: '', description: '', price: '' }}
        onSubmit={({ name, description, price }) => {
          DataStore.save(
            new Product({
              name,
              description,
              price,
              businessID: business.id,
              SKU: '111',
              image:
                'https://upload.wikimedia.org/wikipedia/commons/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg',
              _version: 1,
            })
          );
          message.success('Product created.');
          navigation('/products');
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
            <input type="file" onChange={onFileUpload} />
          </label>
          {/* <button onClick={}>Up pic</button> */}
          <button type="submit">Add product</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewProduct;
