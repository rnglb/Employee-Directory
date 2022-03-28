import "../../css/styles.css";
import React from "react";

var baseURL = "http://localhost:5000";

const EmployeeListItem = (props) => {
  return (
    <li className="table-view-cell media">
                <a href={"#employees/" + props.employee.id}>
                    <img className="media-object small pull-left" src={baseURL+"/pics/" + props.employee.firstName + "_" + props.employee.lastName + ".jpg" }/>
                    {props.employee.firstName} {props.employee.lastName}
                    <p>{props.employee.title}</p>
                </a>
            </li>
  );
  
  
};
export default EmployeeListItem;