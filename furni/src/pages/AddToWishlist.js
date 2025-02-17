import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { FaShoppingCart } from "react-icons/fa";

const AddToWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const fetchCart = () => {
    fetch(`http://localhost:4000/api/v1/view-cart`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
      });
  };

  const fetchWishlist = () => {
    fetch(`http://localhost:4000/api/v1/view-wishlist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWishlistItems(data);
      });
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    console.log("data....", productId);

    const token = localStorage.getItem("token"); // Or get from cookies
    console.log("token.......", token);

    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`
        },
        // credentials: 'include',
        body: JSON.stringify({ product: productId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataApi = await response.json();
      console.log("dataApi", dataApi);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };



  const removeCartItem = async (productId) => {
    console.log("productId....", productId);
    const response = await fetch(`http://localhost:4000/api/v1/delete-from-wishlist`, {
      method: "DELETE",
    });

    const responseData = await response.json();
    fetchCart()      
     
  };

  console.log("wishlistitems", wishlistItems);

  useEffect(() => {
    fetchWishlist();
    fetchCart();
  }, []);

  return (
    <>
      {/* <!-- Start Hero Section --> */}
      <div class="hero">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-5">
              <div class="intro-excerpt">
                <h1>My Wishlist</h1>
              </div>
            </div>
            <div class="col-lg-7"></div>
          </div>
        </div>
      </div>
      {/* <!-- End Hero Section --> */}

      <div class="untree_co-section before-footer-section">
        <div class="container">
          <div class="row mb-5">
            <form class="col-md-12" method="post">
              <div class="site-blocks-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="product-thumbnail">Image</th>
                      <th class="product-name">Product</th>
                      <th class="product-quantity">Rating</th>
                      <th class="product-price">Price</th>
                      <th class="product-total">Add To Cart</th>
                      <th class="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems &&
                      wishlistItems?.data?.map((item, index) => {
                        return (
                          <tr>
                            <td class="product-thumbnail">
                              <img
                                src={item.product.image[0]}
                                alt={item.product.name}
                                class="img-fluid"
                              />
                            </td>
                            <td class="product-name">
                              <h2 class="h5 text-black">{item.product.name}</h2>
                            </td>

                            <td>
                              <div className="d-flex justify-content-center product-star">
                                <ReactStars
                                  count={5}
                                  value={item.product.rating}
                                  size={24}
                                  isHalf={true}
                                  emptyIcon={<i className="far fa-star"></i>}
                                  halfIcon={
                                    <i className="fa fa-star-half-alt"></i>
                                  }
                                  fullIcon={<i className="fa fa-star"></i>}
                                  activeColor="#cca300"
                                  edit={false}
                                />
                              </div>
                            </td>
                            <td>${item.product.price}</td>
                            <td>
                              <div className="d-lg-flex ">
                                <button
                                  class="btn btn-primary gap-2 d-flex"
                                  type="button"
                                  onClick={(e) =>
                                    handleAddToCart(e, item.product._id)
                                  }
                                >
                                  <div>
                                    <FaShoppingCart className="" />
                                  </div>
                                  <div className="ms-1">Add To Cart</div>
                                </button>
                              </div>
                            </td>
                            <td>
                              <button 
                                className="btn btn-black btn-md"
                                onClick={() => removeCartItem(item.product._id)}
                                >
                                  X
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="row mb-5">
                <div class="col-md-6 mb-3 mb-md-0">
                  <button class="btn btn-black btn-sm btn-block">
                    Update Cart
                  </button>
                </div>
                <div class="col-md-6">
                  <Link
                    class="btn btn-outline-black btn-sm btn-block"
                    to="/shop"
                    >
                    Continue Shopping
                  </Link>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label class="text-black h4" for="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div class="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    class="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div class="col-md-4">
                  <button class="btn btn-black">Apply Coupon</button>
                </div>
              </div>
            </div>
            <div class="col-md-6 pl-5">
              <div class="row justify-content-end">
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12 text-right border-bottom mb-5">
                      <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <span class="text-black">Subtotal</span>
                    </div>
                    <div class="col-md-6 text-right">
                      <strong class="text-black">$230.00</strong>
                    </div>
                  </div>
                  <div class="row mb-5">
                    <div class="col-md-6">
                      <span class="text-black">Total</span>
                    </div>
                    <div class="col-md-6 text-right">
                      <strong class="text-black">$230.00</strong>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <Link
                        class="btn btn-black btn-lg py-3 btn-block"
                        to={"/checkout"}
                      >
                        Proceed To Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToWishlist;
