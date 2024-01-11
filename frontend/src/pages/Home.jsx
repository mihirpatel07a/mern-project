import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function Home() {
  

  
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div> home
      
    </div>
    // {currentUser. ? < Adminhome /> : <userhome/> }
  )


  //  const AdminHome = ()=> {
  //      return (
  //       <div> admin home page</div>
  //      )
  //  }

  //  const userhome = ()=> {
  //   return (
  //     <div> userhome</div>
  //   )
  //  }


}
