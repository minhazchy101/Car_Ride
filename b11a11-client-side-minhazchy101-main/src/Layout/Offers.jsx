import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router';

const Offers = () => {

    const [offers , setOffers] = useState([])
    useEffect(()=>{
        fetch('/OffersData.json').then(res=> res.json()).then(data=> setOffers(data))
    },[])
    return (
         <div className='w-full md:w-10/12 mx-auto my-8'>



      <h1 className="my-5 text-3xl md:text-5xl font-bold text-center">Our Offers</h1>

<Suspense fallback={<span className="loading loading-spinner text-secondary"></span>}>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

            {
                offers.map(data => <div key={data.id} className="card bg-secondary shadow-lg rounded-lg hover:animate-bounce transition-transform duration-300">
  <figure className="px-10 pt-10">
    <img
      src={data.icon}
      alt=""
      className="rounded-full w-40 p-2" />
  </figure>
  
  
  <div className="card-body items-center text-center">
    <h2 className="card-title text-primary">{data.title}</h2>
    <p className='text-accent'>{data.description}</p>

  
    
  </div>
</div>)
            }

            </div>

</Suspense>

            <div className='text-end'>
              <Link to='/availableCars' className="btn btn-outline btn-xl btn-secondary font-bold text-lx my-5">Learn More</Link>

            </div>
        </div>
    );
};

export default Offers;