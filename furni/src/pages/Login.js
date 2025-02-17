import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({
    email : "",
    password : "",
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
    console.log("login data", data)

    const dataResponse = await fetch(`http://localhost:4000/api/v1/login`, {
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },  
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json();
    localStorage.setItem('token', dataApi.token);
    console.log("dataApi", dataApi)

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }

  return (
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth p-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left border py-5 px-4">

              <div class="brand-logo">
                {/* <img src="../../images/logo.svg" alt="logo"/> */}
                <h3 className="text-color mb-4">
                  Electro<span>.</span>
                </h3>
              </div>
              <h6 className="mb-0 greet">Hello! let's get started</h6>
              <p class="font-weight-light mb-2">Sign in to continue.</p>

              <form class="pt-3" onSubmit={handleSubmit}>

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

                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input 
                        type="checkbox" 
                        class="form-check-input"
                        name="termsAccepted"
                        checked={data.termsAccepted}
                        onChange={handleOnChange} 
                      />
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">
                    Forgot password?
                  </a>
                </div>

                <div class="mb-2 d-grid">
                  <button
                    type="button"
                    class="btn btn-block btn-google auth-form-btn"
                  >
                    <i class="me-2">
                      <FcGoogle />
                    </i>
                    Connect using google
                  </button>
                </div>

                <div class="mt-3 d-grid">
                  <button type="submit"
                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    SIGN IN
                  </button>
                </div>

                <div class="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <Link to={"/register"} class="text-primary">
                    Create
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

export default Login;
