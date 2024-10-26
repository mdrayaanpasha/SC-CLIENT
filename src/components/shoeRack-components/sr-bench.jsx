import axios from "axios";
import { useEffect, useState, useRef } from "react";

//components
import Nav from "../non-routed-comps/nav";
import LoadingComponent from "../non-routed-comps/loadingComp";

//media assets
import "../../assets/css/product-pages.css";

function BenchSR() {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false); // Ref to track if data has been fetched

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    const fetchD = async () => {
      if (hasFetchedRef.current) return; // Prevent fetching if already done

      try {
        const d = await axios.get(
          "https://api-sc-pgsn.onrender.com/benchSRget"
        );
        if (d.data.message === "ok") {
          setData(d.data.Data);
          hasFetchedRef.current = true; // Mark as fetched
        } else {
          alert("There is an error in the backend!");
        }
      } catch (error) {
        alert("There is an error in the frontend");
        console.log(error);
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
      <h4 className="theme">Shoe Rack With Bench</h4>
      <div className="products">
        {data && data.length > 0 ? (
          data.map((ele, index) => (
            <div
              key={index}
              className="card"
              style={{ width: "18rem" }}
              onClick={() => (window.location.href = `/sr?sku=${ele.Sku}`)}
            >
              <img
                src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/SR/${ele["Sub Category"].replace(" ", "%20")}/${ele["Sku"]}/main.jpg`}
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
                    {formatter.format(ele["Mrp "] || 0)}
                  </s>{" "}
                  {formatter.format(ele["Selling Price "] || 0)}{" "}
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

export default BenchSR;
