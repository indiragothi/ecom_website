import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const fetchCart = () => {
    fetch(`http://localhost:4000/api/v1/view-cart`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
      });
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:4000/api/v1/update-cart`, {
        product: productId,
        quantity: quantity,
      });
      fetchCart(); // Refresh cart data after update
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const removeCartItem = async (productId) => {
    console.log("productId....", productId);
    const response = await fetch(`http://localhost:4000/api/v1/delete-cart`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
      }),
    });

    const responseData = await response.json();
    fetchCart();

  };

  console.log("cartItems....", cartItems);
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const newSubtotal = cartItems?.data?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
    const newTotalDiscount = cartItems?.data?.reduce((acc, item) => acc + item.product.discount * item.quantity, 0) || 0;
    setSubtotal(newSubtotal);
    setTotalDiscount(newTotalDiscount);
  }, [cartItems]);


  return (
    <>
      {/* <!-- Start Hero Section --> */}
      <div class="hero">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-5">
              <div class="intro-excerpt">
                <h1>Cart</h1>
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
                      <th class="product-price">Price</th>
                      <th className="product-discount">Discount Price</th>
                      <th class="product-quantity">Quantity</th>
                      <th class="product-total">Total</th>
                      <th class="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems &&
                      cartItems?.data?.map((item, index) => {
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
                            <td>${item.product.price}</td>
                            <td>${item.product.discount}</td>
                            <td>
                              <div class="input-group mb-3 d-flex align-items-center quantity-container a11">
                                <div class="input-group-prepend">
                                  <button
                                    class="btn btn-outline-black decrease"
                                    type="button"
                                    onClick={() =>
                                      updateCartItem(
                                        item.product._id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </button>
                                </div>

                                <input
                                  type="text"
                                  class="form-control text-center quantity-amount"
                                  value={item.quantity}
                                  placeholder=""
                                  aria-label="Example text with button addon"
                                  aria-describedby="button-addon1"
                                />

                                <div class="input-group-append">
                                  <button
                                    class="btn btn-outline-black increase"
                                    type="button"
                                    onClick={() =>
                                      updateCartItem(
                                        item.product._id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>${item.product.price * item.quantity}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-black btn-sm"
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
                    to={"/shop"}
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
                      <strong class="text-black">${subtotal.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Total Discount</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${totalDiscount.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div class="row mb-5">
                    <div class="col-md-6">
                      <span class="text-black">Total</span>
                    </div>
                    <div class="col-md-6 text-right">
                      <strong class="text-black">${(subtotal - totalDiscount).toFixed(2)}</strong>
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

export default Cart;
