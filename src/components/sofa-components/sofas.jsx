import { useEffect, useState } from "react";
import axios from "axios";

//components
import Nav from "../non-routed-comps/nav";
import LoadingComponent from "../non-routed-comps/loadingComp";

//media assets.
import Seat1 from "../../assets/img/sofa-page/sofa-cat-1.jpg";
import Seat2 from "../../assets/img/sofa-page/sofa-cat-2.jpg";
import Seat3 from "../../assets/img/sofa-page/sofa-cat-3.jpg";
import L from "../../assets/img/sofa-page/sofa-cat-l.jpg";
import bench from "../../assets/img/sofa-page/sofa-cat-bench.jpg";
import "../../assets/css/product-pages.css";

function Sofas() {
  const string =
    "https://api-sc-pgsn.onrender.com/public/img/sofa/1 Seater Sofa/SCSO23004BL/main.jpg";
  const thing = string.replace(" ", "%20");
  const [Sofa, setSofas] = useState(null);
  const [UpdatedSofa, setUpdatedSofa] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-sc-pgsn.onrender.com/getSofas"
        );
        setSofas(response.data.S); // Update state with fetched data\
      } catch (error) {
        console.log(error);
        alert("There was an error fetching data from the backend");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Sofa && Sofa.length > 0) {
      // Update titles of sofas to capitalize the first letter of each word
      let updatedSofa = Sofa.map((ele) => {
        let title = ele["Title"];
        if (title !== undefined) {
          let words = title.split(" ");

          for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          }
          // Join the words back into a single string
          let Fin = words.join(" ");

          let fin = Fin.split("In");

          ele["Title"] = fin[0];
          return ele;
        }
      });
      setUpdatedSofa(updatedSofa);
    }
  }, [Sofa]);

  const se = (sku) => {
    window.location.href = `/sfs?sku=${sku}`;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return (
    <>
      <Nav></Nav>
      <h4 className="theme">Categories</h4>
      <div className="categories">
        <div className="cat">
          <img
            src={Seat1}
            alt=""
            onClick={(e) => (window.location.href = "/sofas/1seater")}
          />
          <center>
            <p className="silver">1 Seater</p>
          </center>
        </div>

        <div
          className="cat"
          onClick={(e) => (window.location.href = "/sofas/2seater")}
        >
          <img src={Seat2} alt="" />
          <center>
            <p className="silver">2 Seater</p>
          </center>
        </div>

        <div
          className="cat"
          onClick={(e) => (window.location.href = "/sofas/3seater")}
        >
          <img src={Seat3} alt="" />
          <center>
            <p className="silver">3 Seater</p>
          </center>
        </div>

        <div
          className="cat"
          onClick={(e) => (window.location.href = "/sofas/lshaped")}
        >
          <img src={L} alt="" />
          <center>
            <p className="silver">L Shaped</p>
          </center>
        </div>

        <div
          className="cat"
          onClick={(e) => (window.location.href = "/sofas/storageBench")}
        >
          <img src={bench} alt="" />
          <center>
            <p className="silver">Storage Bench</p>
          </center>
        </div>
      </div>
      <hr />
      <h4 className="theme">Sofas By SolaceCraft 🛋️</h4>
      <div>
        {UpdatedSofa ? (
          <div className="flex-div">
            {UpdatedSofa.map((ele, index) =>
              ele !== undefined ? (
                <div
                  key={index}
                  className="card"
                  style={{ width: "18rem" }}
                  onClick={() => se(ele.Sku)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/${ele[
                      "Sub Category"
                    ].replace(" ", "%20")}/${ele.Sku}/main.jpg`}
                    alt={ele.Title}
                    className="card-img-top"
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ele.Title}</h5>
                    <small className="silver">{ele["Sub Category"]}</small>
                    <hr />
                    <p className="card-text">
                      <s>{formatter.format(ele["Mrp "])}</s>{" "}
                      {formatter.format(ele["Selling Price "])}{" "}
                      <span className="off">Save 25%</span>
                    </p>
                  </div>
                </div>
              ) : (
                <LoadingComponent />
              )
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Sofas;
