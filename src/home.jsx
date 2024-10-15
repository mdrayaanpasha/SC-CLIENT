import React, { useEffect, useState } from 'react';
import "./index.css";

import sofa from "./img/icons/sofa.png";
import bed from "./img/icons/beds.png";
import dining from "./img/icons/dining-table.png";
import why from "./why.jpeg";
import factory from "./why.jpeg";
import shoe from "./img/icons/shoe-rack.png"

import mainthing from "./thingthing.jpg";
import Nav from './nav';


import trending from "./theCover.jpg"

import o from "./img/car/1.png";
import t from "./img/car/2.png";
import th from "./img/car/3.png";

import mainVid from "./videos/main.mp4"
import mainPhone from "./img/home/homemain.mp4" 

import sofaban from "./img/home/sofas.mp4"
import bedban from "./img/home/beds.mp4"
import shoerackban from "./img/home/storage.mp4"
import diningban from "./img/home/dining.mp4"
import axios from 'axios';
import viewAll from "./sofa-cat.jpg"

function Home() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });
    const [RandomData,setRandomData]=useState(null)
    useEffect(()=>{
        const randomFetching = async()=>{
            try {
                const D = await axios.get("https://api-sc-pgsn.onrender.com/randomhome");
                if(D.data.message==="ok"){
                    setRandomData(D.data.Da)
                }else{
                    alert("there is an error in backend!")
                }
            } catch (error) {
                alert("there  is an error in reat")
                console.log(error)
            }
        }
        randomFetching()


    },[])

    useEffect(()=>{
        if(RandomData){
            let Data= RandomData
            Data.forEach(element => {
                if(element["Product Category"]==="SR"){
                    element["Redirect"]=`/sr?sku=${element["Sku"]}`
                }else{
                    element["Redirect"]=`/sfs?sku=${element["Sku"]}`
                }
            });

            setRandomData(Data)
        }
    },[RandomData])
   
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
                   
                }
                    .category{
                        flex-wrap:wrap;
                    }
                #vid-main-pc {
                    height: auto;
                    width: auto;

                    max-height: 90%;
                    max-width: 100%;
                    border:0px;
                    
                }
                #vid-main-pc img{
                height:95vh;
                width:auto;
                }
                #vid-main-phone{
                    height:0;
                    width:0;
                }
                #vid-main-pc:hover{
                    border:0px;
                }
                #cat {
                    margin-top: 10vh;
                    margin-bottom: 3vh;
                }

                .category {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    overflow:auto;
                }

                .category img {
                    height: 30vh;
                   width:auto;
                    border-radius: 5%;
                   margin-right:5vw;
                    transition: transform 0.3s ease-in-out;
                }

                .category img:hover {
                    transform: scale(1.1);
                }

                .category p {
                    color: silver;
                }

                /* Why Us Section Styles */
          

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
                    color: #655F7F;;
                    font-weight: bold;
                    
                }
                .mar{
                    margin:3vw;
                }

                #btn-thing {
                    background-color: #4A4270;
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
                    background-color: #4A4270 !important;
                }

                #logo {
                    margin-left: 5vw;
                }

                /* Media Queries for Responsive Design */
              

                @media (max-width: 1000px) {
                    .para {
                        font-size: 1vh !important;
                    }
                    .d-block, .w-100{
                    height:80vh !important;
                    }
                    .carousel img, .carousel-inner, .carousel-inner img, .carousel-item, .carousel-item img, .carousel-item img, #vid-main-pc , #vid-main-pc img, #carouselExampleFade{
                    height:80vh !important;
                    }

                 
                    
                    .main-theme{
                    margin-top:10vh;
                    }
                }

                @media (max-width: 850px) {
                   

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
                    .main-theme{
                    font-size:6vh !important;
                    }
                    .main-theme-p{
                    font-size:2vh !important;
                    
                    }
                }

                @media (max-width: 700px) {
                    .category img {
                      
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
                   #vid-main-phone{
                        
                        height: auto;
                        width: auto;
                        max-height: 100%;
                        max-width: 100%;  
                    }
                    #vid-main-pc{
                        height:0;
                        width:0;
                    }
                    main{
                        box-shadow:none;
                    }
                    .carousel{
                     display:none;
                    }
                   

                   

                    #phone-img {
                        display: block;
                    }

                    
                     .main-theme{
                    font-size:4vh !important;
                    }
                    .main-theme-p{
                    font-size:1.3vh !important;
                    
                    }
                }

                @media (max-width: 400px) {
                    .category {
                        width: 100vw;
                    }

                    .category img {
                        height: 30vh !important;
                      
                        margin-left: 3%;
                    }

                    .why-us img {
                        width: 80vw;
                        margin-left: 7%;
                    }

                    .para {
                        font-size: 1px !important;
                    }
                    .random video{
                    margin:0 !important;
                    margin-bottom:2vh !important;
                    }
                   
                    .btn{
                    padding:1vw;
                    font-size:2vh;
                    margin-top:2vh;
                    }
                }

             

                @media (max-width: 950px) {
                    main {
                        height: 62vh !important;
                    }
                }
                s, p b{
                    color:silver;
                }
                .card .btn{
                    background-color:#4A4270;
                    color:white;
                    border:none;
                    
                }
                .card{
                    margin:2vw;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }
                .latest-collection{
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    flex-wrap:wrap;
                }
                body{
                    background-color: #f8f7f2;
                }
                .card:hover {
                    transition: all 0.5s ease-in-out; transform: scale(1.1); 

                  }

                 .random{
                    display:flex;
                    flex-wrap:wrap;
                    align-items:center;
                    justify-content:space-around;
                 } 
                 .random video{
                    width:40vw;
                    margin:5vh;
                 
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                 }
                 @media(max-width:500px){
                    body{
                        overflow-x:hidden;
                    }
                        .trending{
                        display:none !important;
                        }
                    .random video{
                        width:90vw;
                     }
                        h1{
                        fontSize:5vh;
                        }
                 }
                
              
                .spotlight{
                display:flex;
                flex-wrap:no-wrap;
                overflow-x:auto;
                align-items:center;
                justify-content:space-evenly;
                
                

                }
                .card{
                margin:2vw
                }
                .spotlight .card{
flex: 0 0 auto;
                    width:auto;
                }
                .carousel-control-prev-icon {
                        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3e%3cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e");
                    }
                    .carousel-control-next-icon {
                        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3e%3cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e");
                        transform: scaleX(-1);
                    }

                .carousel, .carousel img, main{
                // margin-top:5vh;
                height:110vh;
                object-contain:cover;
                width:98vw;
               margin:0;
               padding:0;
                }
               body{
               scroll-behaviour:smooth;
               }
                `
            
                }

            </style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <Nav />
            <center>
                
                <main>
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                    <div class="carousel-inner" id='vid-main-pc'>
                        <div class="carousel-item active">
                        <img src={o} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                        <img src={t} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                        <img src={th} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>
                
                    <video id='vid-main-phone' src={mainPhone} autoPlay muted />
                </main>
            </center>
            
        <hr />

<div className="div">

<center>
            
        <h1 style={{fontSize:"10vh", fontWeight:"bolder", color:"#676186"}} className='main-theme'>Uncover Your Perfect Style!</h1>
    <p style={{color:"#676186"}} className='main-theme-p'>Discover a spectrum of furniture categories designed to resonate with your distinct aesthetic. Whether you're drawn to minimalist chic or bold statement pieces.</p>
    </center>
            </div>
            <div className="category" style={{padding:"2vw"}}>
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
            <center>
                <hr style={{marginTop:"5vh"}}/>
            
        <h1 style={{fontSize:"10vh", fontWeight:"bolder", color:"#676186"}} className="main-theme">Spotlight on Timeless Elegance!</h1>
    <p style={{color:"#676186"}} className="main-theme-p">Step into a realm of timeless elegance with our handpicked spotlights, showcasing furniture pieces that epitomize sophistication and enduring style.</p>
    <div className="flex-c-o" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <p></p>
        <p style={{color:"#676186",fontSize:"3vh", marginRight:"3vw"}}>Scroll &rarr;</p>
    </div>
    </center>
            <div className="spotlight" style={{position: "relative"}} >
            <h3 style={{position:"absolute",right:"0",}}>Slide &#8594; </h3>
                {RandomData && RandomData.map(element => (
                    <div className="card" style={{ width: "18rem" }}>
                   <img className="thing" src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/${element["Product Category"] === "Sofa" ? element["Product Category"].toLowerCase() : element["Product Category"].toUpperCase() }/${element["Sub Category"]}/${element["Sku"]}/main.jpg`} alt={element["Title"]}onClick={e=>window.location.href=element["Redirect"]}></img>
                   
                </div>
                ))}
                
                
            </div>
            
            <center>
                <hr style={{marginTop:"5vh", }}/>
            
        <h1 style={{fontSize:"10vh", fontWeight:"bolder", color:"#676186"}} className="main-theme">Discover Our Top Picks!</h1>
    <p style={{color:"#676186"}} className="main-theme-p">Explore our handpicked selection of trending furniture pieces. From timeless classics to contemporary marvels, find the perfect addition to your home.</p>
    </center>
    
            <div className="random" style={{backgroundColor:"#F8F7F2"}}>
            <video src={sofaban} autoPlay muted loop  onClick={e=>window.location.href="/sofas"} style={{cursor:"pointer"}} ></video>
            <video src={diningban} autoPlay muted loop  onClick={e=>window.location.href="/"} style={{cursor:"pointer"}}></video>
            <video src={bedban} autoPlay muted loop style={{cursor:"pointer"}}></video>
            <video src={shoerackban} autoPlay loop muted onClick={e=>window.location.href="/shoeracks"} style={{cursor:"pointer"}}></video>
        </div>
        
        <hr />


        <center>
                
            
        <h1 style={{fontSize:"10vh", fontWeight:"bolder", color:"#676186"}} className="main-theme">Discover Our Latest Arrivals</h1>
    <p style={{color:"#676186"}} className="main-theme-p">Explore our newest arrivals, where style meets innovation. From modern marvels to timeless classics.</p>
    </center>
            <style>
                {
                    `
                    .latest-collection .card{
                        border:none;
                        box-shadow:none;
                        background-color:#F8F7F2;
                    
                    }
                    .latest-collection .card img, .latest-collection .card{
                        border-radius:1vw;
                    }
                    .latest-collection .card:hover{
                    
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    }

                    `
                }
            </style>
            <div className="latest-collection" style={{padding:"2vw"}}>
                
            <style>

