import React from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddCar = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
    const handleAddCar = (e)=>{
        e.preventDefault()
        const form = e.target ;
        const formData = new FormData(form)
        const allData = Object.fromEntries(formData.entries())
        // console.log(allData)

        const userdetails = {
           name : user.displayName ,
           email : user.email,
           photo : user.photoURL
        }

      allData.email = user.email
      allData.Features = allData.Features.split(',').map(req => req.trim())
      allData.bookingCount = 0 ;
      allData.user = userdetails ;
      allData.date = new Date().toISOString().split('T')[0];
        axios.post('https://car-ride-server.vercel.app/addcar' , allData).then(res => {
          if (res.data) {
            Swal.fire({
  position: "center",
  icon: "success",
  title: "Your Car has been Added",
  showConfirmButton: false,
  timer: 1500
});
      form.reset()
      navigate('/')
      
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
        <div className="w-full lg:max-w-8/10 mx-auto p-8 space-y-3 rounded-xl bg-secondary my-2">
         
	<h1 className="text-3xl font-bold text-primary text-center">Add a New Car</h1>

                        <form onSubmit={handleAddCar}>

                   <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    {/* Car Model */}
                     <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Car Model :</label>
                      <input required type="text" name='CarModel' className="input w-full" placeholder="Car Model" />
                    </fieldset>
                    {/* Daily Rental Price */}
                    <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Daily Rental Price :</label>
                      <input required type="text" name='DailyRentalPrice' className="input w-full" placeholder="Daily Rental Price " />
                    </fieldset>
                    
                    {/* Availability */}
                    <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Availability :</label>
                      <div className="filter">
                          <input className="btn btn-square " type="reset" value="×"/>
                          <input className="btn" type="radio" name="availability" value="Available" aria-label="Available"/>
                          <input className="btn" type="radio" name="availability" value="Unavailable" aria-label="Unavailable"/>

                        </div>
                    </fieldset>


                    
                   </div>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {/* Vehicle Registration Number */}
                    <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Vehicle Registration Number :</label>
                      <input required type="text" name='VehicleRegistrationNumber' className="input w-full" placeholder="Vehicle Registration Number" />
                    </fieldset>
                    {/* Features */}
                    <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Features :</label>
                      <input required type="text" name='Features' className="input w-full" placeholder="Enter Features by using Commas" />
                    </fieldset>

                    </div>
                    {/* Description*/}
                         <fieldset className="fieldset rounded-box">
                           <label className="label text-accent font-semibold">Description:</label>
                           <input required type="text" name='Description' className="input w-full" placeholder="Description" />
                    </fieldset>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        
                    {/* Image url  */}
                    <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Image url  :</label>
                      <input required type="text" name='Imageurl' className="input w-full" placeholder="Image url " />
                    </fieldset>
                    {/* Location */}
                    <fieldset className="fieldset rounded-box">
                      <label className="label text-accent font-semibold">Location :</label>
                      <input required type="text" name='Location' className="input w-full" placeholder="Location" />
                    </fieldset>
                   </div>

                   <input  type="submit" className='btn btn-primary btn-outline w-full mt-7 font-semibold text-md' value="Add Car" />

                            </form>
          
        </div>
    );
};

export default AddCar;