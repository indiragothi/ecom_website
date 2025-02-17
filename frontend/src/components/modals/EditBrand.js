import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";

const EditBrand = () => {
    let { id } = useParams();
    let location = useLocation();
    const { product } = location.state;

    const [data, setData] = useState({
        name: product.name,
    });
     
    const [allBrand, setAllBrand] = useState([]);
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

      const getBrand = () => {
        fetch(`http://localhost:4000/api/v1/get-brand`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setAllBrand(data);
          });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation check for empty name
        if (!data.name.trim()) {
          toast.error("Brand name cannot be empty");
          return;
        }

        // Validation check for duplicate name
        if (data.name.trim().toLowerCase() !== product.name.trim().toLowerCase()){
          const isDuplicateBrand = allBrand.find((brand) => brand.name.toLowerCase() === data.name.trim().toLowerCase());
          if (isDuplicateBrand) {
            toast.error("Brand name already exists");
            return;
          }
        }
    
        const dataResponse = await fetch(`http://localhost:4000/api/v1/brand/${id}`, {
          method: "put",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const dataApi = await dataResponse.json();
    
        console.log("dataApi", dataApi);
    
        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/add-brand");
        }
    
        if (dataApi.error) {
          toast.error(dataApi.message);
        }
      };

      useEffect(() => {
        getBrand();
      }, []);

  return (
    <div class="content-wrapper">
      <div class="row">

        <div class="col-md-6 grid-margin stretch-card ">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-primary">Edit Brand</h4>
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
                    placeholder="Enter Category Name"
                />
              </div>

              <button type="submit" class="btn btn-primary mr-2">
                Submit
              </button>
              <button type="button" class="btn btn-light" onClick={() => setData({ name: "" })}>Cancel</button>

            </form>
          </div>
        </div>
        </div>

      </div>
   </div>
  )
}

export default EditBrand
