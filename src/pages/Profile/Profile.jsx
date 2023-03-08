import './profile.scss';
import { useEffect, useState } from 'react';
import './profile.scss';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { DataStore } from 'aws-amplify';
import { Business } from '../../models';
import { useShopContext } from '../../context/ShopContext';
import { message } from 'antd';
import Switch from '@mui/material/Switch';

const Profile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [checked, setChecked] = useState(true);

  const { sub, setBusiness, business } = useShopContext();

  console.log(address);

  useEffect((e) => {
    if (business) {
      setName(business?.name);
      setCoordinates({ lat: business?.lat, lng: business?.lng });
      
    }
  }, [business]);


  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };

  // const getAddressLatLng = async (address) => {
  //   setAddress(address);
  //   const geocodedByAddress = await geocodeByAddress(address?.label);
  //   const latLng = await getLatLng(geocodedByAddress[0]);
  //   setCoordinates(latLng);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!business) {
  //     await createBusiness();
  //   } else {
  //     await updateBusiness();
  //   }
  // };

  // const createBusiness = async () => {
  //   const newBusiness = await DataStore.save(
  //     new Business({
  //       name,
  //       image:
  //         'https://www.cell-tech.co.uk/wp-content/uploads/2017/02/IMG_9937-300x225.jpg',
  //       address: address.label,
  //       lat: coordinates.lat,
  //       lng: coordinates.lng,
  //       adminSub: sub,
  //     })
  //   );
  //   setBusiness(newBusiness);
  //   message.success('Shop created.');
  // };

  // const updateBusiness = async () => {
  //   const updatedBusiness = await DataStore.save(
  //     Business.copyOf(business, (updated) => {
  //       updated.name = name;
  //       if (address) {
  //         updated.address = address.label;
  //         updated.lat = coordinates.lat;
  //         updated.lng = coordinates.lng;
  //       }
  //     })
  //   );
  //   setBusiness(updatedBusiness);
  //   message.success('Data updated.');
  // };
 

  return (
    <div className="container profile-container">
      <h2>Profile</h2>
      {/* <div className="container"> */}
      <div className="profile-row">
        <span>Online</span>
        <h4>button</h4>
        
      </div>
      <div className="profile-row">
        <span>Store name</span>
        <h4>{business?.name}</h4>
      </div>
      <div className="profile-row">
        <span>Company</span>
        <h4>{business?.company}</h4>
      </div>
      <div className="profile-row">
        <span>Address</span>
        <h4>{business?.address}</h4>
      </div>
      <div className="profile-row">
        <span>Phone</span>
        <h4>{business?.phone}</h4>
      </div>
      <div className="profile-row">
        <span>Email</span>
        <h4>{business?.email}</h4>
      </div>
      <div className="profile-row">
        <span>Website</span>
        <h4>{business?.website}</h4>
      </div>
      <div className="profile-row">
        <span>Business hours</span>
        <h4>{business?.business_hours}</h4>
      </div>
      <div className="profile-row">
        <span>Shop description</span>
        <h4>{business?.description}</h4>
      </div>
      <div className="profile-image">
        <img src={business?.image} alt="business" />
      </div>
    </div>
    // </div>
  );
};

export default Profile;
