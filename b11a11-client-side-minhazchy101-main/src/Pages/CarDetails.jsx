import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const CarDetails = () => {
  const loadedCar = useLoaderData();
  const navigate = useNavigate()

  const {user} = useAuth()
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [total, setTotal] = useState(0);

   
 

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotal(days * loadedCar?.DailyRentalPrice);
      } else {
        setTotal(0);
      }
    } else {
      setTotal(0);
    }
  }, [startDate, endDate, loadedCar]);

  
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};


  const handleConfirm = (id) => {
    
  const bookedData = {
    userEmail : user.email ,
    CarEmail : loadedCar?.email ,
    CarImage : loadedCar?.Imageurl,
    CarModel: loadedCar?.CarModel,
    BookingDate: formatDateTime(new Date()), 
    DailyRentalPrice: loadedCar?.DailyRentalPrice,
    TotalPrice : total,
    BookingStatus : 'Confirmed' ,
    bookingCount: loadedCar?.bookingCount,
    startDateTime: formatDateTime(startDate),
    endDateTime: formatDateTime(endDate),
    CarId : loadedCar?._id ,
  };
  
  document.getElementById('my_modal_1').close();

 axios.post('https://car-ride-server.vercel.app/bookedcar' , bookedData).then(res => {
  // console.log(res.data)
  if(res.data.insertedId){
    Swal.fire({
  position: "center",
  icon: "success",
  title: "This Car has been booked",
  showConfirmButton: false,
  timer: 1500
});

     axios.patch(`https://car-ride-server.vercel.app/cars/${id}/incrementBooking`);

    navigate(`/bookedcars/${user.email}`)
    // to={`/bookedcars/:${user.email}`}

  }
}).catch(err =>{
   if(err){

                  Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message ,
        
      });
                }
})



  // console.log("Booking JSON:", bookedData);
};

  return (
    <div className='w-full md:w-10/12 mx-auto bg-secondary flex flex-col md:flex-row justify-between items-center text-accent my-2 md:my-6 lg:my-12 p-2 gap-6 rounded-lg'>
      <div>
        <img src={loadedCar?.Imageurl} className='object-center rounded-lg' />
      </div>
      <div className='space-y-3'>
        <h1 className="text-2xl font-bold">{loadedCar?.CarModel}</h1>
        <p>Description : {loadedCar?.Description}</p>
        <div>
          <p>Daily Rental Price : $ {loadedCar?.DailyRentalPrice}</p>
          <p>Features : {loadedCar?.Features}</p>
          <p>Availability : {loadedCar?.availability}</p>
        </div>

        <button className="btn btn-primary btn-outline mt-3" onClick={() => document.getElementById('my_modal_1').showModal()}>Book Now</button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-secondary">
            <h1 className="text-2xl font-semibold">Car Model : {loadedCar?.CarModel}</h1>
            <div className='my-2'>
              <p className="text-md">Daily Rental Price : $ {loadedCar?.DailyRentalPrice}</p>
              <p className="text-md">Features : {loadedCar?.Features}</p>
              <p className="text-md">Availability : {loadedCar?.availability}</p>
            </div>

            
            <div>
              <p className="text-md mt-2">Booking Dates:</p>
              <div className="flex flex-col md:flex-row gap-3">
               <div>
  <label className="text-sm" htmlFor="startDateTime">Start Date & Time</label>
  <input type="datetime-local" id="startDateTime" name="startDateTime" className="input input-bordered w-full text-secondary" value={startDate} onChange={(e) => setStartDate(e.target.value)}
  />
</div>
<div>
  <label className="text-sm" htmlFor="endDateTime">End Date & Time</label>
  <input type="datetime-local" id="endDateTime" name="endDateTime" className="input input-bordered w-full text-secondary" value={endDate} onChange={(e) => setEndDate(e.target.value)}
  />
</div>

              </div>
              <p className='font-semibold my-4'>Total : ${total}</p>
            </div>

            {/* Modal Buttons */}
            <div className="modal-action">
              <form method="dialog" className='flex gap-3'>
                <button type="button" className="btn btn-primary btn-outline" onClick={()=>handleConfirm(loadedCar?._id)}>
                  Confirm
                </button>
                <button className="btn btn-primary btn-outline">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        
      </div>
    </div>
  );
};

export default CarDetails;
