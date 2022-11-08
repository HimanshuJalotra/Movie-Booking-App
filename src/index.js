import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Details from './screens/details/Details';
import {BrowserRouter} from "react-router-dom"
import Home from './screens/home/Home';
import Controller from './Controller';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
 {/* <Home/> */}
 <Controller/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

