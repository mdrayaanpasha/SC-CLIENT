import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./logo.png"
function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [canceled, setCanceled] = useState([]); // Initialize as an empty array
  const [showOrders, setShowOrders] = useState(true);
  const [showCanceled, setShowCanceled] = useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const ad = await axios.get("https://api-sc-pgsn.onrender.com/getAdmin");
        if(ad.data.message){
          const filteredData = ad.data.D.filter(ele => ele.Admin);
          setData(filteredData);
        }else{
          alert("there is some problem again!!")
        }
      } catch (error) {
        console.log(error);
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

    if (password === "rayaan") {
      setAuthenticated(true);
    } else {
      alert("Either you are not the admin or contact here: mdrayaanpasha@gmail.com");
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
    <style>
  {`
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .formthing {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 2rem;
      border-radius: 15px;
      background: #F8F7F2;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
    }
    form img{
    height:15vh;
    }

    form:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
    }

    h2 {
      color: #333;
      margin-bottom: 1rem;
      text-align: center;
    }

    input[type="password"], 
    input[type="submit"] {
      padding: 0.75rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }

    input[type="password"]:focus {
      border-color: #74ebd5;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    input[type="submit"] {
      background-color: #74ebd5;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    input[type="submit"]:hover {
      background-color: #ACB6E5;
    }

    table {
      width: 100%;
      margin-top: 2rem;
      border-collapse: collapse;
      background-color: #fff;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      overflow: hidden;
    }

    table thead tr {
      background-color: #74ebd5;
      color: #fff;
    }

    table th,
    table td {
      padding: 15px;
      border: 1px solid #ddd;
      text-align: left;
    }

    table td:last-child {
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    table td:last-child:hover {
      color: #ff6b6b;
    }

    table img {
      height: 15vh;
      width: 50vw;
      object-fit: cover;
      border-radius: 5px;
      transition: transform 0.3s ease-in-out;
    }

    table img:hover {
      transform: scale(1.1);
    }

    button {
      margin: 1rem 0;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      background-color: #ACB6E5;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      margin-top:2vh;
      
    }

    button:hover {
      background-color: #74ebd5;
    }

    h1 {
      margin-top:4vh;
      font-size: 2.5rem;
      color: #333;
      text-align: center;
      margin-bottom: 1.5rem;
      animation: fadeIn 1s ease-in-out;
    }

    h4 {
      font-size: 1.5rem;
      color: #555;
      text-align: center;
      margin-bottom: 1rem;
      animation: fadeIn 1.5s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      table, 
      form {
        width: 100%;
        margin: 0;
      }

      table th, 
      table td {
        padding: 10px;
      }

      form {
        padding: 1.5rem;
      }

      h1 {
        font-size: 2rem;
      }

      h4 {
        font-size: 1.25rem;
      }
    }
  `}
</style>


          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      {!authenticated && (
        <section className="formthing">
          <form onSubmit={handleForm}>
            <img src={logo} alt="" />
            
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
                    src={`https://api-sc-pgsn.onrender.com/public/img/${order["Product Type"] === "Sofa" ? "sofa" : order["Product Type"].toUpperCase() }/${order["Product Sub-Type"]}/${order["Product Sku"]}/main.jpg`} 
                    alt="" /></td>
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
                    src={`https://api-sc-pgsn.onrender.com/public/img/${order["Product Type"] === "Sofa" ? "sofa" : order["Product Type"].toUpperCase() }/${order["Product Sub-Type"]}/${order["Product Sku"]}/main.jpg`} 
                    alt="" /></td>
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
