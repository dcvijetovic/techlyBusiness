import { Table } from 'antd';
import './orders.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import { useShopContext } from '../../context/ShopContext';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { business } = useShopContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!business) {
      return;
    }
    DataStore.query(Order, (order) =>
      order
        .orderBusinessId('eq', business.id)
        .or((orderStatus) =>
          orderStatus
            .order_status('eq', 'NEW')
            .order_status('eq', 'STORE_ACCEPTED')
            .order_status('eq', 'STORE_PICKUP')
            .order_status('eq', 'USER_PICKUP')
            .order_status('eq', 'USER_PICKED_UP')
            .order_status('eq', 'STORE_QUEUED')
            .order_status('eq', 'STORE_INPROGRESS')
            .order_status('eq', 'STORE_PROBLEM')
            .order_status('eq', 'STORE_READY')
        )
    ).then(setOrders)
  }, [business]);

  useEffect(() => {
    const subscription = DataStore.observe(Order).subscribe((msg) => {
      const { opType, element } = msg;
      if (opType === 'INSERT' && element.orderBusinessId === business?.id) {
        setOrders((existingOrders) => [element, ...existingOrders]);
      }
    });
    return () => subscription.unsubscribe();
  }, [business]);

  const renderOrderStatus = (orderStatus) => {
    const statusToClass = {
      [OrderStatus.NEW]: 'pending',
      [OrderStatus.STORE_ACCEPTED]: 'accepted',
      [OrderStatus.STORE_QUEUED]: 'pending',
      [OrderStatus.STORE_READY]: 'pickup',
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
      render: (createdAt) => `${moment(createdAt).format('LLL')}`,
      sorter: (record1, record2) => {
        return record1.createdAt > record2.createdAt;
      },
      defaultSortOrder: 'descend',
    },
    {
      title: 'Price',
      dataIndex: 'total',
      key: 'total',
      render: (price) => `$ ${price.toFixed(2)}`,
    },
    {
      title: 'Order Status',
      dataIndex: 'order_status',
      key: 'order_status',
      render: renderOrderStatus,
    },
  ];

  return (
    <div className="container orders-container">
      <h2>Orders</h2>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </div>
  );
};

export default Orders;
