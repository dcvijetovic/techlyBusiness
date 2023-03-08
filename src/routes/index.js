import { useRoutes } from 'react-router-dom';
import ImageUploader from '../components/imageUploader/ImageUploader';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import ActiveOrders from '../pages/ActiveOrders/ActiveOrders';
import { EditProducts } from '../pages/EditProducts/EditProducts';
import NewProduct from '../pages/NewProduct/NewProduct';
import OrderDetails from '../pages/OrderDetails/OrderDetails';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import Orders from '../pages/Orders/Orders';
import Products from '../pages/Products/Products';
import Profile from '../pages/Profile/Profile';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Orders /> },
        {path: 'order/active', element: <ActiveOrders/>},
        { path: 'order/:id', element: <OrderDetails /> },
        { path: 'order/history', element: <OrderHistory /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:id', element: <EditProducts /> },
        { path: 'products/new', element: <NewProduct /> },
        { path: 'profile', element: <Profile /> },
        { path: 'upload', element: <ImageUploader /> },
      ],
    },
  ]);
}
