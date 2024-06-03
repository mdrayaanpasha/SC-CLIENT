import React from "react";
import logo from "./loog-removebg-preview.png";

const Nav = () => {
    const E = localStorage.getItem("D");
    const isLoggedIn = E ? true : false;
    const Email = E ? E.split("@")[0] : "";

    return (
        <>
            <style>
                {`
                nav img {
                    height: 6vh;
                }
                nav {
                    justify-content: space-around !important;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
                    padding: 2vw;
                }
                .div {
                    margin: 0;
                }
                `}
            </style>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid">
                    <div className="div">
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
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {!isLoggedIn && (
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/login">
                                            Login
                                        </a>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">
                                        Home
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
                                        Sofas
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="/sofas/3Seater">
                                                3 Seaters
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/sofas/2Seater">
                                                2 Seaters
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/sofas/1Seater">
                                                1 Seaters
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/sofas/LShaped">
                                                L Shaped
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/sofas/storageBench">
                                                Storage Bench
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
                                        Shoe Racks
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="/shoeracks/cabinet">
                                                Shoe Rack Cabinets
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/shoeracks/seat">
                                                Shoe Rack With Seat
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/shoeracks/bench">
                                                Shoe Rack With Bench
                                            </a>
                                        </li>
                                        
                                        
                                        </ul>
                                        </li>
                                {isLoggedIn && (
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">
                                            Hello, {Email}
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
