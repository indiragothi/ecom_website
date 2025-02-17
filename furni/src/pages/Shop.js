import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baner2 from "../assets/baner2.png";
import { GoFilter } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { FaCartShopping } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";

const Shop = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    image: [],
    rating: "",
  });
  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [wishlist, setWishlist] = useState({});

  const navigate = useNavigate()

  const fetchAllProduct = () => {
    fetch(`http://localhost:4000/api/v1/product`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllProduct(data);
      });
  };

  const fetchAllCategory = () => {
    fetch(`http://localhost:4000/api/v1/get-category`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCategory(data);
      });
  };

  useEffect(() => {
    fetchAllProduct();
    fetchAllCategory();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts =
    selectedCategory === "All Product"
      ? allProduct
      : allProduct.filter(
          (product) => product.category.name === selectedCategory
        );

  // const filteredProducts = allProduct.filter(product => {
  // 	const matchesCategory = selectedCategory === "All Product" || product.category.name === selectedCategory;
  // 	const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  // 	return matchesCategory && matchesSearchTerm;
  // });

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const handleWishlistToggle = async (productId) => {
    const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
    setWishlist(updatedWishlist);

    console.log("data....",  productId)
  
    const token = localStorage.getItem('token'); // Or get from cookies
    console.log("token.......", token)

    if (!token) {
      console.error('No authentication token found. Please log in.');
      navigate('/login')
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/add-to-wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Wishlist response:", data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <>
      {/* <!-- Start Hero Section --> */}
      <div class="hero">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-5">
              <div class="intro-excerpt">
                <h1>Shop</h1>
                <p class="mb-4">
                  Discover top-quality electronics at unbeatable prices. Your
                  ultimate online solution for reliable, cutting-edge gadgets
                  and accessories. Shop now!
                </p>
                <p>
                  <a href="#" class="btn btn-secondary me-2">
                    Shop Now
                  </a>
                  <a href="#" class="btn btn-white-outline">
                    Explore
                  </a>
                </p>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="hero-img-wrap mt-3">
                <img src={baner2} class="img-fluid baner-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Hero Section --> */}

      <div class="untree_co-section product-section before-footer-section">
        <div class="container">
          {/* filter add from another template  */}

          <div className="row mb-5">
            <div className="col-8">
              <div className="d-flex gap-5">
                <button
                  className="border-0 fs-6 text-color"
                  onClick={() => handleCategoryClick("All Product")}
                >
                  All Product
                </button>
                {allCategory.map((el, index) => {
                  return (
                    <button
                      className="border-0 fs-6 text-color"
                      onClick={() => handleCategoryClick(el?.name)}
                    >
                      {el?.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-4">
              <div className="d-flex gap-3 flex-row-reverse ">
                <div
                  className={`d-flex border py-2 px-4 gap-2 rounded srch-btn ${
                    isSearchActive ? "active" : ""
                  }`}
                  onClick={toggleSearch}
                >
                  <div>{isSearchActive ? <RxCross2 /> : <IoSearch />}</div>
                  <div>Search</div>
                </div>
                <div
                  className={`d-flex border py-2 px-4 gap-2 rounded fltr-btn ${
                    isFilterActive ? "active" : ""
                  }`}
                  onClick={toggleFilter}
                >
                  <div>{isFilterActive ? <RxCross2 /> : <GoFilter />}</div>
                  <div>Filter</div>
                </div>
              </div>
            </div>

            {/* search */}
            {isSearchActive && (
              <div className="mt-3 w-100 search-product">
                <div className="d-flex border border-secondary-subtle py-3 px-4 rounded gap-2 search-container1">
                  <div className="search-btn">
                    <IoSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    name="search-product"
                    className="text-input no-border"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            )}

            {/* filter */}
            {isFilterActive && (
              <div className="mt-3 w-100 ">
                <div className="border py-3 px-4 rounded filter-product">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="text-bold text-black fs-6 fw-5">
                        Sort by
                      </div>
                      <ul className="mt-3">
                        <li className="bg-li">High to Low</li>
                        <li className="bg-li">Low to High</li>
                        <li className="bg-li">Newest</li>
                        <li className="bg-li">Popular</li>
                      </ul>
                    </div>

                    <div className="col-lg-3">
                      <div className="text-bold text-black fs-6 fw-5">
                        Price
                      </div>
                      <ul className="mt-3">
                        <li className="bg-li">All</li>
                        <li className="bg-li">$0.00 - $50.00</li>
                        <li className="bg-li">$50.00 - $100.00</li>
                        <li className="bg-li">$100.00 - $150.00</li>
                        <li className="bg-li">$150.00 - $200.00</li>
                        <li className="bg-li">$200.00+</li>
                      </ul>
                    </div>

                    <div className="col-lg-3">
                      <div className="text-bold text-black fs-6 fw-5">
                        Rating
                      </div>
                      <ul className="mt-3">
                        <li className="bg-li">All</li>
                        <li className="bg-li">
                          <FaStar />
                        </li>
                        <li className="bg-li">
                          <FaStar />
                          <FaStar />
                        </li>
                        <li className="bg-li">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </li>
                        <li className="bg-li">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </li>
                        <li className="bg-li">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-3">
                      <div className="text-bold text-black fs-6 fw-5">
                        Brand
                      </div>
                      <ul>
                        <li className="bg-li">All</li>
                        <li className="bg-li"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* filter add from another template */}

          <div class="row">
            {/* <!-- Start Column 1 --> */}
            {filteredProducts.map((el, index) => {
              return (
                <div class="col-12 col-md-4 col-lg-3 mb-5">
                  <Link class="product-item" to={`/product-details/${el._id}`}>
                    <img
                      src={el.image[0]}
                      alt={el.category}
                      class="img-fluid product-thumbnail"
                    />
                    <h3 class="product-title text-capitalize product-name">
                      {el.name}
                    </h3>
                    <strong class="product-price">${el.price}</strong>
                    <div className="d-flex justify-content-center product-star">
                      <ReactStars
                        count={5}
                        value={el.rating}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#cca300"
                        edit={false}
                      />
                    </div>

                    <button
                      type="button"
                      className="wishlist-button mt-1 fs-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(el._id);
                      }}
                    >
                      {wishlist[el._id] ? (
                        <GoHeartFill color="red" />
                      ) : (
                        <GoHeart />
                      )}
                    </button>

                    <span class="icon-cross">
                      <img src="images/cross.svg" class="img-fluid" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
