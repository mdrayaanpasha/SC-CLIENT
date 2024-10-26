import axios from "axios";
import { useEffect, useState,useRef } from "react";


//media assets.
import logo from "../../assets/img/misc/logo.png";
import "../../assets/css/admin.css";

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [canceled, setCanceled] = useState([]); 
  const [showOrders, setShowOrders] = useState(true);
  const [showCanceled, setShowCanceled] = useState(false);

  const fetchAdminRef = useRef(false); 

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      if (fetchAdminRef.current) return; 
      fetchAdminRef.current = true;

      try {
        const ad = await axios.get("https://api-sc-pgsn.onrender.com/getAdmin");
        if(ad.data.message) {
          const filteredData = ad.data.D.filter(ele => ele.Admin);
          setData(filteredData);
        } else {
          alert("There is some problem again!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        fetchAdminRef.current = false; // Reset after completion
      }
    };

    fetchAdmin();
  }, []);


  const handleForm = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (password === "") {
      alert("Password field cannot be empty.");
      return;
    }

    if (password === "solacecraft@admin.123") {
      setAuthenticated(true);
    } else {
      alert("Wrong Password!");
    }
  };

  const delOrder = async(id) => {
    try {
      const d = await axios.post("https://api-sc-pgsn.onrender.com/delOrder", { orderId: id });
      if(d.data.message){
        alert("deleted!");
      }else{
        alert("there was a problem in the backend services!");
      }
    } catch (error) {
      alert("snap problem in frontend!!!");
      console.log(error);
    }
  }
  const delCancel = async(id) => {
    try {
      const d = await axios.post("https://api-sc-pgsn.onrender.com/delCancel", { orderId: id });
      if(d.data.message){
        alert("deleted!");
      }else{
        alert("there was a problem in the backend services!");
      }
    } catch (error) {
      alert("snap problem in frontend!!!");
      console.log(error);
    }
  }

  const fetchCanceled = async() => {
    try {
      const response = await axios.get("https://api-sc-pgsn.onrender.com/cancelGet");
      if(response.data.message){
        console.log(response.data.Da);
        setCanceled(response.data.Da);
      }else{
        alert("there is an error in backend");
      }
    } catch (error) {
      console.log(error);
      alert("error in frontend");
    }
  }

  return (
    <>
   


          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      {!authenticated && (
        <section className="formthing">
          <form onSubmit={handleForm}>
            <img src={logo} alt="" loading="lazy" />
            
            <input type="password" name="password" className="form-control mb-3" placeholder="Enter password" />
            <input type="submit" className="btn btn-primary" value="Get Access" />
          </form>
        </section>
      )}

      {authenticated && showOrders && !showCanceled && (
        <>
          
          <h1>👋 Welcome to admin Panel</h1>
          <h4>New Orders.</h4>
          <center>
          <button onClick={() => {
            setShowCanceled(true);
            setShowOrders(false);
            fetchCanceled();
          }}>Check Cancelations</button></center>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Customer ID</th>
                <th>Customer Location</th>
                <th>Product Image</th>
                <th>Product Sku</th>
                <th>Product Name</th>
                <th>Product Quantity</th>

                <th>Product Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order["Order Date"]).toLocaleDateString()}</td>
                  <td>{order["Costumer Name"]}</td>
                  <td>{order["Costumer Email"]}</td>
                  <td>{order["Costumer Phone"]}</td>
                  <td>{order["Costumer Id"]}</td>
                  <td>{order["Costumer Adress"]}</td>
                  <td><img 
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${order["Product Type"] === "Sofa" ? "sofa" : order["Product Type"].toUpperCase() }/${order["Product Sub-Type"]}/${order["Product Sku"]}/main.jpg`} 
                    alt="" 
                    loading="lazy"
                    /></td>
                  <td>{order["Product Sku"]}</td>
                  <td>{order["Product Name"]}</td>
                  <td>{order["Product Quantity"] ? order["Product Quantity"] : 1}</td>
                  <td>{formatter.format(order["Product Price"])}</td>
                  <td style={{color:"red",cursor:"pointer"}} onClick={() => delOrder(order._id)}><i className="material-icons">delete</i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {authenticated && !showOrders && showCanceled && (
        <>
        <h1>👋 Welcome to admin Panel</h1>
          <h4>Canceled Orders.</h4>
          <center>
          <button onClick={() => {
            setShowCanceled(false);
            setShowOrders(true);
            fetchCanceled();
          }}>Check Orders</button></center>
          

          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Customer ID</th>
                <th>Customer Location</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Product Price</th>
                <th>Delete Entry</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(canceled) && canceled.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order["Order Date"]).toLocaleDateString()}</td>
                  <td>{order["Costumer Name"]}</td>
                  <td>{order["Costumer Email"]}</td>
                  <td>{order["Costumer Phone"]}</td>
                  <td>{order["Costumer Id"]}</td>
                  <td>{order["Costumer Adress"]}</td>
                  <td>{order["Product Name"]}</td>
                  <td><img 
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${order["Product Type"] === "Sofa" ? "sofa" : order["Product Type"].toUpperCase() }/${order["Product Sub-Type"]}/${order["Product Sku"]}/main.jpg`} 
                    alt="" 
                    loading="lazy"
                    /></td>
                  <td>{formatter.format(order["Product Price"])}</td>
                  <td style={{color:"red",cursor:"pointer"}} onClick={() => delCancel(order._id)}><i className="material-icons">delete</i></td>

                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Admin;
