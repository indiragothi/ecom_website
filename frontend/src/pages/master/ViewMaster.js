import React from 'react'
import { Link } from 'react-router-dom'

const ViewMaster = () => {
  return (
    <div className='content-wrapper'>
    <div class="row">
     
         <div class="col-md-4 grid-margin transparent">
             <div class="row">
 
                <div class="col-md-6 mb-4 stretch-card transparent">
                    <Link className='card card-tale' to={'/add-category'}>
                        <div className='card-body d-flex justify-content-center align-items-center'>
                            <div className='text-white word-size'>Category</div>
                        </div>
                    </Link>
                </div>
 
                <div class="col-md-6 mb-4 stretch-card transparent">
                    <Link class="card card-dark-blue" to={'/add-brand'}>
                        <div class="card-body my-5 d-flex justify-content-center align-items-center">
                            <div class="text-white word-size">Brand</div>
                        </div>
                    </Link>
                </div>

             </div>
            
        </div>

    </div>
 </div>
  )
}

export default ViewMaster
