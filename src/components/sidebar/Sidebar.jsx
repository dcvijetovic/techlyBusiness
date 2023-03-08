import { Auth } from 'aws-amplify';
import { NavLink, Link } from 'react-router-dom';
import { useShopContext } from '../../context/ShopContext';
import './sidebar.scss';
// @mui
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

const Sidebar = () => {
  const { business } = useShopContext();

  const logout = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  const businessNavLinks = [
    { path: '/', label: 'Orders' },
    { path: 'order/history', label: 'Order History' },
    { path: 'products', label: 'Products' },
  ];

  const navLinks = [
    ...(business ? businessNavLinks : []),
    { path: 'profile', label: 'Profile' },
  ];

  return (
    <>
      <nav>
        <div className="top">
          <Link to="/">
            <div className="logo">
              <BuildCircleOutlinedIcon />
              <span>Techly</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="shop">{business && <span>{business.name}</span>}</div>
          </Link>
          <ul className="links">
            {navLinks.map((item) => (
              <NavLink to={item.path} className="" key={item.path}>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </ul>
        </div>
        <div>
          <ul className="bottom">
            <Link to="/help">
              <HelpOutlineRoundedIcon />
              <span>Help</span>
            </Link>
            <button className="logout" onClick={logout}>
              <LogoutOutlinedIcon />
              <span>Log Out</span>
            </button>
          </ul>
        </div>
      </nav>

      {/* <nav>
      <h2>GoTeck</h2>
      {shop && <h2>{shop.name}</h2>}
      <ul>
        {navLinks.map((item) => (
          <NavLink to={item.path} className="" key={item.path}>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </ul>
      <ul>
        <button onClick={logout}>Log Out</button>
      </ul>
    </nav> */}
    </>
  );
};

export default Sidebar;
