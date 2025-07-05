import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
// import { Button } from 'react-bootstrap';
import ExplorePackage from './ExplorePackage.jsx';
import PackageDetails from './PackageDetails.jsx';
import TrendingDestinations from './TrendingDestinations.jsx';
import CustomizePackage from './CustomizePackage.jsx';

function App() {

  return (
    <>
    
<Router>
 <Routes>

 <Route path="/explore" element={<ExplorePackage />} />
   <Route path="/" element={<TrendingDestinations/>} />
  <Route path="/package/:id" element={<PackageDetails />} />
  <Route path="/customize-itinerary" element={<CustomizePackage />} />



  </Routes>
 </Router>

     

    </>
  )
}

export default App
