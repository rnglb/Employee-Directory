import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchBar from "./SearchBar";
import EmployeeList from "../Employee/EmployeeList";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

import "../../css/styles.css";
import "../../css/ratchet.css";
import "../../css/pageslider.css";
import Hints from "../Fallback/Hint";

const Main = (props) => {
  const [currentEmployeeList, setEmployeeList] = useState([]);
  const [currentSearchKey, setSearchKey] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let navigate = useNavigate();

  const setSearchKeyHandler = (skey) => {
    setSearchKey(skey);
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:5000/employees/", {
      searchKey: currentSearchKey,
      headers: { Authorization: " Bearer " + userInfo.token },
    })
      .then((Response) => {
        if (Response.data.msg) {
          if (Response.data.msg == "Invalid Token") {
            console.log("Invalid Token");
            setIsAuth(false);
          }
          if (Response.data.msg == "Unsuccessful") {
            console.log("Employee data is not available");
            setIsAuth(true);
          }
        } else {
          console.log(Response.data);
          setEmployeeList(Response.data);
          setIsAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentSearchKey]);

  if (userInfo) {
    if (isAuth) {
      return (
        <>
          <Header text="Employee Directory" user={userInfo.name} back="false" />
          <SearchBar
            searchKey={currentSearchKey}
            searchHandler={setSearchKeyHandler}
          />
          <div className="content">
            {currentEmployeeList.length > 0 && (
              <EmployeeList employees={currentEmployeeList} />
            )}
          </div>
        </>
      );
    } else {
      return <Hints />;
    }
  } else {
    return <div></div>;
  }
};

export default Main;
