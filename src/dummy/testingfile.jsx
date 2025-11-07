import React, { Fragment } from "react";
import { useState,useEffect } from "react";

function TestingPages(){
    const data ={
    name:"YUKENTHIRAN",
    role:"DEVELOPER"
}
const styles = {
  root: {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '8px',
  },
};
    return(
        <Fragment>
        <div className="text-center">
         <div>NAME: {data.name}</div>
         <div>ROLE: {data.role}</div>
         </div>
        </Fragment>
    )
}



export default TestingPages;