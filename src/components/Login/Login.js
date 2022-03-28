import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

//import Cookie from "js-cookie";

const Login = (props) => {
  const [enteredEmailId, setEmailId] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const userInfo = localStorage.getItem("userInfo") || null;
  let navigate = useNavigate();

  const emailIdChangeHandler = (event) => {
    setEmailId(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);

  const getLoginInfo = () => {
    console.log("for login...first step");
    Axios.post("http://localhost:5000/login/", {
      email: enteredEmailId,
      pswd: enteredPassword,
    })
      .then((Response) => {
        //     Cookie.set("userInfo", JSON.stringify(Response.data));
        localStorage.setItem("userInfo", JSON.stringify(Response.data));
        navigate("/");
      })
      .catch((err) => {
        alert("Email or password incorrect...");
      });
  };

  return (
    <div id="form">
      <fieldset>
        <legend>Login:</legend>
        <label for="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email"
          value={enteredEmailId}
          onChange={emailIdChangeHandler}
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
        <button onClick={getLoginInfo}> Submit</button>
        <button>
          <a href="http://localhost:3000/register"> Switch to Register</a>
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
