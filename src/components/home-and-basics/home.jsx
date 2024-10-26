import React, { useEffect, useState } from "react";

//importing icons used in category sections.

import sofa from "../../assets/img/homepage/icons/sofa.png";
import bed from "../../assets/img/homepage/icons/beds.png";
import dining from "../../assets/img/homepage/icons/dining-table.png";
import shoe from "../../assets/img/homepage/icons/shoe-rack.png";

//miscleous images used in homepage:
import factory from "../../assets/img/homepage/misc/why.jpeg";
import trending from "../../assets/img/homepage/misc/mustHaveStyles.jpg";

//carousel images.
import o from "../../assets/img/homepage/carousel/1.png";
import t from "../../assets/img/homepage/carousel/2.png";
import th from "../../assets/img/homepage/carousel/3.png";

//mobile video cover.
import mainPhone from "../../assets/img/homepage/home-videos/homemain.mp4";

//videos for second category section.
import sofaban from "../../assets/img/homepage/home-videos/sofas.mp4";
import bedban from "../../assets/img/homepage/home-videos/beds.mp4";
import shoerackban from "../../assets/img/homepage/home-videos/storage.mp4";
import diningban from "../../assets/img/homepage/home-videos/dining.mp4";

//importing modules
import axios from "axios";

//css.
import "../../assets/css/home.css";

//importing components.
import Nav from "../non-routed-comps/nav";
import Footer from "../non-routed-comps/footer";