{`
.latest-collection .card{
background: rgba(255, 255, 255, 0.2) !important; /* Semi-transparent background */
backdrop-filter: blur(10px) !important; /* Glass effect */
-webkit-backdrop-filter: blur(10px) !important; /* For Safari support */
border: 1px solid rgba(255, 255, 255, 0.3) !important; /* Optional: border to enhance glass effect */
border-radius: 10px; /* Optional: rounded corners */
margin: 10px; /* Optional: space around the nav */
position: relative !important; /* Ensure proper positioning */
z-index: 1 !important;
}

`}
</style>
                
                <div className="card" style={{ width: "18rem" }} onClick={e=>window.location.href="/sfs?sku=SCSO240001"}>
                    <img src="https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/L%20Shape%20Sofa/SCSO240001/main.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">Arley L Shape Sofa</h5>
                        <p><b style={{color:"#4A4270"}}>L Shaped Sofa</b></p>
                        <hr />
                        <p className="card-text"><s>{formatter.format(49999)}</s> {formatter.format(39999)} <span style={{ color: "green" }}>Save 25%</span></p>
                    </div>
                </div>


                <div className="card" style={{ width: "18rem" }} onClick={e=>window.location.href="https://api-sc-pgsn.onrender.com/sfs?sku=SCSO23003BL"}>
                    <img src="https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/3%20Seater%20Sofa/SCSO23003BL/main.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">Swank Fabric Sofa</h5>
                        <p><b style={{color:"#4A4270"}}>3 Seater Sofa</b></p>
                        <hr />
                        <p className="card-text"><s>{formatter.format(24999)}</s> {formatter.format(19999)} <span style={{ color: "green" }}>Save 25%</span></p>
                        

                   
                    </div>
                </div>
                
                <div className="card" style={{ width: "18rem" }} onClick={e=>window.location.href="https://api-sc-pgsn.onrender.com/sfs?sku=SCSO240003"}>
                    <img src="https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/L%20Shape%20Sofa/SCSO240003/main.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">Emily L Shape Sofa</h5>
                        <p><b style={{color:"#4A4270"}}>L Shaped Sofa</b></p>
                        <hr />
                    </div>
                    <p className="card-text"><s>{formatter.format(58749)}</s> {formatter.format(46999)} <span style={{ color: "green" }}>Save 25%</span></p>


                </div>

                <div className="card" style={{ width: "18rem" }} onClick={e=>window.location.href="https://api-sc-pgsn.onrender.com/sfs?sku=SCSO240009CGY"}>
                    <img src="https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/3%20Seater%20Sofa/SCSO240008CGY/main.JPG" className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">Imperial Leatherette 2 Seater Sofa</h5>
                        <p><b style={{color:"#4A4270"}}>3 Seater Sofa</b></p>
                        <hr />
                        <p className="card-text"><s>{formatter.format(58749)}</s> {formatter.format(46999)} <span style={{ color: "green" }}>Save 25%</span></p>
                    </div>
                </div>

              
            
            
            
            </div>
            

