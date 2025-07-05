import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
// import TrendingDestinations from './TrendingDestinations.jsx';
// import KeralaTourUI from './KeralaTourUI.jsx';
// import TourCategories from './CategoryBlock.jsx';
import ExplorePackage from './ExplorePackage.jsx';
import PackageDetails from './PackageDetails.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <TrendingDestinations></TrendingDestinations> */}
    {/* <KeralaTourUI></KeralaTourUI> */}
{/* <TourCategories></TourCategories> */}
{/* <ExplorePackage></ExplorePackage> */}
{/* <PackageDetails></PackageDetails> */}



  </StrictMode>,
)
