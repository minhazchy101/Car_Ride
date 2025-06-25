import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Main from "../Main/Main";
import Home from "../Pages/Home";
import AvailableCars from "../Pages/AvailableCars";
import Login from "../Pages/Login";
import Error from "../Others/Error";
import Registration from "../Pages/Registration";
import Private from "../private/Private";
import AddCar from "../Pages/AddCar";
import MyCars from "../Pages/MyCars";
import axios from "axios";

import CarDetails from "../Pages/CarDetails";
import Loading from "../Others/Loading";
import MyBookings from "../Pages/MyBookings";


export const router = createBrowserRouter([
  {
    path: "/",
   Component : Main ,
   errorElement : <Error></Error>,
   children : [
    {
        index : true , Component : Home
    },
    {
    path : 'availableCars',
    Component : AvailableCars ,
    loader : ()=> axios('https://car-ride-server.vercel.app/addcar').then(res => res.data),
    hydrateFallbackElement : <Loading></Loading>    
    },
    {
    path : 'login',
    Component : Login     
    },
    {
    path : 'registration',
    Component : Registration     
    },
    {
      path : 'addCar', element : <Private><AddCar></AddCar></Private>
    },
    {
      path : 'myCars/:email',
     element : <Private><MyCars></MyCars></Private>,
    },
    {
      path : 'carDetails/:id',
     element : <Private><CarDetails></CarDetails></Private>,
     loader : ({params})=> axios(`https://car-ride-server.vercel.app/addcar/${params.id}`).then(res => res.data),
      hydrateFallbackElement : <Loading></Loading>
    },
    {
      path : 'bookedCars/:email' ,
      element : <Private><MyBookings></MyBookings></Private>,
    }
   ]
  },
]);