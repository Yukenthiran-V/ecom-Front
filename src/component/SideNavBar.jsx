import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Using Button from react-bootstrap


const SideNavbar = ({ showSidebar , setShowSidebar }) => {
    
   
  return (
    <div className={`offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`} tabIndex="-1" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 id="offcanvasExampleLabel">Ukcart</h5>
        <Button variant="close" onClick={()=>setShowSidebar(false)} aria-label="Close">
        
        </Button>
      </div>
      <div className="offcanvas-body">
        <ul className="list-unstyled  side-nav-link">
          <li><a href="/">Home</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
