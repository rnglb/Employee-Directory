import React, { useState } from "react";
import Axios from "axios";

import "./Register.css";

const Register = (props) => {
  const [enteredFirstname, setFirstname] = useState("");
  const [enteredLastname, setLastname] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [formIsValid, setformIsValid] = useState(0);

  const firstnameChangeHandler = (event) => {
    setFirstname(event.target.value);
  };
  const lastnameChangeHandler = (event) => {
    setLastname(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = () => {
    if (
      enteredFirstname.length < 2 ||
      enteredLastname.length < 2 ||
      enteredEmail.indexOf("@") < 0 ||
      enteredPassword.length < 6
    ) {
      alert("Please enter valid data.");
      setformIsValid(0);
    } else {
      setformIsValid(1);
    }

    if (formIsValid === 1) {
      Axios.post("http://localhost:5000/register/", {
        firstname: enteredFirstname,
        lastname: enteredLastname,
        email: enteredEmail,
        password: enteredPassword,
      }).then((Response) => {
        if (Response.data.msg === "Unsuccessful") {
          alert("Something is wrong...");
        } else if (Response.data.msg === "Successful") {
          alert("User details saved successfully");
          props.componentChangeHandler("login");
        } else if (Response.data.msg === "already Exist") {
          alert("Email id already exixt. Please use a different email.");
        }
        console.log(Response.data);
      });
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <fieldset>
        <legend>Register:</legend>
        <label for="firstname">Firstname:</label>
        <br />
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="firstname"
          value={enteredFirstname}
          onChange={firstnameChangeHandler}
        />
        <br />
        <label for="lastname">Lastname:</label>
        <br />
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="lastname"
          value={enteredLastname}
          onChange={lastnameChangeHandler}
        />
        <br />
        <label for="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <br />
        <label for="password">Password:</label>
        <br />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
        />
        <br />
        <br />
        <a href="#"><button onClick={registerHandler}> Submit</button></a>
        <button><a href="http://localhost:3000/login"> Switch to signIn</a></button>
      </fieldset>
    </>
  );
};

export default Register;
