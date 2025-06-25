import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <>
  <div
  className="hero min-h-screen w-full md:w-10/12 mx-auto rounded-xl my-1 p-2"
  style={{
    backgroundImage:
      "url(https://i.ibb.co/sv8zZqMZ/istockphoto-2012917070-612x612.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div>
      <h1 className="mb-5 text-3xl md:text-5xl font-bold text-primary">Ride Your Next Car.</h1>
     
      <Link to='/availableCars' className="btn btn-outline btn-primary text-[#FFFFFF] font-semibold text-md">View Available Cars</Link>
    </div>
  </div>
</div>  
        </>
    );
};

export default Banner;