import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

  const {logIn , google} = useAuth()
  // console.log()
  const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.state)

	 const handleLogin = (e)=>{
        e.preventDefault() ;
        const form = e.target ;
        const formData = new FormData(form)
        // const loginData = Object.fromEntries(formData.entries())
        const email = formData.get('email')
        const password = formData.get('password')
        // console.log( `email : ${email}` )
      logIn(email , password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if (user) {
Swal.fire({
  title: "You're Logged In!",
  icon: "success",
  draggable: true
});
}
navigate(location.state || '/')

  })
  .catch((error) => {
    const errorCode = error.code;
    
  //  console.log(`errorMessage ${errorMessage} , errorCOde ${errorCode}`)
  Swal.fire({
  icon: "error",
  title: "Something went wrong!",
  text: errorCode,
  
});
  });


    }

    const handleGoogle = ()=>{
      google().then((user) => {
    
    if (user) {
Swal.fire({
  title: "You're Logged In by Google!",
  icon: "success",
  draggable: true
});
}
navigate(location.state || '/')

  })
  .catch((error) => {
    const errorCode = error.code;

  Swal.fire({
  icon: "error",
  title: "Something went wrong!",
  text: errorCode,
  
});
  });
    }

    return (
        <>
          <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl bg-secondary my-2">
	<h1 className="text-3xl font-bold text-primary text-center">Login</h1>
	

    <form onSubmit={handleLogin} className="form rounded-box ">
 
  <label className="label text-accent">Email</label>
  <input type="email"  name="email" className="input w-full" placeholder="Email" />

  <label className="label text-accent">Password</label>
  <input type="password" name="password" className="input w-full" placeholder="Password" />

 
  <input type="submit" value="Login" className="w-full mt-4 btn btn-outline btn-primary text-[#FFFFFF] font-semibold text-md" />
</form>

<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
		<p className="px-3 text-sm font-semibold text-accent my-2">Login with social accounts</p>
		<div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
	</div>
<button onClick={handleGoogle} className="btn bg-white text-black border-[#e5e5e5] w-full">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
<p className="text-sm text-center sm:px-6 text-accent mt-6">Don't have an account?
		<Link to='/registration' className="underline text-primary">Register</Link>
	</p>
</div>
        </>
    );
};

export default Login;