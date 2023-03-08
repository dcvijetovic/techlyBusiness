import { Table, Popconfirm } from 'antd';
import './products.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Product } from '../../models';
import { useShopContext } from '../../context/ShopContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { business } = useShopContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (business?.id) {
      DataStore.query(Product, (c) => c.businessID('eq', business.id)).then(
        setProducts
      );
    }
  }, [business?.id]);

  const deleteProduct = (product) => {
    DataStore.delete(product);
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const editProduct = (product) => {
    navigate(`${product.id}`);
  };

  const tableColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$ ${price}`,
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, item) => (
    //     <>
    //       <Popconfirm
    //         placement="topLeft"
    //         title={'Are you sure you want to delete this product?'}
    //         onConfirm={() => deleteProduct(item)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <button>Delete</button>
    //       </Popconfirm>
    //       <button onClick={() => editProduct(item)}>Edit</button>
    //     </>
    //   ),
    // },
  ];

  return (
    <div className="container products-container">
      <h2>Products</h2>
      {/* <Link to={'new'} className="button">
        Add product
      </Link> */}
      <Table
        dataSource={products}
        columns={tableColumns}
        rowKey="id"
        onRow={(product) => ({
          onClick: () => navigate(`/products/${product.id}`),
        })}
      />
    </div>
  );
};

export default Products;
