import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Images from "./images";
import Sofas from "./sofas";
import Login from "./login";
import Cart from "./cart";
import Seat3 from "./3seater";
import Seat2 from "./2seater";
import Lshaped from "./lshaped";
import Seat1 from "./1seater";
import StorageBench from "./1-storagebench";

import ShoeRacks from "./shoeracks";
import SeatSR from "./sr-seat";
import BenchSR from "./sr-bench";
import CabSR from "./sr-cabinet";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Spotlights from "./spotlights";
import Sf from "../sf";
import SR from "./srs";
import Check from "./check";
import Order from "./order"
import Sucess from "./sucess";
import Failed from "./failed";
import Admin from "./admin";
import MyOrder from "./myorder";
import Payments from "./payments";
function App() {
  return (
    <Router >
      <Routes>

        <Route path="/check" element={<Check />} />
        <Route path="/" element={<Home />} />
        <Route path="/spotlights" element={<Spotlights />} />
        <Route path="/sofaimg" element={<Images />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/sfs" element={<Sf />} />
        <Route path="/sofas/3Seater" element={<Seat3 />} />
        <Route path="/sofas/2Seater" element={<Seat2 />} />
        <Route path="/sofas/1Seater" element={<Seat1 />} />
        <Route path="/sofas/LShaped" element={<Lshaped />} />
        <Route path="/sofas/storageBench" element={<StorageBench />} />
        <Route path="/shoeracks" element={<ShoeRacks />} />
        <Route path="/sr" element={<SR />} />
        <Route path="/shoeracks/seat" element={<SeatSR />} />
        <Route path="/shoeracks/bench" element={<BenchSR />} />
        <Route path="/shoeracks/cabinet" element={<CabSR />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/success" element={<Sucess />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/X_MIN_DASH" element={<Admin/>}></Route>
        <Route path="/myorders" element={<MyOrder/>}></Route>
        <Route path="/pay" element={<Payments/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
