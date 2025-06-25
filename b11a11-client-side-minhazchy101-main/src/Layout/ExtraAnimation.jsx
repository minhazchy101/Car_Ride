import Lottie from 'lottie-react';
import React from 'react';
import animation from '../assets/Animation - 1749384127512.json'

const ExtraAnimation = () => {
    return (
        <div className='bg-secondary w-full md:w-10/12 mx-auto rounded-lg my-8 p-2'>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Lottie animationData={animation} loop={true}></Lottie>
    <div>
      <h1 className="text-5xl text-primary font-bold">Drive Your Way – Book Instantly!</h1>
      <p className="py-6 text-accent">
        Skip the lines and hit the road with just a few taps. Whether you're heading to work or planning a weekend escape, CarRide makes booking fast, easy, and reliable — right from your phone.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default ExtraAnimation;