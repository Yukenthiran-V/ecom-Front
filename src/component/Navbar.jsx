import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useSelector,useDispatch } from 'react-redux';
import SideNavbar from './SideNavBar';
import { config } from "../api/Api";
import "../css/Navbar.css"
import { use } from 'react';
import { loginSuccess } from '../appRedux/user/userSlice';

import logo from "../assets/images/uk_cart_logo.png";

function Navbar() {

   const base_url=config.base_url;
  const [userData, setUserData] = useState(null); 

  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility

  const [checkServerStatus,setCheckServerStatus]=useState(false);
  const dispatch=useDispatch();
  const toggleSidebar = (status) => {
    setShowSidebar(status); // Update the sidebar visibility
  };
const userData_store = useSelector((state) => state.user.user);
  useEffect(() => {
    const getData = Cookies.get("userData");
    if (getData !== null && getData !== "" && getData !== undefined) {
      const parsedData = JSON.parse(getData);
      if(userData_store){
      setUserData(userData_store);
      }
      else{
           dispatch(loginSuccess(parsedData));
        setUserData(parsedData);
      }
    }
  }, [userData_store]);
     


  useEffect(()=>{
    const checkServer=async()=>{
      try{
      const response=await fetch(base_url,{
        method:"GET"
      });
      if(!response.ok){
            setCheckServerStatus(true);
      }
      const data=await response.json();
      if(data.message==="success" && data.name==="ukcart"){
          setCheckServerStatus(false);
      }
      else{
         setCheckServerStatus(true);
      }
    }
    catch(err){
      setCheckServerStatus(true);
    }
    }
    checkServer();
  },[])

  const  checkLogginStatus = (e) => {
    e.preventDefault();
    if (userData === null || userData === undefined || userData === "" ) {
      window.location.href = "/login";
    } else {
      window.location.href = "/cart";
    }
  }

useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 500) {
      navbar.classList.add("sticky-nav");
    } else {
      navbar.classList.remove("sticky-nav");
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Cleanup event on unmount
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  return (
    <>
      <SideNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* navbar */}
      
      <nav className="navbar navbar-expand-lg p-3" >
        <div className="container-fluid" style={{ justifyContent: "normal" }}>
          <button style={{ border: "none", fontSize: "30px" }} onClick={() => toggleSidebar(true)} className="d-lg-none"><i class="bi bi-list"></i></button>

          {/* Navbar logo */}
          <a className="navbar-brand fs-3 logo-width" href="/">
            <img
              src={logo}
              alt="uk logo"
              style={{ height: '50px', borderRadius: "10px" }}
            />
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
         

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-around">
              <li className="nav-item  ">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/categories"
                >
                  Contact
                </a>
              </li>
              {/* <li className="nav-item mx-3">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/home"
                  >
                    about
                  </a>
                </li> */}
              <li className="nav-item ">
                <a className="nav-link active" aria-current="page" href="/home">
                  About
                </a>
              </li>

      {/* search  bar */}
              <form className='search-btn-width'>
              <div className="  input-group d-flex mx-2 ">
              <input
                className="search form-control "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn"
                style={{ backgroundColor: 'rgb(252, 184, 13)' }}
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
              </div>
            </form>

              {/* user and cart icon */}

              <li className="nav-item ">
                <button  className="nav-link" onClick={(e)=>checkLogginStatus(e)}>
                  <i className="bi bi-cart"></i> Cart
                </button>
              </li>
              
              {userData?.first_name ? (
                // <li className="nav-item mx-1">
                //   <a className="nav-link" href="/cart">
                //      {userData?.first_name}
                //   </a>
                // </li>
                <li className="nav-item dropdown">
                  <a className="d-flex nav-link text-decoration-none text-dark" href="*" id="electronicsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person"></i>  &nbsp;{userData?.first_name.substring(0, 1).toUpperCase() + userData?.first_name.substring(1, userData?.first_name.length)} &nbsp;
                    {/* <i className="bi bi-caret-down-fill " style={{ marginTop: "2px", color: "rgb(82, 91, 105)", fontSize: "15px" }}></i> */}
                  </a>
                  <ul className="dropdown-menu " aria-labelledby="electronicsDropdown">
                    <li>
                      <a className="dropdown-item" href="*">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="*">
                        Wishlist
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a className="dropdown-item" href="/logout">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item mx-1">
                  <a className="nav-link" href="/login">
                    Login/Signup
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      
    { /* {checkServerStatus && 
      <div className='overlay'>
      <div className='model-box'>
         <div className='card ' style={{width:"100%",padding:"50px"}}>
          <h5>server is under going maintenance </h5>
         </div>
         </div>

      </div>} */}
    </>
  );
}
export default Navbar;
