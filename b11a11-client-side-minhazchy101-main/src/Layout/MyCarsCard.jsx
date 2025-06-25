import axios from 'axios';
import React, { Suspense, useState } from 'react';
import Swal from 'sweetalert2';

const MyCarsCard = ({onlyMyCars , setOnlyMyCars}) => {

             const [selectedCar, setSelectedCar] = useState(null);
                 const [formData, setFormData] = useState({});
                //  console.log( formData)
                // const [onlyMyCars , setOnlyMyCars] = useState(loadedOnlyMyCars)
                // const {user} = useAuth()

      const handleUpdate = (e)=>{
            e.preventDefault()
            const form = e.target;
            const formData = new FormData(form)
            const updateData = Object.fromEntries(formData.entries())
            // console.log(updateData)
            // console.log(selectedCar._id)
            document.getElementById('my_modal_5').close();
            axios.put(`https://car-ride-server.vercel.app/addcar/${selectedCar?._id}`, updateData).then(res => {
                // console.log(res)
                if (res.data.modifiedCount) {
                  Swal.fire({
                       title: "Your Car Details has been Updated",
                        icon: "success",
                        draggable: true
                      });
                  const updatedCar = { ...selectedCar, ...updateData, };
    
            setOnlyMyCars((prev) =>
              prev.map((car) =>
                car._id === selectedCar._id ? updatedCar : car
              )
            );
                 
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
    
        const handleDelete =(id)=>{
         
         Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://car-ride-server.vercel.app/addcar/${id}`).then(res => {
            // console.log(res.data)
            if (res.data) {
               Swal.fire({
          title: "Deleted!",
          text: "Your Car has been deleted.",
          icon: "success"
        });
        const remainCars = onlyMyCars.filter(car => car._id !== id)
        setOnlyMyCars(remainCars)
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
    return (
        <>
          <h1 className="text-lg md:text-3xl  font-bold text-secondary text-center my-3">My Added Cars</h1>
         
         <div className="overflow-x-auto rounded-box text-accent bg-secondary rounded-xl">
         
           <table className="table">
             {/* head */}
             <thead>
               <tr className='text-primary'>
                 <th>Car Image</th>
                 <th>Car Model</th>
                 <th>Daily Rental Price</th>
                 <th>Booking Count</th>
                 <th>Availability</th>
                 <th>Date Added</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
         
             {/* row 1 */}
             <Suspense fallback={<span className="loading loading-spinner text-secondary"></span>}>
         
               {
                 onlyMyCars?.map(car => <tr key={car._id} className="hover:shadow-md hover:bg-secondary even:bg-gray-600 odd:bg-gray-500 transition duration-200">
                 <th><img src={car?.Imageurl} className=' w-24 h-16 object-cover rounded-lg' alt="" /></th>
                 <td>{car?.CarModel}</td>
                 <td>{car?.DailyRentalPrice}</td>
                 <td>{car?.bookingCount}</td>
                 <td>{car?.availability}</td>
                 <td>{car?.date}</td>
                 
                 <td>
                     <div className="join gap-2">
           
           {/* Open the modal using document.getElementById('ID').showModal() method */}
         <button
           className="btn btn-primary btn-outline text-accent join-item rounded-lg"
          onClick={() => {
           setSelectedCar(car);
           setFormData(car); 
           document.getElementById('my_modal_5').showModal();
         }}
         >
           Update
         </button>
         <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
           <div className="modal-box bg-secondary">
             {selectedCar && (
               <form onSubmit={handleUpdate}>
                 <h1 className="text-2xl font-bold text-center my-3">Update Your Car Details</h1>
                 <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                   <fieldset className="fieldset rounded-box">
                     <label className="label text-accent font-semibold">Car Model :</label>
             
                     <input  type="text"  name="CarModel"  value={formData.CarModel || ''}  onChange={(e) => setFormData({ ...formData, CarModel: e.target.value })}  className="input w-full rounded-lg bg-gray-500"/>
                   </fieldset>
                   <fieldset className="fieldset rounded-box">
                     <label className="label text-accent font-semibold">Daily Rental Price :</label>
                    
                     <input  type="text"  name="DailyRentalPrice"  value={formData.DailyRentalPrice || ''}  onChange={(e) => setFormData({ ...formData, DailyRentalPrice: e.target.value })}  className="input w-full rounded-lg bg-gray-500"  placeholder="Daily Rental Price"/>
         
                   </fieldset>
                 </div>
         
                 {/* Availability */}
                             <fieldset className="fieldset rounded-box">
                               <label className="label text-accent font-semibold">Availability :</label>
                               <div className="filter ">
                                   <input className="btn btn-square bg-gray-500 btn-outline rounded-lg" type="reset" value="×"/>
                                   <input className="btn bg-gray-500 btn-outline rounded-lg" type="radio" name="availability" defaultValue="Available"   onChange={(e) => setFormData({ 
                                     ...formData, availability: e.target.value 
                                     })} aria-label="Available"/>
         
                                   <input className="btn bg-gray-500 btn-outline rounded-lg" type="radio" name="availability" defaultValue="Unavailable"  onChange={(e) => setFormData({ ...formData, availability: e.target.value })} aria-label="Unavailable"/>
         
                                 </div>
                             </fieldset>
         
                             <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                         {/* Vehicle Registration Number */}
                             <fieldset className="fieldset rounded-box">
                               <label className="label text-accent font-semibold">Vehicle Registration Number :</label>
                               <input type="text" value={formData.VehicleRegistrationNumber || ''}  onChange={(e) => setFormData({ ...formData, VehicleRegistrationNumber: e.target.value })} name='VehicleRegistrationNumber' className="input w-full rounded-lg bg-gray-500" placeholder="Vehicle Registration Number" />
                             </fieldset>
                             {/* Features */}
                             <fieldset className="fieldset rounded-box">
                               <label className="label text-accent font-semibold">Features :</label>
                               <input type="text" value={formData.Features || ''}  onChange={(e) => setFormData({ ...formData, Features: e.target.value })} name='Features' className="input w-full rounded-lg bg-gray-500" placeholder="Enter Features by using Commas" />
                             </fieldset>
         
                             </div>
         
                             {/* Description*/}
                                  <fieldset className="fieldset rounded-box">
                                    <label className="label text-accent font-semibold">Description:</label>
                                    <input type="text" value={formData.Description || ''}  onChange={(e) => setFormData({ ...formData, Description: e.target.value })} name='Description' className="input w-full rounded-lg bg-gray-500 " placeholder="Description" />
                             </fieldset>
         
                 <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                 
                             {/* Image url  */}
                             <fieldset className="fieldset rounded-box">
                               <label className="label text-accent font-semibold">Image url  :</label>
                               <input type="text" value={formData.Imageurl || ''}  onChange={(e) => setFormData({ ...formData, Imageurl: e.target.value })} name='Imageurl' className="input w-full rounded-lg bg-gray-500" placeholder="Image url " />
                             </fieldset>
                             {/* Location */}
                             <fieldset className="fieldset rounded-box">
                               <label className="label text-accent font-semibold">Location :</label>
                               <input type="text" value={formData.Location || ''}  onChange={(e) => setFormData({ ...formData, Location: e.target.value })} name='Location' className="input w-full rounded-lg bg-gray-500" placeholder="Location" />
                             </fieldset>
                            </div>
         
                 <input type="submit" className='btn btn-primary text-accent btn-outline w-full mt-7 font-semibold text-md rounded-lg' value="Update Car" />
               </form>
             )}
             <div className="modal-action">
               <form method="dialog">
                 <button className="btn btn-primary text-accent btn-outline w-full mt-7 font-semibold text-md rounded-lg">Close</button>
               </form>
             </div>
           </div>
         </dialog>
         
         
         
           <button onClick={()=>handleDelete(car._id)} className="btn btn-primary btn-outline text-accent join-item rounded-lg">Delete</button>
           
         </div>
                 </td>
               </tr> )
               }
         
               
               
             </Suspense>
             </tbody>
           </table>
         </div>   
        </>
    );
};

export default MyCarsCard;