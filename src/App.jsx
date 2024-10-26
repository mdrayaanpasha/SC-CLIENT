import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



//home-and-basics:
import Home from "./components/home-and-basics/home";
import Images from "./components/home-and-basics/images";
import Admin from "./components/home-and-basics/admin";


//auth:
import Login from "./components/auth/login";
import Register from "./components/auth/register";


//orders-and-cart:
import Cart from "./components/orders-and-cart/cart";
import Order from "./components/orders-and-cart/order";
import Sucess from "./components/orders-and-cart/sucess";
import Failed from "./components/orders-and-cart/failed";
import MyOrder from "./components/orders-and-cart/myorder";
import Payments from "./components/orders-and-cart/payments";
import OrderFail from "./components/orders-and-cart/orderfail";

//sofa-components
import Sofas from "./components/sofa-components/sofas";
import Seat1 from "./components/sofa-components/1seater";
import Seat3 from "./components/sofa-components/3seater";
import Seat2 from "./components/sofa-components/2seater";
import Lshaped from "./components/sofa-components/lshaped";
import Sf from "./components/sofa-components/sf";

//shoeRack-component
import StorageBench from "./components/shoeRack-components/1-storagebench";
import ShoeRacks from "./components/shoeRack-components/shoeracks";
import SeatSR from "./components/shoeRack-components/sr-seat";
import BenchSR from "./components/shoeRack-components/sr-bench";
import CabSR from "./components/shoeRack-components/sr-cabinet";
import SR from "./components/shoeRack-components/srs";


//importing common modules.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { compile } from "sass";


function App() {
  return (
    <Router >
      <Routes>

        <Route path="/" element={<Home />} />
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
        <Route path="/order-fail" element={<OrderFail/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
