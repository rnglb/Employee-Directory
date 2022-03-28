import React, { useEffect,useState } from "react";
import "./Hints.css";

const Hints = (props) => {
  useEffect(()=>{
    localStorage.removeItem('userInfo');
  },[])

  return (
    <div id="alertWindow">
      <h2>Your login credentials has been expired. </h2>
      <h4>Kindly login to visit the site</h4>
      <button id="back"><a href="http://localhost:3000/login"> Switch to signIn</a></button>
    </div>
  );
};

export default Hints;
