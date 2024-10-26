import React from "react";

//components
import Nav from "../non-routed-comps/nav";

//media assets
import "../../assets/css/sucess.css";

import { useState, useEffect } from "react";
function Sucess() {
  const searchParams = new URLSearchParams(location.search);
  const [id, setId] = useState(searchParams.get("id"));
  return (
    <>
      <Nav></Nav>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="message-box">
              <div className="success-container">
                <br />
                <br />
                <div style={{ paddingLeft: "5%", paddingRight: "5%" }}></div>
                <br />
                <h1 className="monserrat-font" style={{ color: "Grey" }}>
                  Thank you for your order
                </h1>
                <br />
                <div className="confirm-green-box">
                  <br />
                  <h5>ORDER CONFIRMATION</h5>
                  <p>Your order ID: {id} has been successful!</p>
                  <p>
                    Thank you for choosing SolaceCraft. You will shortly receive
                    a confirmation email.
                  </p>
                </div>
                <br />
                <button
                  id="create-btn"
                  className="btn btn-ouioui-secondary margin-left-5px"
                  onClick={(e) => (window.location.href = "./")}
                >
                  Back to shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sucess;
