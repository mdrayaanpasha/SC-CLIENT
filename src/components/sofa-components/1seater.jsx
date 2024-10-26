import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";

// components
import LoadingComponent from "../non-routed-comps/loadingComp";
import Nav from "../non-routed-comps/nav";

//media assets
import "../../assets/css/product-pages.css";

function Seat1() {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }),
    []
  );

  const [data, setData] = useState(null);
  const dataCache = useRef(null); // useRef to store cached data

  useEffect(() => {
    const fetchD = async () => {
      // Only fetch if data isn't already in the cache
      if (!dataCache.current) {
        try {
          const d = await axios.get(
            "https://api-sc-pgsn.onrender.com/1seatget"
          );
          if (d.data.message === "ok") {
            dataCache.current = d.data.Data;
            setData(d.data.Data);
          } else {
            alert("There is an error in the backend!");
          }
        } catch (error) {
          alert("There is an error in the frontend");
          console.log(error);
        }
      } else {
        setData(dataCache.current);
      }
    };
    fetchD();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Nav />
      <h4 className="theme">1 Seater Sofas</h4>
      <div className="products">
        {data && data.length > 0 ? (
          data.map((ele, index) => (
            <div
              key={index}
              className="card"
              style={{ width: "18rem" }}
              onClick={() => (window.location.href = `/sfs?sku=${ele.Sku}`)}
            >
              <img
                src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/${ele[
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
                  </s>
                  {formatter.format(ele["Selling Price "])}
                  <span style={{ color: "green" }}>Save 25%</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <LoadingComponent />
        )}
      </div>
    </>
  );
}

export default Seat1;
