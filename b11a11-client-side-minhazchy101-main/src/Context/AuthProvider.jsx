import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut , GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";





export const AuthContext = createContext(null)

import React from 'react';
import { auth } from "../Firebase/firebase.init";


const AuthProvider = ({children}) => {

  const [user , setUser] = useState()
  const [load , setLoad] = useState(true)

  const register =(email, password)=>{
    setLoad(true)
    return createUserWithEmailAndPassword(auth , email , password)
  }

  const logIn =(email, password)=>{
    setLoad(true)
    return signInWithEmailAndPassword(auth , email , password)
  }

 useEffect(()=>{
  const unSubscribe = onAuthStateChanged(auth , async (currentUser)=>{
    setUser(currentUser)
    setLoad(false)

    if(currentUser){
      const token = await currentUser.getIdToken();

    await fetch('https://car-ride-server.vercel.app/set-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ token })
    });
    }
  })
  return ()=> {
    unSubscribe()
  }
 },[])


    const provider = new GoogleAuthProvider();
    const google =()=>{
      setLoad(true)
      return signInWithPopup(auth , provider)
    }

    const profileUpdate = (profile)=>{
     
      return updateProfile(auth.currentUser , profile)
    }

 const logOut =async()=>{

   await fetch('https://car-ride-server.vercel.app/logout', {
    method: 'POST',
    credentials: 'include'
  });
  return signOut(auth)
 }

   
    const userInfo = {
        name : 'minu',
        register,
        logIn,
        google,
        user,
        load,
        profileUpdate ,
        logOut
     
    }

  return <AuthContext value={ userInfo }>{ children }</AuthContext>
};

export default AuthProvider;