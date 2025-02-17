import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
  const [data, setData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
    phone : "",
    termsAccepted: false,
  })
  const navigate = useNavigate();

  const handleOnChange=(e)=>{  
    const { name, value, type, checked } = e.target;

    setData((prev)=>{
      return{
        ...prev,
        [name] : type === 'checkbox' ? checked : value,
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("register data", data)

    try {
      const dataResponse = await fetch(`http://localhost:4000/api/v1/register`, {
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },  
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json();
      console.log("dataApi", dataApi)
  
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
  
      if(dataApi.error){
        toast.error(dataApi.message)
      }
      
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
     
  }

  return (
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth p-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left border py-3 px-4">
              <div class="brand-logo mb-3">
                {/* <img src="../../images/logo.svg" alt="logo"/> */}
                <h3 className="text-color mb-0">
                  Electro<span>.</span>
                </h3>
              </div>
              <h6 className="mb-0 greet">New here?</h6>
              <p class="font-weight-light mb-2">
                Signing is up easy. It only take a few steps
              </p>

              <form class="pt-3" onSubmit={handleSubmit}>

                <div class="form-group mb-4">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleInputName"
                    placeholder="Username"
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                  />
                </div>

                <div class="form-group mb-4">
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                  />
                </div>

                <div class="form-group mb-4">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                  />
                </div>

                <div class="form-group mb-4">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    id="exampleInputPassword2"
                    placeholder="Conform Password"
                    name='confirmPassword'
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                  />
                </div>

                <div class="form-group mb-4">
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    id="exampleInputPassword2"
                    placeholder="Contact Number"
                    name='phone'
                    value={data.phone}
                    onChange={handleOnChange}
                  />
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input 
                        type="checkbox" 
                        class="form-check-input"
                        name="termsAccepted"
                        checked={data.termsAccepted}
                        onChange={handleOnChange} 
                      />I agree
                      to all Terms & Conditions
                    </label>
                  </div>
                  {/* <a href="#" class="auth-link text-black">Forgot password?</a> */}
                </div>

                <div class=" d-grid">
                  <button type='submit'
                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    SIGN UP
                  </button>
                </div>

                <div class="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to={"/login"} class="text-primary">
                    Login
                  </Link>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
      {/* <!-- content-wrapper ends --> */}
    </div>
  );
};

export default Register;
