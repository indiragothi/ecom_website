import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../helpers/uploadImage'
import { MdDelete } from "react-icons/md";

const EditCategory = () => {
  let { id } = useParams();
  let location = useLocation();
  const { product } = location.state;

  const [data, setData] = useState({
    name: product.name,
    image: product.image,
  });

  const [allCategory, setAllCategory] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    console.log("upload image", uploadImageCloudinary);

    if (uploadImageCloudinary && uploadImageCloudinary.url) {
      setData((preve) => {
        return {
          ...preve,
          image: [...preve.image, uploadImageCloudinary.url],
        };
      });
    }
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.image];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        image: [...newProductImage],
      };
    });
  };

  const getCategory = () => {
    fetch(`http://localhost:4000/api/v1/get-category`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCategory(data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check for empty name or image
    if (!data.name.trim() || data.image.length === 0) {
      toast.error("This field cannot be empty");
      return;
    }

    // Validation check for duplicate name
    if (data.name.trim().toLowerCase() !== product.name.trim().toLowerCase()){
      const isDuplicate = allCategory.some((category) => category.name.toLowerCase() === data.name.trim().toLowerCase());
      if (isDuplicate) {
        toast.error("Category name already exists");
        return;
      }
    }

    const dataResponse = await fetch(
      `http://localhost:4000/api/v1/category/${id}`,
      {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const dataApi = await dataResponse.json();

    console.log("dataApi", dataApi);

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/add-category");
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div class="content-wrapper">
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card ">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-primary">Edit Category</h4>
              <form class="forms-sample" onSubmit={handleSubmit}>

                <div className="row">
                  <div class="form-group col-12">
                    <label for="exampleInputUsername1">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleOnChange}
                      class="form-control"
                      id="name"
                      placeholder="Enter Category Name"
                    />
                  </div>
                </div>

                <div className="row">
                  <div class="form-group col-12">
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
                      {data?.image[0] ? (
                        <div className="d-flex align-items-center gap-2">
                          {data.image.map((el, index) => {
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

                                <div
                                  className="position-absolute p-1 text-white bg-primary rounded-circle deleteItemBtn"
                                  onClick={() =>
                                    handleDeleteProductImage(index)
                                  }
                                >
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
                <button type="button" class="btn btn-light" onClick={() => setData({ name: "", image: []})}>Cancel</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
