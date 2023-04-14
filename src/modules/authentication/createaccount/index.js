import React, { useState } from "react";
import "./scss/index.scss";
import { InputField, Button } from "../../../components";
import { useParams, NavLink } from "react-router-dom";
import mainlogo from "../../../assests/images/Logo1.png";
// import home from "../../../assests/images/home.jpeg";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { AddTailor, CheckEmail } from "../../../ApiService/ApiUrls";
import { PostApi } from '../../../ApiService/ApiService';
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storename, setStoreName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZip] = useState('');
  const [phone , setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [profile, setProfile] = useState('');
  const [aboutus, setAboutUs] = useState('');
  // console.log(match.params);
  const theme = useTheme();

  const { userwork } = useParams();
  // console.log(userwork.replace(/ /g, ""));
  const [personName, setPersonName] = useState("");
  // const [age, setAge] = React.useState('');
  const [open, setOpen] = useState(false);
  const [urlparams, seturlParams] = useState(userwork);
  // console.log(useParams === "Sticting Factory");
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const EmailCheck = (e) => {
    let val = e.target.value;
    if (val.includes('@gmail.com')){
    setTimeout(() => {
      EmailChecking(val);
      }, 1000);
    }
  }

  const EmailChecking = async(e) => {
      let response = await PostApi.postcall({ 'email' : e }, CheckEmail)
      console.log(response.status)
      if (response.status === 200){
        setError(error + " EmailId Alredy Registered")
        setIsError(true);
        alert('EmailId Alredy Registered.');
      }else{
        setIsError(false);
        setError('');
      }
  }

  const UploadProfile = (e) => {
    setProfile(e.target.files[0]);
  }

  const RegisterTaile = async(e) => {
    //e.preventDefault();
    if (isError){
      Alert(error);
    }

    var c = document.createElement('canvas');
    var img = document.getElementById('Img1');
    c.height = 400;
    c.width = 400;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, c.width, c.height);
    var base64String = c.toDataURL();

    let response = await PostApi.postcall({'email': email, 'password' : password, 'storeName': storename, 'country': country, 'city': city, 'profile' : profile, 'zipcode' : zipcode, 'phone':phone, 'role' : personName, 'profileImg' : base64String, 'aboutUs' : aboutus}, AddTailor);  
    console.log(response);
    if (response.status === 200){
      localStorage.setItem('tailor', response.data);
      navigate('/');
    }else{

    }
  }

  const handleChange = (event) => {
    setPersonName(event.target.value);
    // setOpen(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-100 min-h-screen">
      <div className="my-2">
        <NavLink to={"/"}>
          <img src={mainlogo} alt="logo" className="w-40" />
        </NavLink>
        {/* {match && match.params.userwork} */}
        <p className="text-center">{urlparams && urlparams}</p>
      </div>
      <div className="create-cont py-2 fabric-form">
        <div className="resp-input text-input py-1 ">
          <InputField
            placeholder="Enter Your Email"
            type="email"
            height="50px"
            //  icons={ <img src={vector} alt="message" className="absolute top-5 right-4" /> }
            labeluse="email"
            label={"Email"}
            value = {email}
            onChange={(e) => { setEmail(e.target.value);EmailCheck(e) }}
            desc="(where you want to recieve confirmation)"
          />
        </div>
        <div className="password-input py-1">
          <InputField
            placeholder="Enter Your Password"
            type="password"
            height="50px"
            //  icons={ <img src={key} alt="key" className="absolute top-5 right-4" /> }
            label="Password"
            labeluse={"password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <div className="text-input py-1">
          <InputField
            placeholder="Enter Your Store Name"
            type="text"
            height="50px"
            label="Store Name"
            labeluse={"store"}
            value={storename}
            onChange = { (e) => { setStoreName(e.target.value) }}
            //  icons={ <img src={phone} alt="message" className="absolute top-5 right-4 z-30" /> }
          />
        </div>
        <div className="text-input-fabric file-type py-1 px-20">
          <InputField placeholder="Please Choose Profile Image.."
                      type="file"
                      height="50px"
                      label = "Profile"
                      labeluse={"profile"}
                      value = { profile }
                      onChange = { (e) => { UploadProfile(e) } }/>
          <img id="Img1" 
               className="hidden"
               src={ profile !== "" ? URL.createObjectURL(profile) : '' }
               height = "280px" 
               width = "280px"/>
        </div>
        <div className="twobox flex justify-between gap-2 ">
          <div className="text-input py-1">
            <InputField
              placeholder="Country"
              type="text"
              height="50px"
              //  icons={ <img src={flag} alt="message" className="absolute top-5 right-4 z-30" /> }
              label="Country"
              value={country}
              onChange = { (e) => { setCountry(e.target.value) }}
              labeluse={"country"}
            />
          </div>
          <div className="text-input py-1">
            <InputField
              placeholder="Enter City"
              type="text"
              height="50px"
              //  icons={ <img src={flag} alt="message" className="absolute top-5 right-4 z-30" /> }
              label="City"
              labeluse={"city"}
              value={city}
              onChange = { (e) => { setCity(e.target.value) }}
            />
          </div>
        </div>
        {/* Another flex  */}
        <div className="twobox flex justify-between gap-2">
          <div className="text-input py-1">
            <InputField
              placeholder="Enter Code"
              type="number"
              height="50px"
              //  icons={ <img src={flag} alt="message" className="absolute top-5 right-4 z-30" /> }
              label="Zip Code"
              labeluse={"zipcode"}
              value={zipcode}
              onChange = { (e) => { setZip(e.target.value) }}
            />
          </div>
          <div className="text-input py-1">
            <InputField
              placeholder="+91-7527037746"
              type="number"
              height="50px"
              //  icons={ <img src={flag} alt="message" className="absolute top-5 right-4 z-30" /> }
              label="Phone Number"
              labeluse={"phonenumber"}
              value={phone}
              onChange = { (e) => { setPhone(e.target.value) }}
            />
          </div>
        </div>

        {/* Category */}
        <div className="text-input py-2">
          <FormControl sx={{ width: "100%" }}>
            {/* <InputLabel>Age</InputLabel> */}
            <label htmlFor="demo-controlled-open-select" className="labels">
              {urlparams === "Stylish"
                ? "Fashion Experience"
                : "Choose Your Category"}
            </label>
            {urlparams.replace(/ /g, "") === "Stylish" ? (
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={personName}
                displayEmpty
                // label="Select Category"
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>

                <MenuItem value="FashionInstituteStudent/Staff">
                  Fashion Institute Student / Staff
                </MenuItem>
                <MenuItem value={"gentstailor"}>
                  Worked in a boutique/Tailor
                </MenuItem>
                <MenuItem value={"Designer"}>Running own shop</MenuItem>
                <MenuItem value={"noexperience"}>No Experience</MenuItem>
              </Select>
            ) : urlparams === "Fabric" ? (
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={personName}
                displayEmpty
                // label="Select Category"
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="tailor">Retailor</MenuItem>
                <MenuItem value={"designer"}>Whole Seller</MenuItem>
                <MenuItem value={"alteration"}>Manufacturing</MenuItem>
                {/* <MenuItem value={"noexperience"}>No Experience</MenuItem> */}
              </Select>
            ) : urlparams === "Sticting Factory" ? (
              // (
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={personName}
                displayEmpty
                // label="Select Category"
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="tailor">Retailor</MenuItem>
                <MenuItem value={"designer"}>Whole Seller</MenuItem>
                <MenuItem value={"alteration"}>Manufacturing</MenuItem>
                <MenuItem value={"alteration"}>Individual</MenuItem>

                {/* <MenuItem value={"noexperience"}>No Experience</MenuItem> */}
              </Select>
            ) : (
              // )
              // (
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={personName}
                displayEmpty
                // label="Select Category"
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="tailor">Tailor</MenuItem>
                <MenuItem value={"designer"}>Designer</MenuItem>
                <MenuItem value={"alteration"}>Alteration</MenuItem>
                {/* <MenuItem value={"noexperience"}>No Experience</MenuItem> */}
              </Select>
              // )
            )}
          </FormControl>
        </div>
        <div className="text-input py-1">
          <InputField placeholder="Please Choose Profile Image.."
                      type="text"
                      height="50px"
                      label = "About Us"
                      labeluse={"aboutus"}
                      value = { aboutus }
                      onChange = { (e) => { setAboutUs(e.target.value) } }/>
        </div>
        <div className="buttons flex items-center  gap-2">
          <div className="btn my-4">
            <Button value={"Reset"} type="submit" />
          </div>
          <div className="button my-4">
            <Button value={"Submit"} type="submit" onClick={(e) => { RegisterTaile(e) }}/>
          </div>
        </div>
        {/* <div className="break py-2 cursor-pointer">
          or
        </div>
        <div className="social-link justify-center flex gap-2 my-2">
           <div className="facebook cursor-pointer"><img src={facebook} alt="facebook" /></div>
           <div className="gmail cursor-pointer"><img src={gmail} alt="gmail" /></div>
        </div> */}
      </div>
    </div>
  );
};
