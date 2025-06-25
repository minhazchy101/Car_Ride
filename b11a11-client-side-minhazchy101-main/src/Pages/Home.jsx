import React from 'react';
import Banner from '../Layout/Banner';
import Choice from '../Layout/Choice';
import ExtraAnimation from '../Layout/ExtraAnimation';
import Recent from '../Layout/Recent';
import Offers from '../Layout/Offers';

const Home = () => {
   
    return (
        <>
        
       <Banner></Banner>
       <Choice></Choice>
        <Recent></Recent>
       <ExtraAnimation></ExtraAnimation>
       <Offers></Offers>
        </>
    );
};

export default Home;