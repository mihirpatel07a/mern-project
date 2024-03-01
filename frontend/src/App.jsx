import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Privacy from './pages/Privacy';
import ContactUs from './pages/ContactUs';
import Privateprofile from './components/Privateprofile';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/updateListing';
import Listing from './pages/listing';
import Admin from './pages/Admin1/Admin';
import Users from './pages/Admin1/users';
import Listings from './pages/Admin1/Listings';

import { useSelector } from 'react-redux';
import AReport from './pages/Admin1/AReport';
import Userdetails from './pages/Admin1/userdetails';
import Search from './pages/Search';

export default function App() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          { currentUser && currentUser.email === "admin777@gmail.com" ? (
            <Route path="/" element={<Admin/>} />
          )
              :
(
  <Route path='/' element={<Home/>} />
)

          }
         
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/search' element={<Search />} />
          <Route element={<Privateprofile />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />} />
            <Route path="/listings/:listingId" element={<Listing />} />
          </Route>

       
          <Route path="/Users" element={<Users/> }></Route>
          <Route path="/Listings" element={<Listings/> }></Route>
          <Route path="/Report" element= {<AReport />}> </Route>
          <Route path="/userd" element= {<Userdetails />}> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
