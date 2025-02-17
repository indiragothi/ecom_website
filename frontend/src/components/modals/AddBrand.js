import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AddBrand = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
  });
  const [allBrand, setAllBrand] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getBrand = () => {
    fetch(`http://localhost:4000/api/v1/get-brand`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllBrand(data);
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

    const deleteProduct = async (id) => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/brand/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message);
          setAllBrand(allBrand.filter((product) => product._id !== id));
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", data)
    // Validation check for empty name
    if (!data.name.trim()) {
      toast.error("Brand name cannot be empty");
      return;
    }

    // Validation check for duplicate brand-category pair
    const isDuplicate = allBrand.some((brand) => brand.name.toLowerCase() === data.name.trim().toLowerCase() && brand.category._id === data.category);
    if (isDuplicate) {
      toast.error("Brand and Category name already exists");
      return;
    }

    const dataResponse = await fetch(
      `http://localhost:4000/api/v1/add-brand/`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const dataApi = await dataResponse.json();
    
    setData({ name: "",
       category: "" 
      });  
    getBrand();

    console.log("dataApi", dataApi);

    if (dataApi.success) {
      toast.success(dataApi.message);
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    getBrand();
    getCategory();
  }, [allBrand]);

  return (
    <div class="content-wrapper">
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card ">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-primary">Add Brand</h4>
              <form class="forms-sample" onSubmit={handleSubmit}>

                <div class="form-group">
                  <label for="exampleInputUsername1">Brand Name</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    class="form-control"
                    id="name"
                    placeholder="Enter Brand Name"
                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputPassword1">Category</label>
                  <select
                    name="category"
                    value={data.category}
                    onChange={handleOnChange}
                    className="form-control"
                    id="category"
                  >
                    <option value="" disabled selected hidden>
                      Select Category
                    </option>
                    {
                    allCategory && allCategory.map && allCategory.map((val, index) => (
                        <option value={val._id} key={index}>
                          {val.name}
                        </option>
                      ))}
                  </select>
                </div>

                <button type="submit" class="btn btn-primary mr-2">
                  Submit
                </button>
                <button type="button" class="btn btn-light" onClick={() => setData({ name: "",
                   category: ""
                    })}>Cancel</button>

              </form>
            </div>
          </div>
        </div>

        <div class="col-lg-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Brand Name</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="py-2">
                    {
                     allBrand.map((el, index) => {
                      return (
                        <tr key={el._id} >
                          <td>{index + 1}.</td>
                          <td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{el?.name}</td>
                          <td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{el?.category?.name}</td>
                           
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <Link
                                type="button"
                                className="text-primary"
                                to={`/edit-brand/${el._id}`}
                                state={{ product: el }}
                              >
                                <MdModeEditOutline className="icon-large" />
                              </Link>
                              <button
                                type="button"
                                className="btn text-primary mr-2"
                                onClick={() => deleteProduct(el._id)}
                              >
                                <MdDelete className="icon-large" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
