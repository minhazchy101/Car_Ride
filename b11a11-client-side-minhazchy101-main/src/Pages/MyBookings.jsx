import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { FaCalendarDays, FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import axios from 'axios';

const MyBookings = () => {
    const {user} = useAuth()
   
    // console.log(loadedBookingData)

 const [bookings, setBookings] = useState();
    // console.log(bookings)

    useEffect(()=>{
      axios(`https://car-ride-server.vercel.app/bookedcars/${user.email}` ,{
      headers : {
        authorization : `Bearer ${user?.accessToken}`
      }
     } ).then(res => setBookings(res.data))
    },[user])


   
    // console.log(onlyMyBooking)

    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};




    const handleCancel = (id)=>{
        Swal.fire({
  title: "Are you sure you want to cancel this booking?",
  
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Cancel it!"
}).then((result) => {
  if (result.isConfirmed) {
   axios.put(`https://car-ride-server.vercel.app/bookedcar/${id}` ,  {
        BookingStatus: 'Canceled'
      }).then(res =>{
        if(res.data){
          Swal.fire({
            title: "Canceled!",
            text: "Your file has been Canceled.",
            icon: "success"
          });
          setBookings(prev =>
              prev.map(booking =>
                booking._id === id ? { ...booking, BookingStatus: 'Canceled' } : booking
              )
            );
           axios.patch(`https://car-ride-server.vercel.app/cars/${id}/decrementBooking`);
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
  }
});
    }
   
     const ModifyStartDate = formatDateTime(startDate)
    const ModifyEndDate = formatDateTime(endDate)

    const handleModifyDate=(id)=>{

      axios.put(`https://car-ride-server.vercel.app/bookedcar/${id}` ,{
        ModifyStartDate,
        ModifyEndDate
      }).then(res =>{
        if(res.data){
            Swal.fire({
  position: "center",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
          setBookings(prev =>
         prev.map(booking =>
           booking._id === id
             ? {
                 ...booking,
                 ModifyStartDate,
                 ModifyEndDate,
                 startDateTime: ModifyStartDate,
                 endDateTime: ModifyEndDate,
               }
             : booking
         )
       );

       setStartDate('');
     setEndDate('');
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
    }
    return (
         <div className="w-full lg:max-w-8/10 mx-auto  my-2 ">
        
        {
          bookings?.length === 0 ? (
  <div className="text-center py-10 text-accent bg-secondary rounded-xl">
    <p className="text-lg mb-4">You haven't Booked any cars yet.</p>
    <Link to="/availableCars" className="btn btn-primary text-accent btn-outline rounded-lg">
      Book Your First Car
    </Link>
  </div>
) :


        <>
          <h1 className="text-lg md:text-3xl  font-bold text-secondary text-center my-3">My Booked Cars</h1>
       <div className="overflow-x-auto rounded-box text-accent bg-secondary rounded-xl">
  <table className="table">
    {/* head */}
    <thead className="bg-secondary text-primary font-bold">
      <tr>
        <th>Car Image</th>
        <th>Car Model</th>
        <th>Booking Date</th>
        <th>Total Price</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Booking Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <Suspense fallback={<span className="loading loading-spinner text-secondary"></span>}>
        {
          bookings?.map(car => (
            <tr key={car._id} className="hover:shadow-md hover:bg-secondary even:bg-gray-600 odd:bg-gray-700 transition duration-200"
            >
              <td>
                <img src={car?.CarImage} className="w-24 h-16 object-cover rounded-lg" alt="Car"
                />
              </td>
              <td>{car?.CarModel}</td>
              <td>{car?.BookingDate}</td>
              <td>{car?.TotalPrice}</td>
              <td>{car?.startDateTime}</td>
              <td>{car?.endDateTime}</td>
            <td >  <div className={`badge ${car?.BookingStatus === 'Canceled' ? 'badge-error' : 'badge-secondary'} text-primary`}>  {car?.BookingStatus}</div></td>
            
              <td>
                <div className="join gap-2">
                  <button onClick={()=>handleCancel(car?.CarId)} className="btn btn-error text-accent rounded-lg" disabled={car?.BookingStatus === 'Canceled'}> <FaTrashCan /> Cancel </button>


                
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-primary text-accent rounded-lg" onClick={()=>document.getElementById('my_modal_5').showModal()}> <FaCalendarDays /> Modify Date</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box bg-secondary">
    <h3 className="font-bold text-lg">Modify Booking Dates :</h3>
     <div className="flex flex-col md:flex-row gap-3">
               <div>
  <label className="text-sm" htmlFor="startDateTime"> Modify Start Date & Time</label>
  <input type="datetime-local" id="startDateTime" name="startDateTime" className="input input-bordered w-full text-secondary" value={startDate} onChange={(e) => setStartDate(e.target.value)}
  />
</div>
<div>
  <label className="text-sm" htmlFor="endDateTime">End Date & Time</label>
  <input type="datetime-local" id="endDateTime" name="endDateTime" className="input input-bordered w-full text-secondary" value={endDate} onChange={(e) => setEndDate(e.target.value)}
  />
</div>

              </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-primary rounded-lg btn-outline mx-1" onClick={()=>handleModifyDate(car?._id)}>Confirm</button>
        <button className="btn btn-primary rounded-lg btn-outline mx-1">Close</button>
      </form>
    </div>
  </div>
</dialog>
                </div>
              </td>
            </tr>
          ))
        }
      </Suspense>
    </tbody>
  </table>
</div>
        </>
        

        }

        </div>
    );
};

export default MyBookings;