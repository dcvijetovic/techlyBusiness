import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import ShopContextProvider from './context/ShopContext';
import ProductContextProvider from './context/ProductContext';

Amplify.configure(awsconfig);

function App() {
  return (
    <ShopContextProvider>
      <ProductContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ProductContextProvider>
    </ShopContextProvider>
  );
}

export default withAuthenticator(App);
