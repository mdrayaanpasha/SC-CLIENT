import Nav from "./nav";
import { useState, useEffect } from "react";
import axios from "axios";

function Order(){
    const searchParams = new URLSearchParams(location.search);
    const [sku, setSku] = useState(searchParams.get("sku"));

    const [productInfo,setProductInfo] = useState(null)
    const email = localStorage.getItem("D")
    const [userDetails,setUserDetails] = useState(null)
    const [productType,setProductType] = useState(null)

    //okay heres the trick i get the sku and then i check if its in the sofa section if not then i go ahead and chekc it in 
    //shoe rack section.

    useEffect(()=>{
        if(email){
            const fecthInfo= async()=>{
                try {
                    const D = await axios.post("https://api-sc-pgsn.onrender.com/userInfo",{Email:email})
                    if(D.data.message){
                        setUserDetails(D.data.D[0])

                      
                    }else{
                        alert("there is an error in frontend code #email")
                    }
                } catch (error) {
                    console.log(error)
                }                
            }
            fecthInfo()
        }

    },[])

    useEffect(() => {
        const sofaFetch = async () => {
            try {
                const data = { Sku: sku };
                const D = await axios.post("https://api-sc-pgsn.onrender.com/SRget", data);
                if (D.data.message === "ok") {
                    setProductInfo(D.data.sofa);
                    setProductType("SR")
                } else {
                    throw new Error("Sofa not found, checking another section.");
                }
            } catch (error) {
                console.log(error.message || error);
                fetchFromShoeSection();
            }
        };
    
        const fetchFromShoeSection = async () => {
            try {
                const data = { Sku: sku };
                const D = await axios.post("https://api-sc-pgsn.onrender.com/getS", data);
                if (D.data.message === "ok") {
                    setProductInfo(D.data.sofa);
                    setProductType("Sofa")
                } else {
                    alert("There is an error in the backend");
                }
            } catch (error) {
                console.error("Error fetching from shoe section:", error);
                alert("There is an error in the backend");
            }
        };
    
        sofaFetch();
    }, [sku]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });

    const AddToDashBord= async()=>{
        const DataDict = {
            "Costumer Name": userDetails.name,
            "Costumer Email": userDetails.email,
            "Costumer Phone": userDetails.phoneNo,
            "Costumer Adress": userDetails.Adress,
            "Costumer Id": userDetails._id,
            "Product Name": productInfo[0].Title,
            "Product Price" : productInfo[0]["Selling Price "],
            "Product Sku" : productInfo[0].Sku,
            "Product Type":productInfo[0]["Product Category"],
            "Product Sub-Type":productInfo[0]["Sub Category"],
"Order Date": new Date().toISOString(),
"Admin":true
        }

        console.log(DataDict)
        //now send data to backend to store it in mongoDB.

        try {
            const resp = await axios.post("https://api-sc-pgsn.onrender.com/EnterDash",{D:DataDict})
            if(resp.data.message){
                window.location.href=`./success?id=${resp.data.id}`
            }else{
                window.location.href=`./failed`
            }
        } catch (error) {
             window.location.href=`./failed`
            alert("backend uncool")
            console.log(error)
        }

    }
  
    return(
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <style>
            {`
            .fd{
            
            display:flex;
            align-items:center;
            justify-content:space-evenly;
            gap:1vw;
            }
            .main-info{
             display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            gap:2vh;
            }
            .flex-card{
            display:flex;
            align-items:center;
            justify-content:space-evenly;

            }
            hr{
            width:90%;
            

            }
            .flex-card img{
            height:20vh;
            width:10vw;
            object-contain:cover;
            border-radius:0.5vw;
            }
            .container-cards{
                 display:flex;
            align-items:center;
            justify-content:space-evenly;
            margin-top:5vh;
            }
            .card-c{
            max-width:25vw;
            padding:2vw;
            border: 1px solid #4A4270;
            color:#4A4270;
            border-radius:0.5vw;
            }
           .fixedBottom {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between !important;
    width:100vw;
}
.fixedBottom button:nth-child(odd) {
            width:50vw;
            font-size:3vh;
            color:#4A4270;
            font-weight:bold;
            height:5vh;
            background:none;
            border:2px solid #4A4270;
        }
            .fixedBottom button{
               background-color:#4A4270;
               color:white;
               width:50vw;
            font-size:2.5vh;
            height:5vh;
           
            font-weight:bold;
            }

            `}
        </style>
        <Nav></Nav>
        <main>
            <section className="header">
            {productInfo && 
            
            <div className="main-info">
                <h1>Product Id: {productInfo[0].Sku}</h1>
                <div className="fd">
                <p className="grey" style={{ color: "grey" }}>
                    Order Date: <b>{new Date().toLocaleDateString()}  </b>
                </p> 
                <p>|</p>
                
                <p className="est" style={{color:"green"}}>
                <i class="fa fa-truck"> </i>
                 Estimated delivery: {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString()}
                </p>
                </div>
                <hr />
                </div>
                
            }
            
            </section>
           
            <section className="product-det">
                {productInfo && 
                <>
                <div className="flex-card">
                    <img 
src={`https://api-sc-pgsn.onrender.com/public/img/${productInfo[0]["Product Category"] === "Sofa" ? productInfo[0]["Product Category"].toLowerCase() : productInfo[0]["Product Category"].toUpperCase()}/${productInfo[0]["Sub Category"]}/${sku}/main.jpg`}

                    alt="" />
                    <div className="info">
                       <h2>{productInfo[0].Title}</h2> 
                       <small>{productInfo[0].Color} | {productInfo[0].Material} | {productInfo[0].Size}</small>
                    </div>
                    <div className="info2">
                       <b>{formatter.format(productInfo[0]["Selling Price "])}</b> <br />
                        <s color="grey">{formatter.format(productInfo[0]["Mrp "])}</s> <br />
                        
                    </div>
                </div>
                <center><hr /></center>

                <div className="container-cards">
                    <div className="card-c">
                        <h4><i class="fa fa-money"></i>Payments</h4>
                        <p>To Pay Cash-on-delievery press finalize order below</p>
                        <p>To Pay Online Press <a href="/order-fail">here</a></p>
                    </div>
                    <div className="card-c"><h4>
                    <i class="fa fa-address-card-o"></i>
                    Address</h4>
                        <p>{userDetails.Adress}</p>
                    </div>
                </div>

                <div className="fixedBottom">
                    <button onClick={e=>window.location.href="./"}>Cancel Order</button>
                    <button onClick={e=>AddToDashBord()}>Finalize order</button>
                </div>
                </>
            }
            </section>
            
        </main>
        </>
    )
}

export default Order