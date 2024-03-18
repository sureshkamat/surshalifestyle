import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import React, { useState } from "react";
import { useAlert } from 'react-alert';
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../action/userAction";
import "./Navbar.css";


export const UserOptions = ({ user }) => {
  const {cartItems}=useSelector((state)=>state.cart);

  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  const alert=useAlert();
  const dispatch=useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders" ,func:orders},
    { icon: <PersonIcon />, name: "Profile" ,func:account},
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})` ,func:cart},
    { icon: <ExitToAppIcon />, name: "LogOut" ,func:logOutUser},
    
  ];
  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard",func:dashboard });
  }

function orders(){
navigate('/orders')
}
function account(){
navigate('/account')
}
function logOutUser(){
dispatch(logout ());
alert.success("Logout Successfully");
}
function dashboard(){
navigate('/admin/dashboard');
}
function cart(){
  navigate('/cart');
  }
  



  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="speedDial"
        direction="down"
        
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            tooltipOpen={window.innerWidth<=600?true:false}
          />
        ))}
      </SpeedDial>
    </>
  );
};
