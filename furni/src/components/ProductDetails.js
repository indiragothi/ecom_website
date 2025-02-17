import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
// import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    image: [],
    category: "",
    brand: "",
    stock: "",
    numOfReviews: "",
    reviews: "",
  });
  let { id } = useParams();
  // const { addToCart } = useCart();

  // const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const navigate = useNavigate();

  const [zoomImageCordinate, setZoomImageCordinate] = useState({
    x: 0,
    y: 0,
  });

  const fetchProductDetails = async () => {
    const response = await fetch(`http://localhost:4000/api/v1/product/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const dataResponse = await response.json();

    setData(dataResponse);
    setActiveImage(dataResponse?.image[0]);
  };

  // console.log("data", data);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("cordinate ", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCordinate({
        x,
        y,
      });
    },
    [zoomImageCordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    console.log("data....",  productId)
  
    const token = localStorage.getItem('token'); // Or get from cookies
    console.log("token.......", token)

    if (!token) {
      console.error('No authentication token found. Please log in.');
      navigate('/login')
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/add-to-cart`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
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

  return (
    <div className="product-details">
      <div className="container mx-auto p-4">
        <div className="d-flex flex-column flex-lg-row gap-4 productImgDetail">
          {/* product image */}
          <div className="d-flex flex-column flex-lg-row-reverse gap-4 prodImgDet">
            <div className="position-relative border rounded p-2 zoom-container">
              <img
                src={activeImage}
                className="w-100 h-100 bigImg"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />

              {/* Product zoom */}
              {zoomImage && (
                <div
                  className="overflow-hidden shadow p-1 d-none d-md-block zoom"
                  onMouseLeave={handleLeaveImageZoom}
                >
                  <div
                    className="zoomImg"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomImageCordinate.x * 100}% ${
                        zoomImageCordinate.y * 100
                      }%`,
                    }}
                  />
                </div>
              )}

              <div className="position-absolute add-to-cart">
                <div className="d-lg-flex gap-4">
                  <button class="btn btn-primary gap-2 d-flex" type="button" onClick={(e) => handleAddToCart(e, data?._id)}>
                    <div>
                      <FaShoppingCart className="" />
                    </div>
                    <div 
                      className="ms-1"  
                    >
                      Add To Cart
                    </div>
                  </button>
                  <button class="btn btn-dark gap-2 d-flex mx-2" type="submit">
                    <div>
                      <IoPaperPlane />
                    </div>
                    <div className="ms-1">Buy Now</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="h-100">
              {/* Image List */}
              {data.image && data.image.length > 0 && (
                <div className="d-flex flex-lg-column gap-2 overflow-scroll scrollbar-none h-100">
                  {data.image.map((imgURL, index) => (
                    <div
                      className="rounded productImgList p-1 border"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-100 h-100 object-fit-scale mix-blend smallImg"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* product details */}
          <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-column mt-2">
              <div className="fs-3 font-bold text-dark text-capitalize">
                {data.name}
              </div>
              <div className="d-flex align-items-center gap-3 mt-3">
                <span className="d-flex align-items-center justify-content-center mt-2 gap-1 bg">
                  <div className="text-white">{data.rating}</div>
                  <span className="text-white">
                    <IoMdStar />
                  </span>
                </span>

                <div className="d-flex gap-2 fs-6 font-bold">
                  <div>
                    {data.rating} <span>Ratings</span>
                  </div>
                  <div>&</div>
                  <div>
                    {data.reviews} <span>Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex mt-2">
              <div className="fs-6 text-color2 me-3">Brand:</div>
              <div>{data?.brand?.name}</div>
            </div>

            <div className="d-flex mt-2">
              <div className="fs-6 text-color2 me-3">Category:</div>
              <div>{data?.category?.name}</div>
            </div>

            <div className="d-flex flex-column mt-2">
              <div className="fs-6 text-color2">Special Price</div>
              <div className="d-flex gap-1">
                <div className="fs-4 fw-bold text-dark">$</div>
                <div className="fs-4 fw-bold text-dark">{data.price}</div>

                <div className="fs-6 ms-3">$</div>
                <div className="fs-6 text-decoration-line-through">
                  {data.discount}
                </div>

                <div className="text-color2 font-bold fs-5 ms-3">80% off</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="fs-5">Description</div>
              <div className="">{data.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
