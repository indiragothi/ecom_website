import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { MdDelete } from "react-icons/md";

const ViewUsers = () => {
  const [data, setData] = useState({
    name: "",
    email : "",
    password : "",
    phone : "",
  });
  const [allUser, setAllUser] = useState([]);

  const fetchAllUser = () => {
    fetch(`http://localhost:4000/api/v1/user`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllUser(data);
      });
  };
  
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/user/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setAllUser(allUser.filter((user) => user._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  console.log(allUser);

  useEffect(() => {
    fetchAllUser();
  }, [allUser]);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div className="d-flex justify-content-between">
                <h4 class="card-title text-primary ">All User</h4>
                 
              </div>

              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>User Name</th>
                      <th>Image</th>
                      <th>Email</th>
                      <th>Contact No.</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUser?.map((el, index) => {
                      return (
                        <tr key={el._id}>
                          <td>{index + 1}.</td>
                          <td>{el?.name}</td>
                          <td class="py-1">
                           image {/* <img src={el?.image[0]} alt={el?.name} /> */}
                          </td>
                          <td>{el?.email}</td>
                          <td>{el?.phone}</td>
                          <td>{moment(el?.createdAt).format("LL")}</td>
                          <td>
                            <div className="">

                              <button
                                type="button"
                                className="btn text-primary "
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

export default ViewUsers;
