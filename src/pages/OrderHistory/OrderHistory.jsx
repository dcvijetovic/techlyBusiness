import { Table } from 'antd';
import './orderHistory.scss';

import { useEffect, useState } from 'react';
import { useShopContext } from '../../context/ShopContext';
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { business } = useShopContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!business) {
      return;
    }
    DataStore.query(Order, (order) =>
      order
        .orderBusinessId('eq', business?.id)
        .or((orderStatus) =>
          orderStatus
            .order_status('eq', 'STORE_PICKEDUP')
            .order_status('eq', 'DELIVERED')
            .order_status('eq', 'STORE_DECLINED')
        )
    ).then(setOrders);
  }, [business]);

  const renderOrderStatus = (orderStatus) => {
    const statusToClass = {
      [OrderStatus.STORE_PICKEDUP]: 'pending',
      [OrderStatus.DELIVERED]: 'accepted',
      [OrderStatus.STORE_DECLINED]: 'pickup',
    };

    return <span className={statusToClass[orderStatus]}>{orderStatus}</span>;
  };

  const tableColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Price',
      dataIndex: 'total',
      key: 'total',
      render: (price) => `$ ${price?.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      render: renderOrderStatus,
    },
  ];

  return (
    <div className="container order">
      <h2>Order History</h2>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`/order/${orderItem.id}`),
        })}
      />
    </div>
  );
};

export default OrderHistory;
