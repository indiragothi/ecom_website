import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";

const Header = () => {
  const [count, setCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const getCount = () => {
    fetch(`http://localhost:4000/api/v1/cart-count`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data) {
          setCount(data.data.count);
        } else {
          console.error(data.message || "Failed to fetch cart count");
        }
      })
      .catch((error) => console.error("Error fetching cart count:", error));
  };

  const getWishlistCount = () => {
    fetch(`http://localhost:4000/api/v1/count-wishlist`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data) {
          setWishlistCount(data.data.count);
        } else {
          console.error(data.message || "Failed to fetch wishlist count");
        }
      })
      .catch((error) => console.error("Error fetching wishlist count:", error));
  };


  useEffect(() => {
    getCount();
    getWishlistCount();
  }, []);

  return (
    <>
      {/* <!-- Start Header/Navigation --> */}
      <nav
        class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
        arial-label="Furni navigation bar"
      >
        <div class="container">
          <a class="navbar-brand" href="index.html">
            Electro<span>.</span>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsFurni">
            <ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li class="nav-item active">
                <Link class="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link class="nav-link" to={"/shop"}>
                  Shop
                </Link>
              </li>
              <li>
                <Link class="nav-link" to={"/about"}>
                  About us
                </Link>
              </li>
              <li>
                <Link class="nav-link" to={"/service"}>
                  Services
                </Link>
              </li>
              <li>
                <Link class="nav-link" to={"/blog"}>
                  Blog
                </Link>
              </li>
              <li>
                <Link class="nav-link" to={"/contact"}>
                  Contact us
                </Link>
              </li>
            </ul>

            <ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li>
                <Link class="nav-link" to={"/add-to-wishlist"}>
                  <img src="images/heart.svg" className="" />
                  <span className="wishlist-span">{wishlistCount}</span>
                </Link>
              </li>
              <li>
                <Link class="nav-link" to={"/login"}>
                  <img src="images/user.svg" />
                </Link>
              </li>
              <li>
                <Link class="nav-link count-link" to={"/cart"}>
                  <img src="images/cart.svg" />
                  <span className="count-span ">{count}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- End Header/Navigation --> */}
    </>
  );
};

export default Header;
