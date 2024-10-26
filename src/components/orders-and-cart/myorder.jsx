import axios from "axios";
import { useEffect, useState } from "react";

//components
import Nav from "../non-routed-comps/nav";

//media assets
import "../../assets/css/myorders.css";

function MyOrder() {
  const email = localStorage.getItem("D");
  const [MyOrders, setMyOrders] = useState(null);

  useEffect(() => {
    if (email) {
      const fetchMyOrders = async () => {
        try {
          const response = await axios.post(
            "https://api-sc-pgsn.onrender.com/myordersget",
            { Email: email }
          );
          if (response.data.message) {
            setMyOrders(response.data.Orders);
          } else {
            alert("There is an error in the backend");
          }
        } catch (error) {
          console.error(error);
          alert("Frontend problem!");
        }
      };
      fetchMyOrders();
    }
  }, [email]);

  const CancelOrder = async (d) => {
    try {
      const response = await axios.post(
        "https://api-sc-pgsn.onrender.com/cancelorder",
        { data: d }
      );
      if (response.data.message) {
        setMyOrders(MyOrders.filter((order) => order["Order Id"] !== d._id));
        alert("Order canceled successfully");
      } else {
        alert("Failed to cancel order");
      }
    } catch (error) {
      console.error(error);
      alert("Error canceling order");
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  if (!email) {
    return <p>You are not signed in!</p>;
  } else {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <Nav />

        <h2>👋 Hello There! Your Orders</h2>
        {MyOrders === null ? (
          <p className="no-orders">Loading orders...</p>
        ) : MyOrders.length > 0 ? (
          MyOrders.sort((a, b) => b["Admin"] - a["Admin"]).map((ele) => {
            const orderDate = new Date(ele["Order Date"]);
            orderDate.setDate(orderDate.getDate() + 7);
            const newOrderDate = orderDate.toLocaleDateString();

            return (
              <div key={ele["Order Id"]} className="Product-card">
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/${
                    ele["Product Type"] === "Sofa"
                      ? "sofa"
                      : ele["Product Type"].toUpperCase()
                  }/${ele["Product Sub-Type"]}/${ele["Product Sku"]}/main.jpg`}
                  alt={`Image of ${ele["Product Name"]}`}
                  loading="lazy"
                />
                <div className="des">
                  <p style={{ fontSize: "3vh" }}>
                    <b>{ele["Product Name"]}</b>
                  </p>
                  <small>{formatter.format(ele["Product Price"])}</small>
                  <p>{ele["Costumer Address"]}</p>
                  <p style={{ color: "green" }}>
                    {ele["Admin"] ? (
                      <p style={{ color: "green" }}>
                        {" "}
                        <i class="fa fa-truck"></i> Expected Delivery Date:{" "}
                        {newOrderDate}{" "}
                      </p>
                    ) : (
                      `Delivered Already!!`
                    )}
                  </p>
                  {ele["Admin"] && (
                    <button onClick={() => CancelOrder(ele)}>
                      Cancel Order!
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-orders">No orders found.</p>
        )}
      </>
    );
  }
}

export default MyOrder;
