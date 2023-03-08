import { Auth, DataStore } from 'aws-amplify';
import { createContext, useContext, useEffect, useState } from 'react';
import { Business } from '../models';

const ShopContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [business, setBusiness] = useState();
  const sub = user?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }

    DataStore.query(Business, (s) => s.adminSub('eq', sub)).then((businesses) =>
      setBusiness(businesses[0])
    );
  }, [sub]);

  return (
    <ShopContext.Provider value={{ business, sub, setBusiness }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

export const useShopContext = () => useContext(ShopContext);
 