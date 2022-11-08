import React from 'react'
import Details from './screens/details/Details'
import Home from './screens/home/Home'
import { Routes,Route } from "react-router-dom";
import BookShow from './screens/booking/BookShow';


export default function Controller() {
  return (
    <div>
        {/* <Home/> */}
        {/* <Details/> */}
        <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='/details' element={<Details/>}/>
            <Route path='/booking' element={<BookShow/>}/>
        </Routes>
    </div>
  )
}
