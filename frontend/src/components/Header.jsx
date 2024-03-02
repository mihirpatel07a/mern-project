import React, { useEffect, useState } from "react";
import { Link  , useNavigate} from "react-router-dom";

// Fa stands for Font awesome. It takes icons from font awesome website.
import { FaSearch } from "react-icons/fa";

import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const [searchTerm , setSearchTerm ] = useState('')
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
  
    const urlparams = new URLSearchParams();
    urlparams.set('searchTerm', searchTerm);
  
    const searchQuery = urlparams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(()=> {
    const urlparams = new URLSearchParams(window.location.search);
    const serchtermfromUrl = urlparams.get('searchTerm');
    setSearchTerm(serchtermfromUrl);
  },[location.search])

  return (
    <header className="bg-slate-200 shadow-md">
      {/* Name & Search bar are next to each other using flex
        Adding space between components using justify-between 
        align vertically center using items-center*/}
      <div className="flex justify-between items-center max-w-screen-2xl p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Property </span>
            <span className="text-slate-700">Pulse</span>
          </h1>
        </Link>

        {/* Align Input Box and Icon Next to each other using flex 
            center vertically using items-center */}
        <form onSubmit={handlesubmit} className="bg-slate-100 p-2 rounded-lg flex items-center ml-32">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-56"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />

           <button>
                <FaSearch className="text-slate-600" />
              </button>
        </form>

        {/* navbar options */}
{
  currentUser && currentUser.email === "admin777@gmail.com" ? (
    <ul className="flex gap-4 p-2">
    <Link to='/'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Home
      </li>
    </Link>
    <Link to='/Listings'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Listing
      </li>
    </Link>
    <Link to='/Users'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Users
      </li>
    </Link>
    <Link to='/Report'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Reports
      </li>
    </Link>

    <Link to='/profile'>
      {currentUser ? (
        <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
      ) : (
        <li className="text-slate-700 hover:no-underline cursor-pointer">
          Sign In
        </li>
      )}
    </Link>
  </ul>
  ) :
  (
    <ul className="flex gap-4 p-2">
    <Link to='/'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Home
      </li>
    </Link>
    <Link to='/about'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        About
      </li>
    </Link>
    <Link to='/contact-us'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Contact Us
      </li>
    </Link>
    <Link to='/privacy'>
      <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
        Privacy
      </li>
    </Link>

    <Link to='/profile'>
      {currentUser ? (
        <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
      ) : (
        <li className="text-slate-700 hover:no-underline cursor-pointer">
          Sign In
        </li>
      )}
    </Link>
  </ul>
  )
}

      
      </div>
    </header>
  );
}
