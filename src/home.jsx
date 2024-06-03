import React from 'react';
import "./index.css";

import sofa from "./sofa-cat.jpg";
import bed from "./beds.jpg";
import dining from "./dining-cat.jpg";
import why from "./why-us.jpg";
import factory from "./facto.jpg";
import shoe from "./img/sr-cat/seat-sr.jpg"
import mainPhone from "./main-phone.png";
import mainthing from "./thingthing.jpg";
import Nav from './nav';


function Home() {
   
    return (
        <>
            <style>
                {/* Global Styles */}
                
                {`
                body {
                    overflow-x: hidden;
                }
                a {
                    color: black;
                }
                main {
                    width: 100vw;
                    padding: 0;
                    margin: 0;
                    height: 95vh;
                    margin-bottom: 5vh;
                    background-color: #f8f7f2;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }
                main img {
                    height: auto;
                    width: auto;
                    max-height: 100%;
                    max-width: 100%;
                    
                }
                #cat {
                    margin-top: 10vh;
                    margin-bottom: 3vh;
                }

                .category {
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    flex-wrap: wrap;
                }

                .category img {
                    height: 30vh;
                    width: 15vw !important;
                    border-radius: 5%;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    transition: transform 0.3s ease-in-out;
                }

                .category img:hover {
                    transform: scale(1.1);
                }

                .category p {
                    color: silver;
                }

                /* Why Us Section Styles */
                .why-us {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    color: silver;
                    padding: 4vw;
                }

                .why-us img {
                    height: 60vh;
                    width: 30vw;
                    border-radius: 5%;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }

                #phone-img {
                    display: none;
                }

                .para {
                    margin-top: 9%;
                    padding: 3vw;
                    color: #000000a;
                }

                .para p {
                    font-size: 3vh;
                    font-weight: 3vw;
                }

                .theme {
                    color: #82C2C9;
                    font-weight: bold;
                }

                #btn-thing {
                    background-color: #82C2C9;
                    color: white;
                    width: 15vw;
                }

                .padd {
                    margin-left: 3vw;
                }

                /* Form Styles */
                form {
                    padding: 5vw;
                }

                /* Footer Styles */
                footer {
                    background-color: #82C2C9 !important;
                }

                #logo {
                    margin-left: 5vw;
                }

                /* Media Queries for Responsive Design */
                @media (max-width: 1230px) {
                    .category img {
                        width: 18vw;
                    }
                }

                @media (max-width: 1000px) {
                    .para {
                        font-size: 1vh !important;
                    }

                    .category img {
                        height: 20vh;
                    }
                }

                @media (max-width: 850px) {
                    .category img {
                        width: 20vw;
                    }

                    .why-us {
                        display: block !important;
                    }

                    .why-us img {
                        height: 50vh;
                        width: 50vw;
                        margin-left: 20%;
                        margin-bottom: 0;
                    }

                    .para {
                        margin-top: 4vh;
                    }
                }

                @media (max-width: 700px) {
                    .category img {
                        width: 25vw !important;
                        height: 18vh;
                        margin-left: 2vw;
                    }

                    main {
                        width: 104vw;
                    }
                }

                @media (max-width: 600px) {
                    .why-us img {
                        margin-left: 25%;
                    }

                    main {
                        padding: 2vw;
                        height: 48vh;
                    }
                }

                @media (max-width: 500px) {
                    .why-us img {
                        width: 70vw;
                        margin-left: 15%;
                    }

                    main {
                        background: #EFE8DC;
                    }

                    main img {
                        display: none;
                    }

                    #phone-img {
                        display: block;
                    }

                    .category img {
                        width: 30vw;
                    }
                }

                @media (max-width: 400px) {
                    .category {
                        width: 100vw;
                    }

                    .category img {
                        height: 30vh !important;
                        width: 55vw !important;
                        margin-left: 3%;
                    }

                    .why-us img {
                        width: 80vw;
                        margin-left: 7%;
                    }

                    .para {
                        font-size: 1px !important;
                    }
                }

                @media (max-width: 300px) {
                    .category img {
                        width: 40vw;
                    }
                }

                @media (max-width: 950px) {
                    main {
                        height: 62vh !important;
                    }
                }
                `}
            </style>
            <Nav />
            <center>
                <main>
                    <img src={mainthing} alt="" />
                    <img src={mainPhone} alt="" id='phone-img' />
                </main>
            </center>
            <div className="theme"><h4>What are you looking for?</h4></div>
            <div className="category">
                <div className="c">
                    <img src={sofa} alt="Sofa" onClick={e => window.location.href = "/sofas"} />
                    <center><p>Sofa</p></center>
                </div>
                <div className="c">
                    <img src={dining} alt="Dining" />
                    <center><p>Dining</p></center>
                </div>
                <div className="c">
                    <img src={bed} alt="Beds" />
                    <center><p>Beds</p></center>
                </div>
                <div className="c">
                    <img src={shoe} alt="Shoe Racks" onClick={e => window.location.href = "/shoeracks"} />
                    <center><p>Shoe Racks</p></center>
                </div>
            </div>
            <hr />
            <div className="theme"><h4 className="padd">Why Us?</h4></div>
            <div className="why-us">
                <img src={factory} alt="Factory" />
                <div className="para">
                    <center>
                        <p>We are a <span className="theme">premier</span> furniture manufacturer and supplier, partnering with <span className="theme">leading</span> retail stores across India. Renowned for our <span className="theme">quality</span>
                        and <span className="theme">innovation</span>, we are a <span className="theme">top-performing</span> brand on popular online furniture portals such as <span className="theme">Peperfry</span> and <span className="theme">Urban Ladder.</span> Our commitment to excellence and <span className="theme">customer satisfaction</span> sets us apart in the industry.</p>
                    </center>
                </div>
            </div>
            <hr />
            
            <div className="contact">
                <div className="theme"><h4 className="padd">Contact Us!</h4></div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Enter your Query</label>
                        <textarea
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <center>
                        <button type="submit" className="btn btn-primary" id="btn-thing">
                            Send
                        </button>
                    </center>
                </form>
            </div>
            <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
            <footer className="footer">
                <div className="footer__container container grid">
                    <div className="footer__content grid">
                        <a href="index.html" className="footer__logo">SolaceCraft</a>
                        <ul className="footer__links">
                            <li>
                                <a href="about.html" className="footer__link">About Us</a>
                            </li>
                            <li>
                                <a href="work.html" className="footer__link">Contact Us</a>
                            </li>
                            <li>
                                <a href="contact.html" className="footer__link">Login</a>
                            </li>
                        </ul>
                        <div className="footer__social">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-facebook-circle-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-twitter-x-line"></i>
                            </a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-linkedin-box-fill"></i>
                            </a>
                        </div>
                    </div>
                    <span className="footer__copy">
                        &#169; Solace Craft 2024. All rights reserved
                    </span>
                </div>
            </footer>
            
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    );
}

export default Home;