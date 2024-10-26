import { useEffect, useState, useRef } from "react";
import axios from "axios";

// Components
import Nav from "../non-routed-comps/nav";
import LoadingComponent from "../non-routed-comps/loadingComp";

// Media assets
import Seat1 from "../../assets/img/sofa-page/sofa-cat-1.jpg";
import Seat2 from "../../assets/img/sofa-page/sofa-cat-2.jpg";
import Seat3 from "../../assets/img/sofa-page/sofa-cat-3.jpg";
import L from "../../assets/img/sofa-page/sofa-cat-l.jpg";
import bench from "../../assets/img/sofa-page/sofa-cat-bench.jpg";
import "../../assets/css/product-pages.css";

function Sofas() {
  const [sofas, setSofas] = useState([]);
  const [error, setError] = useState(null);
  const lastClickedRef = useRef(null); // useRef for storing last clicked element

  useEffect(() => {
    const fetchSofas = async () => {
      try {
        const response = await axios.get("https://api-sc-pgsn.onrender.com/getSofas");
        setSofas(response.data.S || []);
      } catch (error) {
        console.error(error);
        setError("There was an error fetching data from the backend");
      }
    };

    fetchSofas();
  }, []);

  const formatTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .split("In")[0]; // Capitalize and remove "In" if exists
  };

  const updatedSofas = sofas.map((ele) => ({
    ...ele,
    Title: formatTitle(ele["Title"]),
  }));

  const se = (sku) => {
    window.location.href = `/sfs?sku=${sku}`;
  };

  const handleImageClick = (sku) => {
    lastClickedRef.current = sku; // Store the last clicked SKU
    se(sku);
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
        <div className="cat" onClick={() => (window.location.href = "/sofas/1seater")}>
          <img src={Seat1} alt="1 Seater" />
          <p className="silver">1 Seater</p>
        </div>
        <div className="cat" onClick={() => (window.location.href = "/sofas/2seater")}>
          <img src={Seat2} alt="2 Seater" />
          <p className="silver">2 Seater</p>
        </div>
        <div className="cat" onClick={() => (window.location.href = "/sofas/3seater")}>
          <img src={Seat3} alt="3 Seater" />
          <p className="silver">3 Seater</p>
        </div>
        <div className="cat" onClick={() => (window.location.href = "/sofas/lshaped")}>
          <img src={L} alt="L Shaped" />
          <p className="silver">L Shaped</p>
        </div>
        <div className="cat" onClick={() => (window.location.href = "/sofas/storageBench")}>
          <img src={bench} alt="Storage Bench" />
          <p className="silver">Storage Bench</p>
        </div>
      </div>
      <hr />
      <h4 className="theme">Sofas By SolaceCraft 🛋️</h4>
      <div>
        {error ? (
          <p>{error}</p>
        ) : updatedSofas.length > 0 ? (
          <div className="flex-div">
            {updatedSofas.map((ele, index) => (
              <div
                key={index}
                className="card"
                style={{ width: "18rem" }}
                onClick={() => handleImageClick(ele.Sku)}
              >
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/${ele["Sub Category"].replace(" ", "%20")}/${ele.Sku}/main.jpg`}
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
            ))}
          </div>
        ) : (
          <LoadingComponent />
        )}
      </div>
    </>
  );
}

export default Sofas;