function Home() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  const [RandomData, setRandomData] = useState(null);
  useEffect(() => {
    const randomFetching = async () => {
      try {
        const D = await axios.get(
          "https://api-sc-pgsn.onrender.com/randomhome"
        );
        if (D.data.message === "ok") {
          setRandomData(D.data.Da);
        } else {
          alert("there is an error in backend!");
        }
      } catch (error) {
        alert("there  is an error in reat");
        console.log(error);
      }
    };
    randomFetching();
  }, []);

  useEffect(() => {
    if (RandomData) {
      let Data = RandomData;
      Data.forEach((element) => {
        if (element["Product Category"] === "SR") {
          element["Redirect"] = `/sr?sku=${element["Sku"]}`;
        } else {
          element["Redirect"] = `/sfs?sku=${element["Sku"]}`;
        }
      });

      setRandomData(Data);
    }
  }, [RandomData]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Nav />
      <center>
        <main>
          <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner" id="vid-main-pc">
              <div class="carousel-item active">
                <img src={o} class="d-block w-100" alt="..." loading="lazy" />
              </div>
              <div class="carousel-item">
                <img src={t} class="d-block w-100" alt="..." loading="lazy" />
              </div>
              <div class="carousel-item">
                <img src={th} class="d-block w-100" alt="..." loading="lazy" />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <video id="vid-main-phone" src={mainPhone} autoPlay muted />
        </main>
      </center>

      <hr />

      <div className="div">
        <center>
          <h1
            style={{ fontSize: "10vh", fontWeight: "bolder", color: "#676186" }}
            className="main-theme"
          >
            Uncover Your Perfect Style!
          </h1>
          <p style={{ color: "#676186" }} className="main-theme-p">
            Discover a spectrum of furniture categories designed to resonate
            with your distinct aesthetic. Whether you're drawn to minimalist
            chic or bold statement pieces.
          </p>
        </center>
      </div>
      <div className="category" style={{ padding: "2vw" }}>
        <div className="c">
          <img
            src={sofa}
            alt="Sofa"
            onClick={(e) => (window.location.href = "/sofas")}
            loading="lazy"
          />
          <center>
            <p>Sofa</p>
          </center>
        </div>
        <div className="c">
          <img src={dining} alt="Dining" loading="lazy" />
          <center>
            <p>Dining</p>
          </center>
        </div>
        <div className="c">
          <img src={bed} alt="Beds" />
          <center>
            <p>Beds</p>
          </center>
        </div>
        <div className="c">
          <img
            src={shoe}
            alt="Shoe Racks"
            onClick={(e) => (window.location.href = "/shoeracks")}
            loading="lazy"
          />
          <center>
            <p>Shoe Racks</p>
          </center>
        </div>
      </div>
      <center>
        <hr style={{ marginTop: "5vh" }} />

        <h1
          style={{ fontSize: "10vh", fontWeight: "bolder", color: "#676186" }}
          className="main-theme"
        >
          Spotlight on Timeless Elegance!
        </h1>
        <p style={{ color: "#676186" }} className="main-theme-p">
          Step into a realm of timeless elegance with our handpicked spotlights,
          showcasing furniture pieces that epitomize sophistication and enduring
          style.
        </p>
        <div
          className="flex-c-o"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p></p>
          <p style={{ color: "#676186", fontSize: "3vh", marginRight: "3vw" }}>
            Scroll &rarr;
          </p>
        </div>
      </center>
      <div className="spotlight" style={{ position: "relative" }}>
        <h3 style={{ position: "absolute", right: "0" }}>Slide &#8594; </h3>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/3%20Seater%20Sofa/SCSO23003PH/main.jpg"
            loading="lazy"
            alt="SCSO23003PH"
            onClick={() => (window.location.href = "./sfs?sku=SCSO23003PH")}
          />
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/L%20Shape%20Sofa/SCSO240001/main.jpg"
            loading="lazy"
            alt="SCSO240001"
            onClick={() => (window.location.href = "./sfs?sku=SCSO240001")}
          />
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/3%20Seater%20Sofa/SCSO23005BL/main.jpg"
            loading="lazy"
            alt="SCSO23005BL"
            onClick={() => (window.location.href = "./sfs?sku=SCSO23005BL")}
          />
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/Lounge%20Chair/SCWCS23002BL/main.jpg"
            loading="lazy"
            alt="SCWCS23002BL"
            onClick={() => (window.location.href = "./sr?sku=SCWCS23002BL")}
          />
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/SR/Dresser/SCDR23001TN/main.jpg"
            loading="lazy"
            alt="SCDR23001TN"
            onClick={() => (window.location.href = "./sr?sku=SCDR23001TN")}
          />
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/SR/Shoe%20Cabinet/SCSR0001RWN/main.jpg`}
            alt={"SCRSR001WN"}
            onClick={(e) =>
              (window.location.href = window.location.href =
                `sr?sku=SCRSR001WN`)
            }
            loading="lazy"
          ></img>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/SR/Shoe%20Cabinet/NSSSR0018TN/main.jpg`}
            loading="lazy"
            alt="NSSSR0018TN"
            onClick={(e) => (window.location.href = "./sr?sku=NSSSR0018TN")}
          ></img>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/SR/Shoe%20Cabinet%20with%20Seat/NSSSR0018STN/main.jpg"
            loading="lazy"
            alt="NSSSR0018STN"
            onClick={() => (window.location.href = "./sr?sku=NSSSR0018STN")}
          />
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            className="thing"
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/SR/Shoe%20Cabinet%20Bench/SCSR23004CW/main.jpg"
            loading="lazy"
            alt="SCSR23004CW"
            onClick={() => (window.location.href = "./sr?sku=SCSR23004CW")}
          />
        </div>
      </div>

      <center>
        <hr style={{ marginTop: "5vh" }} />

        <h1
          style={{ fontSize: "10vh", fontWeight: "bolder", color: "#676186" }}
          className="main-theme"
        >
          Discover Our Top Picks!
        </h1>
        <p style={{ color: "#676186" }} className="main-theme-p">
          Explore our handpicked selection of trending furniture pieces. From
          timeless classics to contemporary marvels, find the perfect addition
          to your home.
        </p>
      </center>

      <div className="random" style={{ backgroundColor: "#F8F7F2" }}>
        <video
          src={sofaban}
          autoPlay
          muted
          loop
          onClick={(e) => (window.location.href = "/sofas")}
          style={{ cursor: "pointer" }}
          loading="lazy"
        ></video>
        <video
          src={diningban}
          autoPlay
          muted
          loop
          onClick={(e) => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
          loading="lazy"
        ></video>
        <video
          src={bedban}
          autoPlay
          muted
          loop
          style={{ cursor: "pointer" }}
          loading="lazy"
        ></video>
        <video
          src={shoerackban}
          autoPlay
          loop
          muted
          onClick={(e) => (window.location.href = "/shoeracks")}
          style={{ cursor: "pointer" }}
          loading="lazy"
        ></video>
      </div>

      <hr />

      <center>
        <h1
          style={{ fontSize: "10vh", fontWeight: "bolder", color: "#676186" }}
          className="main-theme"
        >
          Discover Our Latest Arrivals
        </h1>
        <p style={{ color: "#676186" }} className="main-theme-p">
          Explore our newest arrivals, where style meets innovation. From modern
          marvels to timeless classics.
        </p>
      </center>

      <div className="latest-collection" style={{ padding: "2vw" }}>
        <div
          className="card"
          style={{ width: "18rem" }}
          onClick={(e) => (window.location.href = "/sfs?sku=SCSO240001")}
        >
          <img
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/L%20Shape%20Sofa/SCSO240001/main.jpg"
            className="card-img-top"
            alt="..."
            loading="lazy"
          />
          <div className="card-body">
            <h5 className="card-title">Arley L Shape Sofa</h5>
            <p>
              <b style={{ color: "#4A4270" }}>L Shaped Sofa</b>
            </p>
            <hr />
            <p className="card-text">
              <s>{formatter.format(49999)}</s> {formatter.format(39999)}{" "}
              <span style={{ color: "green" }}>Save 25%</span>
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{ width: "18rem" }}
          onClick={(e) =>
            (window.location.href =
              "https://api-sc-pgsn.onrender.com/sfs?sku=SCSO23003BL")
          }
        >
          <img
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/3%20Seater%20Sofa/SCSO23003BL/main.jpg"
            loading="lazy"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Swank Fabric Sofa</h5>
            <p>
              <b style={{ color: "#4A4270" }}>3 Seater Sofa</b>
            </p>
            <hr />
            <p className="card-text">
              <s>{formatter.format(24999)}</s> {formatter.format(19999)}{" "}
              <span style={{ color: "green" }}>Save 25%</span>
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{ width: "18rem" }}
          onClick={(e) =>
            (window.location.href =
              "https://api-sc-pgsn.onrender.com/sfs?sku=SCSO240003")
          }
        >
          <img
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/L%20Shape%20Sofa/SCSO240003/main.jpg"
            loading="lazy"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Emily L Shape Sofa</h5>
            <p>
              <b style={{ color: "#4A4270" }}>L Shaped Sofa</b>
            </p>
            <hr />
          </div>
          <p className="card-text">
            <s>{formatter.format(58749)}</s> {formatter.format(46999)}{" "}
            <span style={{ color: "green" }}>Save 25%</span>
          </p>
        </div>

        <div
          className="card"
          style={{ width: "18rem" }}
          onClick={(e) =>
            (window.location.href =
              "https://api-sc-pgsn.onrender.com/sfs?sku=SCSO240009CGY")
          }
        >
          <img
            src="https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/3%20Seater%20Sofa/SCSO240008CGY/main.JPG"
            loading="lazy"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Imperial Leatherette 2 Seater Sofa</h5>
            <p>
              <b style={{ color: "#4A4270" }}>3 Seater Sofa</b>
            </p>
            <hr />
            <p className="card-text">
              <s>{formatter.format(58749)}</s> {formatter.format(46999)}{" "}
              <span style={{ color: "green" }}>Save 25%</span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="trending">
        <center>
          <img src={trending} alt="" loading="lazy" />
          <h1
            style={{ fontSize: "10vh", fontWeight: "bolder", color: "#676186" }}
            className="main-theme"
          >
            MUST HAVE STYLES!
          </h1>
          <p style={{ color: "#676186" }} className="main-theme-p">
            Discover what's making waves in home decor. Our trending section
            brings you the most sought-after pieces that blend style, comfort,
            and functionality effortlessly.
          </p>
        </center>
      </div>
      <hr />

      <div
        className=""
        style={{
          backgroundImage: `url(${factory})`,
          opacity: "0.8",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0)",
          backgroundColor: "rgba(0,0,0, 0.4)",
        }}
      >
        <center>
          {/* <img src={factory} alt="" style={{ height: "80vh" }} /> */}
          <h1
            style={{
              fontSize: "10vh",
              fontWeight: "bolder",
              color: "#fff",
              paddingTop: "10%",
            }}
            className="main-theme"
          >
            WHY CHOOSE US?
          </h1>
          <p style={{ color: "#fff" }} className="main-theme-p">
            We're a top-rated furniture manufacturer renowned for our superior
            craftsmanship and high-quality products. With top sales on platforms
            like Pepperfry, our commitment to excellence ensures you get the
            best in durability, style, and customer satisfaction.
          </p>
          <div className="di" style={{ paddingBottom: "10%" }}>
            <button class="btn">Shop Sofas</button>
            <button class="btn">Shop ShoeRacks</button>
            <button class="btn">Shop Beds</button>
            <button class="btn">Shop Dining</button>
          </div>
        </center>
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
            <textarea className="form-control" id="exampleInputPassword1" />
          </div>
          <center>
            <button type="submit" className="btn btn-primary" id="btn-thing">
              Send
            </button>
          </center>
        </form>
      </div>
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        rel="stylesheet"
      />

      <Footer></Footer>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
}

export default Home;