<hr />
<style>
    {`
    .btn{
    border:2px solid #ffff;
    color:#ffff;
    margin-right:2vw;    

  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.1); /* Black w/opacity/see-through */
    
    }
    .btn:hover{
    background-color:#ffff;
    color:none;
    opacity:1.0;
    

    }
    .trending img{
    object-fit:contain;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2), 
              0px 10px 20px rgba(0,0,0,0.3), 
              0px 20px 30px rgba(0,0,0,0.4);

    height:95vh !important;
    width:auto;
    border-radius:1vw;
    
    }
    
    `}
</style>
<div className="trending">
    <center>
        <img src={trending} alt="" />
    <h1 style={{fontSize:"10vh", fontWeight:"bolder", color:"#676186"}} className="main-theme">MUST HAVE STYLES!</h1>
    <p style={{color:"#676186"}} className="main-theme-p">Discover what's making waves in home decor. Our trending section brings you the most sought-after pieces that blend style, comfort, and functionality effortlessly.</p>
    </center>
</div>
<hr /> 

<div className="" style={{ backgroundImage: `url(${factory})`, opacity:"0.8", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor:"rgba(0,0,0)",backgroundColor:"rgba(0,0,0, 0.4)", }}>
      <center>
        
        {/* <img src={factory} alt="" style={{ height: "80vh" }} /> */}
        <h1 style={{ fontSize: "10vh", fontWeight: "bolder",color:"#fff", paddingTop:"10%" }} className='main-theme'>WHY CHOOSE US?</h1>
        <p style={{ color: "#fff" } } className="main-theme-p">We're a top-rated furniture manufacturer renowned for our superior craftsmanship and high-quality products. With top sales on platforms like Pepperfry, our commitment to excellence ensures you get the best in durability, style, and customer satisfaction.</p>
        <div className="di" style={{paddingBottom:"10%"}}>
        <button class="btn">Shop Sofas</button>
        <button class="btn">Shop ShoeRacks</button>
        <button class="btn">Shop Beds</button>
        <button class="btn">Shop Dining</button>
        </div>
      </center >
      
    </div>
    <hr />


           
            
            <div className="contact">
                <h2 className="theme mar">Contact Us! </h2>
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