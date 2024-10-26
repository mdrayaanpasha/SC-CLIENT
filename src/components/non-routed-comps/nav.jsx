import React from "react";
import logo from "../../assets/img/misc/logo.png";

const Nav = () => {
    const E = localStorage.getItem("D");
    const isLoggedIn = E ? true : false;
    const Email = E ? E.split("@")[0] : "";
    const furnitureFacts = [
      'The oldest known chair is over 5,000 years old!',
      'The term “couch” comes from the French word “coucher,” meaning “to lie down.”',
      'Ancient Egyptians were the first to use wooden beds with raised frames.',
      'The first known tables were used by ancient Egyptians for dining and working.',
      'Chippendale furniture, popular in the 18th century, is named after its designer, Thomas Chippendale.',
      'The average lifespan of a sofa is about 7-15 years.'
  ];
  
  const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * furnitureFacts.length);
      return furnitureFacts[randomIndex];
  };
  
  
  
    return (
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com"  />
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            <style>
                {`
                nav img {
                height:10vh;
                }
                body{
                    background-color: #f8f7f2;
                    font-family: "Poppins", sans-serif;
                }
               nav {
               color:white !important;
  display: flex;
  justify-content: space-around !important;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2vw;
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Glass effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Optional: border to enhance glass effect */
  border-radius: 10px; /* Optional: rounded corners */
  margin: 10px; /* Optional: space around the nav */
  position: relative; /* Ensure proper positioning */
  z-index: 1; /* Ensure it stays above other elements */
}
   /* WebKit (Chrome, Safari, Opera) */
                 
                 ::-webkit-scrollbar {
    width: 8px; /* Adjust the width as needed */
}

                 ::-webkit-scrollbar-track {
                   background: #f1f1f1; /* color of the track */
                 }
                 
                 ::-webkit-scrollbar-thumb {
                   background: #6F698A; /* color of the thumb */
                   border-radius: 6px; /* roundness of the thumb */
                 }
                 
                 ::-webkit-scrollbar-thumb:hover {
                   background: darkblue /* color of the thumb on hover */
                 }
                  
                .navbar{
                    background-color: background-color: rgba(248, 247, 242, 0.5) !important;

                }
                .div {
                    margin: 0;
                }

                
                `}
            </style>
            

<nav className="navbar navbar-expand-lg  sticky-top" >
  <div className="container-fluid">
    <div className="div" onClick={e=>window.location.href="/"}>
      <img src={logo} alt="Logo" />
    </div>
    <div className="div">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {!isLoggedIn && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/login"> Login </a>
            </li>
          )}
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/"> Home </a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" > Sofas </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/sofas/3Seater"> 3 Seaters </a>
              </li>
              <li>
                <a className="dropdown-item" href="/sofas/2Seater"> 2 Seaters </a>
              </li>
              <li>
                <a className="dropdown-item" href="/sofas/1Seater"> 1 Seaters </a>
              </li>
              <li>
                <a className="dropdown-item" href="/sofas/LShaped"> L Shaped </a>
              </li>
              <li>
                <a className="dropdown-item" href="/sofas/storageBench"> Storage Bench </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/sofas">See all</a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" > Shoe Racks </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/shoeracks/cabinet"> Shoe Rack Cabinets </a>
              </li>
              <li>
                <a className="dropdown-item" href="/shoeracks/seat"> Shoe Rack With Seat </a>
              </li>
              <li>
                <a className="dropdown-item" href="/shoeracks/bench"> Shoe Rack With Bench </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/shoeracks">See all</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/cart">Cart</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/myorders">My Orders</a>
            </li>
          {isLoggedIn && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/"> Hello, {Email} 👋 </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
</nav>
</>
    );
};

export default Nav;
