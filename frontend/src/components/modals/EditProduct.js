import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from '../../helpers/uploadImage'

const EditProduct = () => {
  let { id } = useParams();
  let location = useLocation();
  const { product } = location.state;

  const [data, setData] = useState({
    name: product.name,
    title: product.title,
    reviews: product.reviews,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    numOfReviews: product.numOfReviews,
    rating:product.rating,
    image: product.image,
    description: product.description,
    category: product?.category?._id,
    brand: product?.brand?._id,
  });
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const navigate = useNavigate();
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating") {
      // Convert value to a number (float or integer)
      const ratingValue = parseFloat(value);
  
      // Check if rating is within the range of 0 to 5
      if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
        toast.error("Rating must be between 0 and 5");
        return;
      }
    }

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async(e) =>{
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file);

    console.log("upload image", uploadImageCloudinary)

    if (uploadImageCloudinary && uploadImageCloudinary.url){
      setData((preve)=>{
        return{
          ...preve,
          image : [ ...preve.image, uploadImageCloudinary.url ]
        }
      })
    }
  }

  const handleDeleteProductImage = async(index) =>{
    console.log("image index", index)

    const newProductImage = [...data.image]
    newProductImage.splice(index, 1)

    setData((preve)=>{
      return{
        ...preve,
        image : [...newProductImage]
      }
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (
      !data.name.trim() ||
      !data.title.trim() ||
      !data.reviews.trim() ||
      !data.price ||
      !data.discount ||
      !data.stock ||
      !data.numOfReviews ||
      !data.rating ||
      !data.category.trim() ||
      !data.description.trim() ||
      data.image.length === 0 ||
      !data.brand.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

   // Only check for duplicate name if the name has been changed
   if (data.name.trim().toLowerCase() !== product.name.trim().toLowerCase()) {
    const duplicateProduct = allProduct.find((prod) => prod.name.toLowerCase() === data.name.trim().toLowerCase());
    if (duplicateProduct) {
      toast.error("Product name already exists");
      return;
    }
  }

    const dataResponse = await fetch(`http://localhost:4000/api/v1/product/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    console.log("dataApi", dataApi);

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/product");
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  const getCategory = () => {
    fetch(`http://localhost:4000/api/v1/get-category`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategory(data);
      });
  };

  const getBrand = () => {
    fetch(`http://localhost:4000/api/v1/get-brand`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBrand(data);
      });
  };

  const fetchAllProduct = () => {
    fetch(`http://localhost:4000/api/v1/product`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllProduct(data);
      });
  };

  useEffect(() => {
    getBrand();
    getCategory();
    fetchAllProduct();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div className="d-flex justify-content-between">
                <h4 class="card-title text-primary ">Edit Product</h4>
                <p className="card-description"></p>
              </div>

              <form className="" onSubmit={handleSubmit}>

                <div className="row">

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleOnChange}
                      class="form-control"
                      id="name"
                      placeholder="Enter Product Name"
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={data.title}
                      onChange={handleOnChange}
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter Title"
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Review</label>
                    <input
                      type="text"
                      name="reviews"
                      value={data.reviews}
                      onChange={handleOnChange}
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter Review"
                    />
                  </div>

                </div>

                <div className="row">

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={data.price}
                      onChange={handleOnChange}
                      min="0"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter Price"
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Discount Price</label>
                    <input
                      type="number"
                      name="discount"
                      value={data.discount}
                      onChange={handleOnChange}
                      min="0"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter Discount Price"
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">No. of Reviews</label>
                    <input
                      type="number"
                      name="numOfReviews"
                      value={data.numOfReviews}
                      onChange={handleOnChange}
                      min="0"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="No. of Reviews"
                    />
                  </div>

                </div>

                <div className="row">

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={data.rating}
                      onChange={handleOnChange}
                      min="0"
                      max="5"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter Rating"
                    />
                  </div>

                  <div class="form-group col-md-4">
                    <label for="exampleInputPassword1">Category</label>
                    <select
                      name="category"
                      id=""
                      className="form-control"
                      value={data.category}
                      onChange={handleOnChange}
                    >
                      <option value="" disabled selected hidden>
                        Select Category
                      </option>
                      {category.map((val, index) => (
                        <option value={val._id} key={index}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="exampleInputPassword1">Brand</label>
                    <select
                      name="brand"
                      id=""
                      className="form-control"
                      value={data.brand}
                      onChange={handleOnChange}
                    >
                      <option value="" disabled selected hidden>
                        Select Brand
                      </option>
                      {brand.map((val, index) => (
                        <option value={val._id} key={index}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="row">

                  <div class="form-group col-md-8">
                    <label for="exampleTextarea1">Description</label>
                    <textarea
                      class="form-control"
                      name="description"
                      value={data.description}
                      onChange={handleOnChange}
                      id="exampleTextarea1"
                      rows="4"
                      placeholder="Enter Description"
                    ></textarea>
                  </div>

                  <div className="form-group col-md-4">
                    <label for="exampleInputUsername1">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={data.stock}
                      onChange={handleOnChange}
                      min="0"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter Stock"
                    />
                  </div>

                </div>

                <div className="row">
                  <div class="form-group col-md-8">
                    <label for="image">Upload Image</label>

                    <div
                      className="w-100 form-control rounded-3 mt-2 d-flex justify-content-center align-items-center product-image"
                      // style={{ background: "#e2e6e9" }}
                    >
                      <label htmlFor="uploadImageInput">
                        <div
                          className="d-flex justify-content-center align-items-center flex-column"
                          style={{ color: "#a8b4bd" }}
                        >
                          <span className="fs-2">
                            <FaCloudUploadAlt />
                          </span>
                          <p className="fs-5">Upload Product Image</p>
                          <input
                            type="file"
                            id="uploadImageInput"
                            className="visually-hidden"
                            onChange={handleUploadProduct} 
                          />
                        </div>
                      </label>
                    </div>
 
                    <div>
                      {data.image[0] ? (
                        <div className="d-flex align-items-center gap-2">
                          {data.image?.map((el, index) => {
                            return (
                              <div className="position-relative group-img">
                                <img
                                  src={el}
                                  alt={el}
                                  width={80}
                                  height={80}
                                  className="border-2 rounded-2 mt-2 image-looks"
                                  // style={{ background: "#e2e6e9" }}
                                />

                                <div className="position-absolute p-1 text-white bg-primary rounded-circle deleteItemBtn" onClick={()=>handleDeleteProductImage(index)}>
                                  <MdDelete />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm">*Please upload product image</p>
                      )}
                    </div>
                    
                  </div>
                </div>

                <button type="submit" class="btn btn-primary mr-2">
                  Submit
                </button>
                <button type="button" class="btn btn-light" onClick={() => setData({ name: "", title: "", reviews: "", price: "",discount:"", stock: "", numOfReviews: "", rating: "", category: "", description: "", image: [], brand: "",})}>Cancel</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
