import React from 'react';
import TheNavBar from '../Layout/TheNavBar';
import TheFooter from '../Layout/TheFooter';
import { Outlet } from 'react-router';

const Main = () => {
    return (
        <>
        <TheNavBar></TheNavBar>
        <Outlet></Outlet>
        <TheFooter></TheFooter>
            
        </>
    );
};

export default Main;