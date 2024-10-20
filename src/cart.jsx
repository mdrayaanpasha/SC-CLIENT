import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./nav";
import cartImg from "./img/shopping.png"
import loginImg from "./img/login.png"

function Cart() {
    const [email, setEmail] = useState(null);
    const [SKus, setSkus] = useState([]);
    const [Data, setData] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const storedEmail = localStorage.getItem("D");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        if (email) {
            const getSkus = async () => {
                try {
                    const response = await axios.post("https://api-sc-pgsn.onrender.com/CartGet", { Email: email });
                    if (response.data.message === "ok") {
                        setSkus(response.data.Da.Skus);
                    } else {
                        console.log("No data found for this user!");
                    }
                } catch (error) {
                    console.log("Error fetching SKus:", error);
                }
            };
            getSkus();
        }
    }, [email]);

    const getInfo = async (sku) => {
        try {
            const res = await axios.post("https://api-sc-pgsn.onrender.com/item4Cart", { Sku: sku });
            if (res.data.Message === "done") {
                return res.data.Da;
            } else {
                return "error!";
            }
        } catch (error) {
            console.log(error);
            return "error";
        }
    };

    useEffect(() => {
        if (SKus.length > 0) {
            const fetchData = async () => {
                try {
                    const promises = SKus.map((element) => getInfo(element));
                    const results = await Promise.all(promises);
                    setData(results);
                } catch (error) {
                    console.log("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [SKus]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });

    const handleQuantityChange = (sku, value) => {
        setQuantities((prevState) => ({
            ...prevState,
            [sku]: value
        }));
    };

    const handleIncrement = (sku) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [sku]: (prevQuantities[sku] || 0) + 1
        }));
    };

    const handleDecrement = (sku) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            if (updatedQuantities[sku] > 0) {
                updatedQuantities[sku] -= 1;
            }
            return updatedQuantities;
        });
    };

    const [Total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        if (Data.length > 0) {
            Data.forEach((element) => {
                if (quantities[element["Sku"]] !== undefined) {
                    total += element["Selling Price "] * quantities[element["Sku"]];
                }
            });
            setTotal(total);
        }
    }, [quantities, Data]);

    useEffect(() => {
        if (Data.length > 0) {
            const temp = Data.map((ele) => (ele["Product Category"] === "Sofa" ? "sfs" : "sr"));
            
            setData((prevData) => prevData.map((ele, index) => ({ ...ele, url: temp[index] })));
        }
    }, [Data]);

    const handleOrder = () => {
        const D = {
            Email: email,
            ProductData:Data,
            quantities: quantities
        };
        console.log(D)
        //now that the person order i gotta do 2 things - remove all products with these SKUs in their cart, secondly add this in the order model and then redirect to thier order id
        try {
            const response = axios.post("https://api-sc-pgsn.onrender.com/orderFromCart",{Data:D});

        } catch (error) {
         console.log(error)   
        }
    };

    const delcart = (sku) => {
        const updatedSkus = SKus.filter((item) => item !== sku);
        setSkus(updatedSkus);
        const updateCart = async () => {
            try {
                const resp = await axios.post("https://api-sc-pgsn.onrender.com/cartUpdate", { Arr: updatedSkus, Email: email });
                if (resp.data.message !== "ok") {
                    alert("there is an internal error!");
                }
            } catch (error) {
                alert("there is an internal error in react!");
                console.log(error);
            }
        };
        updateCart();
    };

    return (
        <>
            <style>
                {`
                .products{
                    width:70vw;
                    margin-left:2vw;
                    margin-top:2vw;
                    border-radius:1vw;
                }
                .flex{
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    width:100%;
                    margin-bottom:5vw;
                    padding:2vw;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    border-radius:1vw;
                }
                .flex-d{
                    display:flex;
                    justify-content:space-around;
                }
                .flex img{
                    height:20vh;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    border-radius: 1vw ;
                }
                .flex input{
                    text-align:center;
                    border:none;
                    background-color:#f8f7f2;
                }
                .flex button{
                    margin:1vw;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }
                .order-sum {
                    margin-top: 5vh;
                    border: 1px solid rgba(0, 0, 0, 0.3);
                    padding: 2vw;
                    height: 50%;
                    border-radius: 1vw;
                    position: sticky;
                    top: 10vh; 
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                   
                }
                    hr{
                    color:#655F7F;
                    }
                .theme{
                    color: #655F7F;
                }
                .theme-b{
                    background-color: #655F7F;
                    color:white;
                    font-weight:bold;
                    box-shadow:5px 5px 15px #655F7F;
                }
                .icon{
                    cursor:pointer;
                    color:#DC3545;
                }
                @media(max-width:900px){
                    .flex{
                        width:80%;
                    }
                    .order-sum{
                        right:10%;
                    }
                }
                @media(max-width:800px){
                    .flex{
                        width:100%;
                        margin-left:20%;
                    }
                    .flex-d{
                        display:block;
                    }
                }
                @media(max-width:600px){
                    .flex{
                        margin-left:2%;
                        width:130%;
                    }
                }
                @media(max-width:450px){
                    .flex img{
                        height:15vh;
                        width:25vw;
                    }
                    .flex{
                        width:140%;
                        margin-left:0%;
                    }
                    .flex input{
                        width:10vw;
                    }
                }
                `}
            </style>
            <Nav></Nav>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <div className="flex-d">
                <div className="products" >
                    {!email &&
                    <>
                      <style>
                            {`
                                .div1{
                                    margin-left:35%;
                                }
                                .div1 img{
                                    height:40vh;
                                    width:20vw;
                                }
                                @media(max-width:1000px){
                                    .div1 img{
                                        width:25vw;
                                    }
                                }

                                @media(max-width:800px){
                                    .div1{
                                        margin-left:55%;
                                        width:30vw;
                                    }
                                
                                    .div1 img{
                                        width:30vw;
                                    }
                                    
                                }
                                @media(max-width:400px){
                                .div1{
                                margin-top:5vh;
                                
                                }
                                    .div1 img{
                                        height:20vh;
                                        width:50vw;
                                    }
                                    
                                }
                            `}
                        </style>
                      
                            <div className="div1">
                            
                                <img src={cartImg} style={{}}alt="" loading="lazy"/>
                                <div className="div-m">
                                <h3>Your Cart Is Empty!</h3> 
                                <h6>Start Shopping Today</h6>
                                <p>Check Out: <a href="/sofas">Sofas</a> | <a href="/shoeracks">Shoe Racks</a></p>
                                </div>
                            </div>
                            </>
                        }
                    {email && Data.length === 0 &&
                    <>
                            <style>
                            {`
                                .div1{
                                    margin-left:35%;
                                }
                                .div1 img{
                                    height:40vh;
                                    width:20vw;
                                }
                                @media(max-width:1000px){
                                    .div1 img{
                                        width:25vw;
                                    }
                                }

                                @media(max-width:800px){
                                    .div1{
                                        margin-left:55%;
                                        width:30vw;
                                    }
                                
                                    .div1 img{
                                        width:30vw;
                                    }
                                    
                                }
                                @media(max-width:400px){
                                .div1{
                                margin-top:5vh;
                                
                                }
                                    .div1 img{
                                        height:20vh;
                                        width:50vw;
                                    }
                                    
                                }
                            `}
                        </style>
                      
                            <div className="div1">
                            
                                <img src={cartImg} style={{}}alt="" />
                                <div className="div-m">
                                <h3>Your Cart Is Empty!</h3> 
                                <h6>Start Shopping Today</h6>
                                <p>Check Out: <a href="/sofas">Sofas</a> | <a href="/shoeracks">Shoe Racks</a></p>
                                </div>
                            </div>

                            </>
                    }
                    {email && Data.map(ele => (
                        <div key={ele.Sku} className="flex">
                            <img src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/${ele["Product Category"] === "Sofa" ? "sofa" : "SR"}/${ele["Sub Category"]}/${ele["Sku"]}/main.jpg`} alt="Product" onClick={e=>window.location.href=`/${ele["url"]}?sku=${ele["Sku"]}`}/>
                            <div className="info">
                                <div dir="rtl">
                                    <i className="material-icons icon" onClick={() => delcart(ele.Sku)}>delete</i>
                                </div>
                                <div className="main">
                                    <p onClick={e=>window.location.href=`/${ele["url"]}?sku=${ele["Sku"]}`}>{ele["Title"]}</p>
                                    <p><s>{formatter.format(ele["Mrp "])}</s> {formatter.format(ele["Selling Price "])}</p>
                                    <button onClick={() => handleDecrement(ele.Sku)} className="btn btn-danger dec">-</button>
                                    <input
                                        type="number"
                                        value={quantities[ele.Sku] || 0}
                                        onChange={(e) => handleQuantityChange(ele.Sku, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => handleIncrement(ele.Sku)} className="btn btn-success inc">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {Data.length > 0 && email && (
                    <div className="order-sum">
                        <center><h2 className="theme">Order Summary</h2></center>  <hr />
                        <p><span className="theme">Total: </span>{formatter.format(Total + Math.round(Total * 25) / 100)}</p>
                        <hr />
                        <p><span className="theme">Discount: </span>{formatter.format(Math.round(Total * 25) / 100)}</p>
                        <hr />
                        <p><span className="theme">Total After discount:</span> {formatter.format(Total)}</p>
                        <hr />
                        <center><p><span className="theme">Save 25%</span></p> <hr />
                            <button onClick={handleOrder} className="btn theme-b">Order all</button></center>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
