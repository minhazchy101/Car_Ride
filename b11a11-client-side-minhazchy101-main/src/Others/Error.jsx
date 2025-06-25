import React from 'react';
import { NavLink } from 'react-router';

const Error = () => {
    return (
        <div>
            <section className="flex items-center h-screen p-14  text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
		
        <img src="https://i.ibb.co/Zp1McxH7/istockphoto-1213188922-612x612.jpg" alt="" />
		
        <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
		<NavLink to='/' className="px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50">Back to homepage</NavLink>
	</div>
</section>
			

        </div>
    );
};

export default Error;