import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
    let them = localStorage.getItem("D");
    const [data, setData] = useState(null);
    const [receivedData, setReceivedData] = useState([]);

    useEffect(() => {
        if (them) {
            let him=them.toLowerCase();
            them=him
            const fetchData = async () => {
                try {
                    const response = await axios.post("http://localhost:3000/CartGet", { Email: them });
                    if (response.data.message === "ok") {
                        setData(response.data.Da);
                    } else {
                        console.log("There is a problem:", response.data.message);
                    }
                } catch (error) {
                    console.log("Error fetching data:", error);
                    alert("There was an error fetching data from the backend!");
                }
            };
            fetchData();
        }
    }, [them]);

    useEffect(() => {
        const fetchItems = async () => {
            if (data && data.Skus) {
                const uniqueSkus = data.Skus.filter((sku, index, self) => self.indexOf(sku) === index);
                for (let i = 0; i < uniqueSkus.length; i++) {
                    const sku = uniqueSkus[i].replace(" ", "");
                    if (!receivedData.some(item => item && item.Sku === sku)) {
                        try {
                            const response = await axios.post("http://localhost:3000/Item4Cart", { Sku: sku });
                            // Append the response data only if it's not already in receivedData
                            setReceivedData(prevData => [...prevData, response.data.Da]);
                        } catch (error) {
                            console.log("Error fetching item for SKU", sku, ":", error);
                        }
                    }
                }
            }
        };
        fetchItems();
    }, [data]);
    
    

    if (them) {
        return (
            <>
            <style>
                {`
                .flex{
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    
                }
                .product{
                    border:1px solid silver;
                    padding:1vw;
                    width:94vw;

                    margin-top:5vh;
                    
                }
                .flex img{
                    height:10%;
                    width:10%;
                    border-radius:2vw;
                }
                `}
            </style>
            <center>
            {receivedData && receivedData.length > 0 ? (
                receivedData.map((ele, index) => (
                    <div className="product">
                        <div className="flex">
                            <img src={`http://localhost:3000/public/img/${ele["Product Category"].replace(" ","%20")}/${ele["Sub Category"].replace(" ","%20")}/${ele["Sku"].replace(" ","")}/main.jpg`} alt="" />
                            <div className="div">
                                <p>{ele["Title"]}</p>
                                <p>Price: {ele["Selling Price "]}</p>
                            </div>
                        </div>
                        <hr />
                      <center class="flex"><button class="btn btn-success">Order</button><button class="btn btn-danger">Remove</button></center>  
                    </div>
                ))
            ) : (
                <p>There is nothing in the cart</p>
            )}
            </center>
        </>
        
        );
    } else {
        return (
            <>
                <center>
                    <h1>You're Not Registered To Our Platform Yet!</h1>
                    <button onClick={() => window.location.href = "/login"}>Login</button>
                    <button onClick={() => window.location.href = "/reg"}>Register</button>
                </center>
            </>
        );
    }
}

export default Cart;
