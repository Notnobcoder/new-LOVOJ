import React, { useState } from "react";
import "./scss/index.scss";
import mainlogo from "../../../assests/images/Logo1.png";
import vector from "../../../assests/images/Vector.svg";
import key from "../../../assests/images/key.svg";
import StorefrontIcon from "@mui/icons-material/Storefront";
import smalllogo from "../../../assests/images/smallogo.svg";
import { NavLink, useNavigate } from "react-router-dom";

// here signin css is applying

import { InputField, Button } from "../../../components";
import { PostApi } from "../../../ApiService/ApiService";
import { AdminLoginApi } from "../../../ApiService/ApiUrls";
export const AdminLogin = () => {
  const navigate = useNavigate();
  const [storeNumber, setStoreNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const AdminLogin1 = async(e) => {
    e.preventDefault();
    let response = await PostApi.postcall({'storeNumber' : storeNumber, 'email' : userName, 'password' : password}, AdminLoginApi);

    console.log(response.status);
    if (response.status === 200){
      localStorage.setItem('tailor', response.data);
      navigate('/admin/'+storeNumber);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-100 min-h-screen">
      <div className="my-2">
        <NavLink to={"/"}>
          <img src={mainlogo} alt="logo" className="w-40" />
        </NavLink>
      </div>
      <div className="signup-cont py-2">
        <div className="subheading my-2">
          <h2 className="uppercase">Admin</h2>
        </div>
        <div className="text-input py-2">
          <InputField
            placeholder="Enter Registered Email"
            type="email"
            height="50px"
            onChange={ (e) => { setUserName(e.target.value) } }
            icons={
              <img
                src={vector}
                alt="message"
                className="absolute top-5 right-4"
              />
            }
          />
        </div>
        <div className="password-input py-2">
          <InputField
            placeholder="Enter Your Password"
            type="password"
            height="50px"
            onChange={ (e) => { setPassword(e.target.value) } }
            icons={
              <img src={key} alt="key" className="absolute top-5 right-4" />
            }
          />
        </div>
        <div className="text-input py-2">
          <InputField
            placeholder="Enter Store Number"
            type="number"
            height="50px"
            value = { storeNumber }
            onChange={ (e) => { setStoreNumber(e.target.value) } }
            icons={<StorefrontIcon className="absolute top-3 right-4 z-30" style={{color: '#0172b6'}} />}
          />
        </div>
        <div className="button my-4">
          <Button value={"Login"} onClick = { (e) => { AdminLogin1(e) } } />
        </div>
        <div className="link-account my-2 mt-3">
        <span>
          Forget <NavLink to={"ForgetAdminPassword"}>Password?</NavLink>
          &nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp; Forget{" "}
          <NavLink to={"ForgetAdminStoreNub"}>Store Number?</NavLink>
        </span>
      </div>
      </div>
      <div className="small-logo">
        <img src={smalllogo} alt="logo" />
      </div>
    
    </div>
  );
};
