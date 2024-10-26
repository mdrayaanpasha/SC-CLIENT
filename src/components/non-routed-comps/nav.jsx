import React from "react";

//media assets
import logo from "../../assets/img/misc/logo.png";
import "../../assets/css/nav.css";

const Nav = () => {
  const E = localStorage.getItem("D");
  const isLoggedIn = E ? true : false;
  const Email = E ? E.split("@")[0] : "";
  const furnitureFacts = [
    "The oldest known chair is over 5,000 years old!",
    "The term “couch” comes from the French word “coucher,” meaning “to lie down.”",
    "Ancient Egyptians were the first to use wooden beds with raised frames.",
    "The first known tables were used by ancient Egyptians for dining and working.",
    "Chippendale furniture, popular in the 18th century, is named after its designer, Thomas Chippendale.",
    "The average lifespan of a sofa is about 7-15 years.",
  ];

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * furnitureFacts.length);
    return furnitureFacts[randomIndex];
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  sticky-top">
        <div className="container-fluid">
          <div className="div" onClick={(e) => (window.location.href = "/")}>
            <img src={logo} alt="Logo" />
          </div>
          <div className="div">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!isLoggedIn && (
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/login"
                    >
                      {" "}
                      Login{" "}
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    {" "}
                    Home{" "}
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    Sofas{" "}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/sofas/3Seater">
                        {" "}
                        3 Seaters{" "}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/sofas/2Seater">
                        {" "}
                        2 Seaters{" "}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/sofas/1Seater">
                        {" "}
                        1 Seaters{" "}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/sofas/LShaped">
                        {" "}
                        L Shaped{" "}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/sofas/storageBench">
                        {" "}
                        Storage Bench{" "}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/sofas">
                        See all
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    Shoe Racks{" "}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/shoeracks/cabinet">
                        {" "}
                        Shoe Rack Cabinets{" "}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/shoeracks/seat">
                        {" "}
                        Shoe Rack With Seat{" "}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/shoeracks/bench">
                        {" "}
                        Shoe Rack With Bench{" "}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/shoeracks">
                        See all
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/cart"
                  >
                    Cart
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/myorders"
                  >
                    My Orders
                  </a>
                </li>
                {isLoggedIn && (
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      {" "}
                      Hello, {Email} 👋{" "}
                    </a>
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
