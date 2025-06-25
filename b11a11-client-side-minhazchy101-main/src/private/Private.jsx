import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Others/Loading';

const Private = ({children}) => {

    const {user , load} = useAuth()
    const location = useLocation()
    // console.log(location.pathname)

    if (load) {
        return <Loading></Loading>
    }

    if (!user) {
       return <Navigate to='/login' state={location.pathname}></Navigate> 
    }

    return children
};

export default Private;