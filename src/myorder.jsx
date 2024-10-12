import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./nav.jsx";

function MyOrder() {
    const email = localStorage.getItem("D");
    const [MyOrders, setMyOrders] = useState(null);

    useEffect(() => {
        if (email) {
            const fetchMyOrders = async () => {
                try {
                    const response = await axios.post("https://api-sc-pgsn.onrender.com/myordersget", { Email: email });
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
            const response = await axios.post("https://api-sc-pgsn.onrender.com/cancelorder", { data: d });
            if (response.data.message) {
                setMyOrders(MyOrders.filter(order => order["Order Id"] !== d._id));
                alert("Order canceled successfully");
            } else {
                alert("Failed to cancel order");
            }
        } catch (error) {
            console.error(error);
            alert("Error canceling order");
        }
    };
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });
    if (!email) {
        return <p>You are not signed in!</p>;
    } else {
        return (
            <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Nav />
                <style>
                    {`
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #f9f9f9;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }

                        h2 {
                            margin-left:2vw;
                            font-size: 2.5rem;
                            margin-top: 2vh;
                            color: #6F698A;
                            animation: fadeIn 1s ease-in-out;
                        }

                        .Product-card {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            background-color: #fff;
                            margin: 3vh auto;
                            padding: 2vw;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            max-width: 80%;
                            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                            animation: slideIn 0.5s ease-in-out;
                        }

                        .Product-card:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                        }

                        .Product-card img {
                            height: 30vh;
                            width: auto;
                            border-radius: 10px;
                            transition: transform 0.2s ease-in-out;
                        }

                        .Product-card img:hover {
                            transform: scale(1.05);
                        }

                        .Product-card .des {
                            margin-left: 3vw;
                            flex-grow: 1;
                            padding:2vw;
                            gap:2vw;
                        }

                        .Product-card .des p {
                            font-size: 1.2rem;
                            margin: 0.5vh 0;
                            color: #555;
                        }

                        .Product-card .des button {
                            padding: 10px 20px;
                            background-color: #ff4757;
                            border: none;
                            border-radius: 5px;
                            color: #fff;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: background-color 0.3s ease-in-out;
                        }

                        .Product-card .des button:hover {
                            background-color: #ff6b81;
                        }

                        .no-orders {
                            text-align: center;
                            font-size: 1.5rem;
                            color: #666;
                            margin-top: 10vh;
                        }

                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                        }

                        @keyframes slideIn {
                            from {
                                transform: translateY(20px);
                                opacity: 0;
                            }
                            to {
                                transform: translateY(0);
                                opacity: 1;
                            }
                        }
                    `}
                </style>
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
                                    src={`https://api-sc-pgsn.onrender.com/public/img/${ele["Product Type"] === "Sofa" ? "sofa" : ele["Product Type"].UpperCase()}/${ele["Product Sub-Type"]}/${ele["Product Sku"]}/main.jpg`}
                                    alt={`Image of ${ele["Product Name"]}`}
                                />
                                <div className="des">
                                    <p style={{fontSize:"3vh"}}><b>{ele["Product Name"]}</b></p>
                                    <small>{formatter.format(ele["Product Price"])}</small>
                                    <p>{ele["Costumer Address"]}</p>
                                    <p style={{color:"green"}}>
                                        {ele['Admin'] ? <p style={{color:"green"}}> <i class="fa fa-truck"></i> Expected Delivery Date: {newOrderDate} </p> : `Delivered Already!!`}
                                    </p>
                                    {ele["Admin"] && (
                                        <button onClick={() => CancelOrder(ele)}>Cancel Order!</button>
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
