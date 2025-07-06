import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
// import { Button } from 'react-bootstrap';
import ExplorePackage from './component/ExplorePackage.tsx';
import PackageDetails from './component/PackageDetails.tsx';
import Home from './component/Home.tsx';
import CustomizePackage from './component/CustomizePackage.tsx';

function App() {
  

  return (
    <>
    
    <Router>
     <Routes>
     <Route path="/explore" element={<ExplorePackage />} />
       <Route path="/" element={<Home/>} />
      <Route path="/package/:id" element={<PackageDetails />} />
      <Route path="/customize-itinerary" element={<CustomizePackage />} />
      </Routes>
     </Router>
    
         
    
        
    </>
  )
}

export default App
