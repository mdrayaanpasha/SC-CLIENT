import React from "react";
import Home from "./home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./register";

import Images from "./images";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import Sofa from "./sofa";
import Sofas from "./sofas";
import Login from "./login";
import Cart from "./cart";
import Seat3 from "./3seater";
import Seat2 from "./2seater";
import Lshaped from "./lshaped";
import Seat1 from "./1seater";
import StorageBench from "./1-storagebench";
import Dummy from "./dummy";

import Shoerack from "./sr";
import ShoeRacks from "./shoeracks";
import SeatSR from "./sr-seat";
import BenchSR from "./sr-bench";
import CabSR from "./sr-cabinet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
       
        
        <Route path="/img" element={<Images/>} />
     
        
        
        <Route path="/sofas" element={<Sofas/>} />
        <Route path="/sofa" element={<Sofa/>} />
        <Route path="/sofas/3Seater" element={<Seat3/>} />
        <Route path="/sofas/2Seater" element={<Seat2/>} />
        <Route path="/sofas/1Seater" element={<Seat1/>} />
        <Route path="/sofas/LShaped" element={<Lshaped/>} />
        <Route path="/sofas/storageBench" element={<StorageBench/>} />


        
      <Route path="/shoeracks" element={<ShoeRacks/>}></Route>
        <Route path="/shoerack" element={<Shoerack/>} />
        <Route path="/shoeracks/seat" element={<SeatSR/>} />
        <Route path="/shoeracks/bench" element={<BenchSR/>} />
        <Route path="/shoeracks/cabinet" element={<CabSR/>} />



        <Route path="/reg" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dummy" element={<Dummy/>} />
        
      </Routes>
    </Router>
  );
}



export default App;
