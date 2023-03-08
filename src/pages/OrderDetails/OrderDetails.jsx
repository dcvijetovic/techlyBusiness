import './orderDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderItems, OrderStatus, User } from '../../models';
import { Spin } from 'antd';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, [id]);

  useEffect(() => {
    if (order?.userID) {
      DataStore.query(User, order?.userID).then(setCustomer);
    }
  }, [order?.userID]);

  useEffect(() => {
    if (!order?.id) {
      return;
    }

    DataStore.query(OrderItems, (c) => c.orderID('eq', order?.id)).then(
      setProducts
    );
  }, [order?.id]);

  const declineOrder = () => {
    updateOrderStatus(OrderStatus.STORE_DECLINED);
  };

  const acceptOrder = () => {
    updateOrderStatus(OrderStatus.STORE_ACCEPTED);
  };

  const readyOrder = () => {
    updateOrderStatus(OrderStatus.STORE_READY);
  };

  const inProgress = () => {
    updateOrderStatus(OrderStatus.STORE_INPROGRESS);
  };

  const problemOrder = () => {
    updateOrderStatus(OrderStatus.STORE_PROBLEM)
  }

  const updateOrderStatus = async (newStatus) => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.order_status = newStatus;
      })
    );
    setOrder(updatedOrder);
    navigation('/');
  };

  if (!order) {
    return <Spin size="large" />;
  }

  return (
    <div className="container order-details-container">
      <h2>{`Order ${id}`}</h2>
      <span className="status">{order?.order_status}</span>
      <div className="grid details">
        <span className="border-bottom border-right">Customer</span>
        <span className="border-bottom">
          {customer?.first_name} {customer?.last_name}
        </span>
        <span className="border-right">Customer Address</span>
        <span>{customer?.address}</span>
      </div>
      <div className="notes">
        <h4>Customer notes:</h4>
        <p>{order?.user_notes}</p>
      </div>
      <div className="products">
        <h3>Products</h3>
        <div className="order-table">
          <span>SKU</span>
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>
        {products.map((product) => (
          <div key={product?.Product?.id} className="order-table-list">
            <span>{product?.Product?.SKU}</span>
            <span>{product?.Product?.name}</span>
            <span>x{product?.quantity}</span>
            <span>${product?.Product?.price}</span>
          </div>
        ))}
      </div>
      <div className="price">
        <h2>Total:</h2>
        <h2>${order?.total?.toFixed(2)}</h2>
      </div>
      {order?.order_status === OrderStatus.NEW && (
        <div className="buttons">
          <button className="danger" onClick={declineOrder}>
            Decline Order
          </button>
          <button className="primary" onClick={acceptOrder}>
            Accept Order
          </button>
        </div>
      )}
      {order?.order_status === OrderStatus.STORE_ACCEPTED && (
        <div>
          <h2>Waiting to be delivered</h2>
        </div>
      )}
      {order?.order_status === OrderStatus.STORE_QUEUED && (
        <button className="primary full-width" onClick={inProgress}>
          Start
        </button>
      )}

      {order?.order_status === OrderStatus.STORE_INPROGRESS && (
        <div className="buttons">
        <button className="danger" onClick={problemOrder}>
          Problem with order
        </button>
        <button className="primary" onClick={readyOrder}>
          Ready for pickup
        </button>

        </div>
      )}
    </div>
  );
};

export default OrderDetails;
