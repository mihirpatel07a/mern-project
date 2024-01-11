import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";


export default function Privateprofile(){
 const {currentuser} = useSelector((state) => state.user)


return (
    <>
    {currentuser ?    <Outlet /> : <Navigate to="sign-in"/>
    
    } 
    </>
         
)

}