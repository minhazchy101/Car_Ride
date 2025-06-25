import React, { useState } from 'react'; 
import { Link, useLoaderData } from 'react-router';

const AvailableCars = () => {
    const [myView , setMyview] = useState('Grid');
    const [sort , setSort] = useState('');
    const [searchCars, setSearchCars] = useState('');
    // console.log(searchCars)
    const loadedAvailableCars = useLoaderData();
    const onlyAvailableCars = loadedAvailableCars.filter(avCars => avCars.availability === "Available");
  // console.log(onlyAvailableCars)  
    const filteredCars = onlyAvailableCars.filter(car =>
        car.CarModel.toLowerCase().includes(searchCars.toLowerCase()) ||
        car.Location?.toLowerCase().includes(searchCars.toLowerCase())
    );

  
    const sortedCars = [...filteredCars];
    if (sort === 'lowToHigh') {
        sortedCars.sort((a, b) => a.DailyRentalPrice - b.DailyRentalPrice);
    } else if (sort === 'highToLow') {
        sortedCars.sort((a, b) => b.DailyRentalPrice - a.DailyRentalPrice);
    }
    // console.log(sortedCars)

    return (
        <div className='w-full md:w-10/12 mx-auto'>
            <h1 className="text-2xl md:text-3xl text-center font-bold my-4">Available Cars</h1>
            
            <div className='flex flex-col md:flex-row gap-4 justify-between items-center my-4'>
                {/* Search */}
                <input  type="text"  placeholder="Search by model or location"  className="input input-bordered w-full max-w-xs"  value={searchCars} onChange={(e) => setSearchCars(e.target.value)}
                />

                {/* Sort */}
                <div>
                    <select className="select" value={sort}onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sort by Price</option>
                        <option value="lowToHigh">Lowest First</option>
                        <option value="highToLow">Highest First</option>
                    </select>
                </div>

                {/*Toggle */}
                <div className='flex gap-4'>
                    <h1 className='text-md'>Toggle View</h1>
                    <input type="checkbox" defaultChecked className="toggle toggle-lg" onClick={() => setMyview(myView === 'Grid' ? 'List' : 'Grid')} />
                </div>
            </div>

            {
                myView === 'Grid' ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
                        {sortedCars.map(cars => (
                            <div key={cars._id} className="card bg-secondary shadow-lg rounded-lg">
                                <figure>
                                    <img src={cars?.Imageurl} alt="Car" className='object-cover h-[250px] w-full' />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-lg font-semibold text-primary">{cars?.CarModel}</h2>
                                    <div className="badge text-accent badge-outline">Daily Rental Price : {cars?.DailyRentalPrice}</div>
                                    <p className='text-accent'>{cars?.Description}</p>
                                    <h4 className="text-accent text-md">Features : {cars?.Features}</h4>
                                    <div className="text-accent">Location : {cars?.Location}</div>
                                    <div className="card-actions justify-end">
                                        <Link to={`/carDetails/${cars?._id}`} className="btn btn-primary btn-outline">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='my-5'>
                        <ul className="list bg-secondary text-accent rounded-box shadow-md">
                            {sortedCars.map(car => (
                                <li key={car._id} className="list-row items-center">
                                    <div><img className="size-20 rounded-box" src={car?.Imageurl} alt="car" /></div>
                                    <div>
                                        <div>Car Model : {car?.CarModel}</div>
                                        <div>Daily Rental Price : {car?.DailyRentalPrice}</div>
                                        <div>Features : {car?.Features}</div>
                                        <div>Location : {car?.Location}</div>
                                    </div>
                                    <Link to={`/carDetails/${car?._id}`} className="btn btn-primary btn-outline">Book Now</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default AvailableCars;
