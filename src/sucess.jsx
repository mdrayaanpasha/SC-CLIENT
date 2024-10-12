import React from 'react';
import Nav from './nav';

import { useState, useEffect } from "react";
function Sucess() {
    const searchParams = new URLSearchParams(location.search);
    const [id, setId] = useState(searchParams.get("id"));
    return (
        
        <>
            <style>
                {`
                /* Write page CSS here */
                .message-box {
                    display: flex;
                    justify-content: center;
                    padding-top: 20vh;
                    padding-bottom: 20vh;
                }
                .success-container {
                    background: white;
                    height: 480px;
                    width: 90%;
                    box-shadow: 5px 5px 10px grey;
                    text-align: center;
                }
                .confirm-green-box {
                    width: 100%;
                    height: 140px;
                    background: #d7f5da;
                }
                .monserrat-font {
                    font-family: 'Montserrat', sans-serif;
                    letter-spacing: 2px;
                }
                /* --------------- site wide START ----------------- */
                .main {
                    width: 80vw;
                    margin: 0 10vw;
                    height: 50vh;
                    overflow: hidden;
                }
                body {
                    font-family: 'Montserrat', sans-serif;
                }
                :root {
                    --background-1: #ffffff;
                    --background-2: #E3E3E3;
                    --background-3: #A3CCC8;
                    --text-1: #000000;
                    --text-2: #ffffff;
                    --text-size-reg: calc(20px + (20 - 18) * ((100vw - 300px) / (1600 - 300)));
                    --text-size-sml: calc(10px + (10 - 8) * ((100vw - 300px) / (1600 - 300)));
                }
                .verticle-align {
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .no-style {
                    padding: 0;
                    margin: 0;
                }
                /* ------------------ site wide END ----------------- */
                /* ----- RESPONSIVE OPTIONS MUST STAY AT BOTTOM ----- */
                /* SM size and above unless overridden in bigger sizes */
                @media (min-width: 576px) { /* sm size */ }
                /* MD size and above unless overridden in bigger sizes */
                @media (min-width: 768px) { }
                /* LG size and above unless overridden in bigger sizes */
                @media (min-width: 992px) { }
                /* XL size and above */
                @media (min-width: 1200px) { }
                `}
            </style>

            {/* Start of nav */}
            <Nav></Nav>
            {/* End of nav */}

            {/* Start of main */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="message-box">
                            <div className="success-container">
                                <br />
                                <br />
                                <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                                  
                                </div>
                                <br />
                                <h1 className="monserrat-font" style={{ color: 'Grey' }}>Thank you for your order</h1>
                                <br />
                                <div className="confirm-green-box">
                                    <br />
                                    <h5>ORDER CONFIRMATION</h5>
                                    <p>Your order ID: {id}  has been successful!</p>
                                    <p>Thank you for choosing SolaceCraft. You will shortly receive a confirmation email.</p>
                                </div>
                                <br />
                                <button id="create-btn" className="btn btn-ouioui-secondary margin-left-5px" onClick={e=>window.location.href="./"}>Back to shop</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of main */}
        </>
    );
}

export default Sucess;
