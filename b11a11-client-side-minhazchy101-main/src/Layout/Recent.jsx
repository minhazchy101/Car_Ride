import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router';

const Recent = () => {


    const [loadedCar ,setLoadedCar] = useState()
    
    useEffect(()=>{
       axios('https://car-ride-server.vercel.app/addcar').then(res => setLoadedCar(res.data))
    },[])

    const formatPostedDate = (dateString) => {
    const postedDate = new Date(dateString);
    const diffInDays = Math.floor((new Date() - postedDate) / (1000 * 60 * 60 * 24));
    return `Added ${diffInDays === 0 ? 'today' : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`}`;
  };

    const onlyAvailableCars = loadedCar?.filter(avCars => avCars.availability === "Available")
    // console.log(onlyAvailableCars)
    const sortedCars = onlyAvailableCars?.sort((a, b) => new Date(b.date) - new Date(a.date));

    
    const recentCars = sortedCars?.slice(0, 6);
// console.log(recentCars)
    return (
      <div className='w-full md:w-10/12 mx-auto my-8'>
                       <h1 className="my-5 text-3xl md:text-5xl font-bold text-center">Our Recent Cars</h1>
            <Suspense fallback={<span className="loading loading-spinner text-secondary"></span>}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        recentCars?.map(car => <div key={car?._id} className="card bg-secondary shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
  <figure>
    <img src={car?.Imageurl} alt="Shoes"  className='h-[250px] w-full'/>
    
  </figure>
  <div className="card-body">
    <h2 className="card-title text-primary">{car.CarModel}
         <div className="badge badge-success">{car.availability}</div>
    </h2>
   
    <p className='text-accent'>Daily RentalPrice : ${car?.DailyRentalPrice}/day</p>
    <p className='text-accent'>Booking Count : {car?.bookingCount}</p>
    <p className='text-accent'>Date Posted : {formatPostedDate(car?.date)}</p>
    <div className="card-actions justify-end">
      <Link to='/availableCars' className="btn btn-primary">See Now</Link>
    </div>
  </div>
</div>)
                    }
                </div>
                
            </Suspense>

        </div>
    );
};

export default Recent;