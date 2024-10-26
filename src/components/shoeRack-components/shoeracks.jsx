import { useEffect, useState } from "react";
import axios from "axios";

//components
import Nav from "../non-routed-comps/nav";
import LoadingComponent from "../non-routed-comps/loadingComp";

//media assets
import Cab from "../../assets/img/shoerack-page/cabinet-sr.jpg";
import Seat from "../../assets/img/shoerack-page/seat-sr.jpg";
import Bench from "../../assets/img/shoerack-page/bench-sr.jpg";
import "../../assets/css/product-pages.css";

function ShoeRacks() {
  const [shoeRacks, setShoeRacks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-sc-pgsn.onrender.com/ShoeRacksget"
        );
        if (response.data.message === "ok") {
          setShoeRacks(response.data.D);
        } else {
          alert("There was some error in backend!");
        }
      } catch (error) {
        console.log(error);
        alert("There was an error fetching data from the backend");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (shoeRacks) {
      shoeRacks.forEach((element) => {
        console.log(element);
      });
    }
  }, [shoeRacks]);

  const se = (sku) => {
    window.location.href = `/sr?sku=${sku}`;
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return (
    <>
      <Nav />
      <h4 className="theme">Categories</h4>
      <div className="categories">
        <div className="cat">
          <img
            src={Cab}
            alt=""
            onClick={(e) => (window.location.href = "/shoeracks/cabinet")}
            loading="lazy"
          />
          <center>
            <p className="silver">Cabinet</p>
          </center>
        </div>
        <div
          className="cat"
          onClick={(e) => (window.location.href = "/shoeracks/bench")}
        >
          <img src={Bench} alt="" loading="lazy" />
          <center>
            <p className="silver">With Bench</p>
          </center>
        </div>
        <div
          className="cat"
          onClick={(e) => (window.location.href = "/shoeracks/seat")}
        >
          <img src={Seat} alt="" loading="lazy" />
          <center>
            <p className="silver">With Seat</p>
          </center>
        </div>
      </div>
      <hr />
      <h4 className="theme">ShoeRacks By SolaceCraft 👟</h4>
      <div>
        {shoeRacks ? (
          <div className="flex-div">
            {shoeRacks.map((ele, index) => (
              <div
                key={index}
                className="card"
                style={{ width: "18rem" }}
                onClick={(e) => se(ele.Sku)}
              >
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/SR/${ele[
                    "Sub Category"
                  ].replace(" ", "%20")}/${ele["Sku"]}/main.jpg`}
                  alt={ele.Title}
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{ele.Title}</h5>
                  <small className="silver">{ele["Sub Category"]}</small>
                  <hr />
                  <p className="card-text">
                    <s style={{ color: "silver" }}>
                      {formatter.format(ele["Mrp "])}
                    </s>{" "}
                    {formatter.format(ele["Selling Price "])}{" "}
                    <span style={{ color: "green" }}>Save 25%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <center>
              <h2>Loading.......</h2>
              <small>
                Did you know that, the first pieces of furniture were made from
                animal hides
              </small>
            </center>
          </>
        )}
      </div>
    </>
  );
}

export default ShoeRacks;
