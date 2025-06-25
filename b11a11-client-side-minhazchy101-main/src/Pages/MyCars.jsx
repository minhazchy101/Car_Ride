import React, { Suspense, useEffect, useState } from 'react';
import { Link} from 'react-router';
import MyCarsCard from '../Layout/MyCarsCard';
import axios from 'axios';


import useAuth from '../hooks/useAuth';

const MyCars = () => {
   
    
     const {user} = useAuth()
     const [onlyMyCars , setOnlyMyCars] = useState()
    useEffect(()=>{
    axios(`https://car-ride-server.vercel.app/addedcar/${user?.email}`, {
  headers: {
    authorization: `Bearer ${user?.accessToken}`
  },
  withCredentials: true
}).then(res => setOnlyMyCars(res.data))
    },[user])
    
   
   
  
    // console.log(onlyMyCars)
    
    
    return (
        <div className="w-full lg:max-w-8/10 mx-auto my-2 ">
        
        {
          onlyMyCars?.length === 0 ? (
  <div className="text-center py-10 text-accent bg-secondary rounded-xl">
    <p className="text-lg mb-4">You haven't added any cars yet.</p>
    <Link to="/addCar" className="btn btn-primary text-accent btn-outline rounded-lg">
      Add Your First Car
    </Link>
  </div>
) :

<>
    <MyCarsCard setOnlyMyCars={setOnlyMyCars} onlyMyCars={onlyMyCars}></MyCarsCard>   
</>
        

        }

        </div>
    );
}; 

export default MyCars;