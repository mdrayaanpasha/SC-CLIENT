import axios from "axios";
import { useEffect, useState, useRef } from "react";

// Components
import LoadingComponent from "../non-routed-comps/loadingComp";
import Nav from "../non-routed-comps/nav";

// Media assets
import "../../assets/css/product-pages.css";

function Lshaped() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true); // Create a ref to track component mount status

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    isMounted.current = true; // Set to true when component mounts

    const fetchD = async () => {
      try {
        const response = await axios.get("https://api-sc-pgsn.onrender.com/Lget");
        const { message, Data } = response.data;

        if (message === "ok") {
          if (isMounted.current) { // Only update if still mounted
            setData(Data);
          }
        } else {
          if (isMounted.current) {
            setError("There is an error in the backend!");
          }
        }
      } catch (error) {
        if (isMounted.current) {
          setError("There is an error in the frontend");
          console.log(error);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchD();

    return () => {
      isMounted.current = false; // Set to false when component unmounts
    };
  }, []);

  return (
    <>
      <Nav />
      <h4 className="theme">L Shaped Sofas</h4>
      <div className="products">
        {loading && <LoadingComponent />}
        {error && <p className="error-message">{error}</p>}
        {data && data.length > 0 && data.map((ele) => (
          <div
            key={ele.Sku} // Use SKU as key
            className="card"
            style={{ width: "18rem" }}
            onClick={() => (window.location.href = `/sfs?sku=${ele.Sku}`)}
          >
            <img
              src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/${ele["Sub Category"].replace(" ", "%20")}/${ele["Sku"]}/main.jpg`}
              alt={ele.Title}
              className="card-img-top"
              loading="lazy"
              onError={(e) => { e.target.src = "path/to/fallback-image.jpg"; }} // Fallback image
            />
            <div className="card-body">
              <h5 className="card-title">{ele.Title}</h5>
              <small className="silver">{ele["Sub Category"]}</small>
              <hr />
              <p className="card-text">
                <s style={{ color: "silver" }}>
                  {formatter.format(ele["Mrp "] || 0)}
                </s>{" "}
                {formatter.format(ele["Selling Price "] || 0)}{" "}
                <span style={{ color: "green" }}>Save 25%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lshaped;
