import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Testimonial from '../components/Testimonial'
import baner from '../assets/baner2.png'
import desk2 from '../assets/desk2.jpg'
import hp from '../assets/headphones.jpg'
import desk6 from '../assets/desk6.jpg'
import desk11 from '../assets/desk11.jpg'
import laptop from '../assets/laptop2.png'
import tablate from '../assets/tablate.png'
import airpods from '../assets/airdopes.webp'

const Home = () => {

	const [data, setData] = useState({
		name: "",
		image: [],
	});
	const [allCategory, setAllCategory] = useState([]);

    const fetchAllCategory = () => {
		fetch(`http://localhost:4000/api/v1/get-category`)
		  .then((response) => {
			return response.json();
		  })
		  .then((data) => {
			setAllCategory(data);
		  });
	};
 
	useEffect(() => {
		fetchAllCategory();
	}, []);
 
  return (
    <>
       {/* <!-- Start Hero Section --> */}
			<div class="hero">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-lg-5">
							<div class="intro-excerpt">
								<h1>Top Electronics <span clsas="d-block"> Online Solutions </span></h1>
								<p class="mb-4">Discover top-quality electronics at unbeatable prices. Your ultimate online solution for reliable, cutting-edge gadgets and accessories. Shop now!</p>
								<p><a href="/shop" class="btn btn-secondary me-2">Shop Now</a><a href="#" class="btn btn-white-outline">Explore</a></p>
							</div>
						</div>
						<div class="col-lg-7">
							<div class="hero-img-wrap mt-3">
								<img src={baner} class="img-fluid baner-img"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/* <!-- End Hero Section --> */}

		{/* <!-- Start Product Section --> */}
		<div class="product-section">
			<div class="container">
				<div class="row">

					{/* <!-- Start Column 1 --> */}
					<div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 class="mb-4 section-title">Crafted with excellent material.</h2>
						<p class="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
						<p><a href="shop.html" class="btn">Explore</a></p>
					</div> 
					{/* <!-- End Column 1 --> */}

					{
						allCategory.map((el, index)=>{
							return (
                                <div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						            <Link class="product-item" to>
							            <img src={el?.image[0]} alt={el?.name} class="img-fluid product-thumbnail"/>
							            <h3 class="product-title">{el?.name}</h3>
							            {/* <strong class="product-price">${el.price}</strong> */}

							            <span class="icon-cross">
								            <img src="images/cross.svg" class="img-fluid"/>
							            </span>
						            </Link>
					            </div> 
							)
						})
					}
 
				</div>
			</div>
		</div>
		{/* <!-- End Product Section --> */}

		{/* <!-- Start Why Choose Us Section --> */}
		<div class="why-choose-section">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-6">
						<h2 class="section-title">Why Choose Us</h2>
						<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

						<div class="row my-5">
							<div class="col-6 col-md-6">
								<div class="feature">
									<div class="icon">
										<img src="images/truck.svg" alt="Image" class="imf-fluid"/>
									</div>
									<h3>Fast &amp; Free Shipping</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div class="col-6 col-md-6">
								<div class="feature">
									<div class="icon">
										<img src="images/bag.svg" alt="Image" class="imf-fluid"/>
									</div>
									<h3>Easy to Shop</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div class="col-6 col-md-6">
								<div class="feature">
									<div class="icon">
										<img src="images/support.svg" alt="Image" class="imf-fluid"/>
									</div>
									<h3>24/7 Support</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div class="col-6 col-md-6">
								<div class="feature">
									<div class="icon">
										<img src="images/return.svg" alt="Image" class="imf-fluid"/>
									</div>
									<h3>Hassle Free Returns</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

						</div>
					</div>

					<div class="col-lg-5">
						<div class="img-wrap">
							{/* <img src="images/why-choose-us-img.jpg" alt="Image" class="img-fluid"/> */}
							<img src={hp} alt="Image" class="img-fluid why-choose-us"/>
						</div>
					</div>

				</div>
			</div>
		</div>
		{/* <!-- End Why Choose Us Section --> */}

		{/* <!-- Start We Help Section --> */}
		<div class="we-help-section">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-7 mb-5 mb-lg-0">
						<div class="imgs-grid">
							<div class="grid grid-1"><img src={desk6} className='help-desk6' alt="Untree.co"/></div>
							{/* <div class="grid grid-1 "><img src="images/img-grid-1.jpg" alt="Untree.co"/></div> */}
							<div class="grid grid-2 "><img src={desk2} className='help-desk2' alt="Untree.co"/></div>
							<div class="grid grid-3"><img src={desk11} className='help-desk11' alt="Untree.co"/></div>
						</div>
					</div>
					<div class="col-lg-5 ps-lg-5">
						<h2 class="section-title mb-4">We Help You Make Modern Interior Design</h2>
						<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada</p>

						<ul class="list-unstyled custom-list my-4">
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
						</ul>
						<p><a herf="#" class="btn">Explore</a></p>
					</div>
				</div>
			</div>
		</div>
		{/* <!-- End We Help Section --> */}

		{/* <!-- Start Popular Product --> */}
		<div class="popular-product">
			<div class="container">
				<div class="row">

					<div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div class="product-item-sm d-flex">
							<div class="thumbnail">
								<img src={laptop} alt="Image" class="img-fluid popular-img"/>
							</div>
							<div class="pt-3">
								<h3>Nordic Chair</h3>
								<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
								<p><a href="#">Read More</a></p>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div class="product-item-sm d-flex">
							<div class="thumbnail">
								<img src={tablate} alt="Image" class="img-fluid popular-img"/>
							</div>
							<div class="pt-3">
								<h3>Kruzo Aero Chair</h3>
								<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
								<p><a href="#">Read More</a></p>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div class="product-item-sm d-flex">
							<div class="thumbnail">
								<img src={airpods} alt="Image" class="img-fluid popular-img"/>
							</div>
							<div class="pt-3">
								<h3>Ergonomic Chair</h3>
								<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
								<p><a href="#">Read More</a></p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		{/* <!-- End Popular Product --> */}

		{/* Testimonial start */}
        <Testimonial/>
		{/* Testimonial end */}
 

		{/* <!-- Start Blog Section --> */}
		<div class="blog-section">
			<div class="container">
				<div class="row mb-5">
					<div class="col-md-6">
						<h2 class="section-title">Recent Blog</h2>
					</div>
					<div class="col-md-6 text-start text-md-end">
						<a href="#" class="more">View All Posts</a>
					</div>
				</div>

				<div class="row">

					<div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
						<div class="post-entry">
							<a href="#" class="post-thumbnail"><img src="images/post-1.jpg" alt="Image" class="img-fluid"/></a>
							<div class="post-content-entry">
								<h3><a href="#">First Time Home Owner Ideas</a></h3>
								<div class="meta">
									<span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
								</div>
							</div>
						</div>
					</div>

					<div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
						<div class="post-entry">
							<a href="#" class="post-thumbnail"><img src="images/post-2.jpg" alt="Image" class="img-fluid"/></a>
							<div class="post-content-entry">
								<h3><a href="#">How To Keep Your Furniture Clean</a></h3>
								<div class="meta">
									<span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
								</div>
							</div>
						</div>
					</div>

					<div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
						<div class="post-entry">
							<a href="#" class="post-thumbnail"><img src="images/post-3.jpg" alt="Image" class="img-fluid"/></a>
							<div class="post-content-entry">
								<h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
								<div class="meta">
									<span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		{/* <!-- End Blog Section -->	 */}
      
    </>
  )
}

export default Home
