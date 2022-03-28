import EmployeeListItem from "./EmployeeListItem";
import React, { useEffect, useState } from "react";

const EmployeeList = (props) => {
    var items = props.employees.map(function (employee) {
        console.log(employee);
        return (
            <EmployeeListItem key={employee.id} employee={employee} />
        );
    });
  return (
        <ul  className="table-view">
            {items}
        </ul>
  );
  
  
};
export default EmployeeList;
