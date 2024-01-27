import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";
import authservice from '../../appwrite/auth'

function Logoutbtn() {

    const Dispatch= useDispatch()

    const logoutHandler= ()=>{
        authservice.logout().then(()=>{
            Dispatch(logout())
        })
    }

  return <button onClick={logoutHandler}>Logout</button>;
}

export default Logoutbtn;
