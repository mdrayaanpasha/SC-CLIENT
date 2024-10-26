import axios from "axios";
import { useEffect, useState } from "react";

//components
import LoadingComponent from "../non-routed-comps/loadingComp";
import Nav from "../non-routed-comps/nav";

//media assets.
import "../../assets/css/product-pages.css";

function Lshaped() {
  const [data, setData] = useState(null);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  useEffect(() => {
    const fetchD = async () => {
      try {
        const d = await axios.get("https://api-sc-pgsn.onrender.com/Lget");
        if (d.data.message === "ok") {
          setData(d.data.Data);
        } else {
          alert("there is an error in backend!");
        }
      } catch (error) {
        alert("there is an error in frontend");
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
      <Nav></Nav>
      <h4 className="theme">L Shaped Sofas</h4>
      <div className="products">
        {data && data.length > 0 ? (
          data.map((ele, index) => (
            <div
              key={index}
              className="card"
              style={{ width: "18rem" }}
              onClick={(e) => (window.location.href = `/sfs?sku=${ele.Sku}`)}
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
                  </s>{" "}
                  {formatter.format(ele["Selling Price "])}{" "}
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

export default Lshaped;
