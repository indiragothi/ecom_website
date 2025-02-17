import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    discount: "",
    category: [],
    brand: [],

  });
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = () => {
    fetch(`http://localhost:4000/api/v1/product`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllProduct(data);
      });
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/product/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setAllProduct(allProduct.filter((product) => product._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  console.log(allProduct);

  useEffect(() => {
    fetchAllProduct();
  }, [allProduct]);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div className="d-flex justify-content-between">
                <h4 class="card-title text-primary ">All Product</h4>
                <a
                  type="button"
                  class="btn btn-outline-primary mb-3 mr-3"
                  href="/add-product"
                >
                  Add Product
                </a>
              </div>

              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Product Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Discount </th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProduct?.map((el, index) => {
                      return (
                        <tr key={el._id}>
                          <td>{index+1}.</td>
                          <td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{el?.name}</td>
                          <td class="py-1">
                            <img src={el?.image[0]} alt={el?.name}/>
                          </td>
                          <td>{el?.price}</td>
                          <td>{el?.discount}</td>
                          <td>{el?.category?.name}</td>
                          <td>{el?.brand?.name}</td>
                          <td>{moment(el?.createdAt).format("LL")}</td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                                <Link type="button" className="text-primary" state={{product:el}} to={`/edit-product/${el._id}`}>
                                <MdModeEditOutline className="icon-large"/></Link>
                                <button type="button" className="btn text-primary mr-2" onClick={() => deleteProduct(el._id)}><MdDelete className="icon-large"/></button>
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

export default ViewProduct;
