import React from "react";
import "../css/Footer.css";
import logo from "../assets/images/uk_cart_logo.png";

function Footer() {
  return (
    <footer className="footer-section text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-md-4">
            <div className="footer-logo d-flex align-items-center mb-3">
              {/* <img
                src={logo}
                className=""
                alt="ukcart logo"
                style={{ height: "50px", borderRadius: "10px" }}
              /> */}
              <h4 className="ms-2 mb-0">UK Cart</h4>
            </div>
            <p className="footer-text">
              Your trusted online shopping destination for all your needs. 
              Quality products, great deals, and secure checkout.
            </p>
            <div className="social-icons mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-6">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/categories">Shop</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 col-6">
            <h5 className="footer-title">Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/shipping">Shipping & Returns</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h5 className="footer-title">Stay Updated</h5>
            <p>Subscribe for special offers and updates.</p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-subscribe" type="submit">
                <i className="bi bi-send"></i>
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4 text-secondary" />

        {/* Bottom Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0">
            © {new Date().getFullYear()} UK Cart. All rights reserved.
          </p>
          <p className="mb-0">
            Made with ❤️ by <strong>UK Team</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
