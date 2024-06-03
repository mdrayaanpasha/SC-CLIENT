import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./nav";
import banner from "./Banner.png"


function Sofa() {
    const searchParams = new URLSearchParams(location.search);
    const [sku, setSku] = useState(searchParams.get("sku"));
    // const [sku, setSku] = useState("SCSO23003YL");
    const [mainProduct, setMainProduct] = useState(null);
    const [productImgs, setProductImgs] = useState(null);
    const [otherSku, setOtherSku] = useState(null);
    const [note, setNote] = useState(false);
    const [warranty, setWarranty] = useState(false);

    useEffect(() => {
        const sofaFetch = async () => {
            try {
                const data = { Sku: sku };
                const D = await axios.post("http://localhost:3000/getS", data);
                if (D.data.message === "ok") {
                    setMainProduct(D.data.sofa);
                    setProductImgs(D.data.files);
                } else {
                    alert("There is an error in the backend");
                }
            } catch (error) {
                console.log(error);
                alert("There is an error in the backend");
            }
        };
        sofaFetch();
    }, [sku]);

    useEffect(() => {
        if (mainProduct && mainProduct.length > 0) {
            const similarSku = mainProduct[0]["Similar Sku"];
            const thing = similarSku[0].split(",");
            setOtherSku(thing);
        }
    }, [mainProduct, productImgs]);

    useEffect(() => {
        if (productImgs) {
            const target = "main.jpg";
            const index = productImgs.findIndex(img => img.toLowerCase() === target);
            if (index !== -1 && index !== 0) {
                const newProductImgs = [...productImgs];
                [newProductImgs[0], newProductImgs[index]] = [newProductImgs[index], newProductImgs[0]];
                setProductImgs(newProductImgs);
            }
        }
    }, [productImgs]);


    const [descripton,setDescription]=useState(false)



    const [otherProducts,setOtherProducts]=useState(null)

    useEffect(()=>{
        if(mainProduct){
        const getOtherProducts = async()=>{
            try {
                const D = await axios.post("http://localhost:3000/otherGetData",{PC:mainProduct[0]["Sub Category"],Product:mainProduct[0]["Product Category"]})
                if(D.data.message==="ok"){
                    setOtherProducts(D.data.Data);
                }else{
                    alert("there is an error in backend")
                }
            } catch (error) {
                alert("there is an error in react")
                console.log(error)
            }
        }

        getOtherProducts()
    }
    },[mainProduct])
    const se = (sku)=>{
        window.location.href=`/sofa?sku=${sku}`
    }
    const cart = async()=>{
        const them = localStorage.getItem("D");
        if(them){
            try {
                const E =  await axios.post("http://localhost:3000/addcart",{Email:them, Sku:sku})
                if(E.data.message==="done"){
                    alert("Added")
                }else if(E.data.message==="there"){
                    alert("Item Already There in cart")
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            alert("you are not loged in!")
            localStorage.setItem("redirect",window.location.href)
            window.location.href="/reg"
        }
    }
    const order = ()=>{
        const them = localStorage.getItem("D");
        if(them){
            window.location.href=`/order?sku=${sku}`
        }else{
            alert("you are not loged in!")
            localStorage.setItem("redirect",window.location.href)
            window.location.href="/reg"
        }
    }
    return (
        <>
            <style>
                {`
                    .carousel-indicators.black button {
                        background-color: black;
                    }
                    .c.black span {
                        background-color: black;
                    }
                    .carousel-control-prev-icon {
                        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3e%3cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e");
                    }
                    .carousel-control-next-icon {
                        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3e%3cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e");
                        transform: scaleX(-1);
                    }
                    .carousel-control-prev-icon, .carousel-control-next-icon {
                        transition: transform 0.3s ease;
                    }
                    .carousel, .carousel-inner, .carousel-item, .carousel-item img {
                        height: 100vh;
                        width: 40vw;
                        object-fit: contain;
                        padding:0
                    }
                    .products {
                        display: flex;
                        align-items: center;
                        
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .other {
                        padding: 3vw;
                        margin-left: 1%;
                    }
                    .size {
                        display: inline-block;
                        border: 1px solid silver;
                        padding: 1vw;
                        border-radius: 1vw;
                    }
                    .block {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        justify-content: space-evenly;
                    }
                    .main-img, .other-img {
                        height: 15vh;
                        width: 7vw;
                        margin-right: 2vw;
                        border-radius: 1vw;
                        padding: 0.2vw;
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

                    }
                    .other-product {
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                    }
                    .other-product:hover, .other-img:hover{
                        transform: scale(1.1);
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    }
                    .main-img:hover{
                        transform: scale(1.1);
                        box-shadow: 5px 5px 15px lightblue;
                    }
                    .similar-products{
                        margin-bottom:10vh;
                    }
                    .main-img {
                        border: 2px solid lightblue;
                    }
                    .btn {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 3vh;
                        padding-bottom: 0;
                        width:53vw;
                    }
                    .all-notes {
                        margin-top: 5vh
                    }
                    .products{
                        margin-top:15vh;
                        height:80vh;
                    }
                    .banner{
                        margin-top:20vh;
                        height:40vh;
                        width:100vw;

                    }
                    .banner img{
                        height:35vh;
                        width:97vw;
                    }
                    .similar-products{
                        paddding:2vw;

                        align-items:center;
                        
                        justify-content:space-evenly;
                        
                    }
                    .other-product{
                        display:inline-block;
                        border:1px solid silver;
                        border-radius:1vw;
                        margin:2vw;
                        
                    }
                    body{
                        overflow-x:hidden;
                    }
                    
                    .other-product img{
                        height:20vh;
                        width:12vw !important;
                        // object-fit:contain;
                        border-radius:1vw 1vw 0 0;
                    }
                    .other-product:hover{
                        cursor:pointer;
                    }
                    
                    .actions button{
                        width:45vw;
                        height:7vh;
                        font-weight:bold;
                        font-size:3vh;
                        background-color:#82C2C9;
                        color:white;
                        border-radius:1vw;
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                    }
                    .actions button:hover{

                        box-shadow: 5px 5px 15px #82C2C9;
                        cursor:pointer;
                    }
                    #add-cart{
                        border:2px solid #82C2C9;
                        color: #82C2C9;
                        background-color:white;
                    }
                    @media(max-width:1200px){
                       
                        .main-img,.other-img{
                            width:10vw;
                            margin-top:2vh;
                        }
                    }
                    @media(max-width:1000px){
                        .products{
                            display:block;
                            margin:0;
                        }
                        .carousel, .carousel-inner, .carousel-item, .carousel-item img {
                            height: 70vh;
                            width: 100vw;
                            object-fit: contain;
                            padding:0
                        }
                        .banner{
                            display:none;
                        }
                        .similar-products{
                            margin-top:90vh;
                        }
                        .other-product img{
                            width:20vw !important;
                            height:20vh !important;
                        }
                        .main-img, .other-img {
                            height: 15vh;
                            width: 15vw;
                            margin-right: 2vw;
                            border-radius: 1vw;
                            margin-top:2vh;
                        }

                        
                        
                    }
                    
                    @media(max-width:780px){
                        .similar-products{
                            margin-right:5vw;
                            margin-left:5vw;
                        }
                        .other-product img{
                            width:25vw !important;
                            height:25vh !important;
                        }
                    }

                    @media(max-width:600px){
                        
                        .main-img, .other-img {
                            height: 15vh;
                            width: 20vw;
                            margin-right: 2vw;
                            border-radius: 1vw;
                            margin-top:2vh;
                        }
                       .similar-products{
                        margin-right:0;
                        margin-left:2vw;
                       }
                        .other-product img{
                            height:10vh;
                            width:28vw !important;
                        }

                    }
                    @media(max-width:500px){
                        .similar-products{
                            margin-right:5vw;
                            margin-left:5vw;
                           }
                        .other-product img{
                            height:8vh;
                            width:35vw !important;
                        } 
                    }

                    @media(max-width:400px){
                        .products{
                            display:block;
                            margin:0;
                        }
                        .carousel, .carousel-inner, .carousel-item, .carousel-item img {
                            height: 40vh;
                            width: 100vw;
                            object-fit: contain;
                            padding:0
                            
                        }
                        
                        .other{
                            width:100vw;
                        }
                        .other p{
                            margin:0;

                        }
                        .block{
                            margin:0;
                            
                        }
                        .main-img, .other-img {
                            height: 15vh;
                            width: 30vw;
                            margin-right: 2vw;
                            border-radius: 1vw;
                            margin-top:2vh;
                        }
                        .banner{
                            display:none;
                        }

                        
                        .other-product{
                            width:40vw !important;
                        }
                        .other-product img{

                            height:18vh !important;
                            width:40vw !important;
                            
                        }
                        .description{
                            padding:1vw;

                        }
                        body{
                            overflow-x:hidden;
                        }
                        .flex-around{
                            display:flex;
                            justify-content:space-around;
                            align-items:center;
                        }
                        
                    }

                    
                    `}
                </style>
                <Nav/>
                <div className="products">
                    <div className="img">
                        {productImgs && mainProduct ? (
                            <div id="carouselExampleIndicators" className="carousel slide">
                                <div className="carousel-indicators black">
                                    {productImgs.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-current={index === 0 ? "true" : undefined}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    ))}
                                </div>
                                <div className="carousel-inner">
                                    {productImgs.map((ele, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <img
                                                src={`http://localhost:3000/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`}
                                                className="d-block w-100"
                                                alt={`Image ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="other">
                        {mainProduct && (
                            <div className="details">
                                <h2>{mainProduct[0]["Title"]}</h2>
                                <p>₹{mainProduct[0]["Selling Price "]}</p>
                                <hr />
                                <p className="size">{mainProduct[0]["Size"]}</p><br />
                            </div>
                        )}

                        <br />
                        <br />
                       
                       {otherSku && otherSku.length > 1 && <h3>Similar Variants</h3>}
                        <div className="block">
    {otherSku && otherSku.map((ele, index) => (
        ele !== '0' ? (
            <>
            <div key={index}>
                <img 
                    className={ele === sku ? 'main-img' : 'other-img'}
                    src={`http://localhost:3000/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${ele.replace(" ","")}/main.jpg`} 
                    alt={ele} 
                    onClick={() => setSku(ele.replace(" ",""))}
                />
            </div>
            <style>
            {`
            .@media(max-width:400px){
                .similar-products{
                    margin-top:80vh !important;
                }
            }
            `}
        </style>
        </>
        ) :(
            <style>
                {`
                .@media(max-width:400px){
                    .similar-products{
                        margin-top:40vh !important;
                    }
                }
                `}
            </style>
        )
    ))}
</div>
<hr />
{mainProduct &&
    <div className="description">
    {mainProduct[0]["Description"]}
</div>

}

<hr />

                  

                        </div>

                        
                    
                </div>

                <div className="banner">
                   <center><img src={banner} alt="" /></center> 
                </div>

                {mainProduct && 
    <div className="similar-products">
        <h2>Other {`${mainProduct[0]["Product Category"]}s`}</h2>

        {otherProducts && otherProducts.map((ele, index) => (
    <div key={index} className="other-product" onClick={e=>se(ele.Sku)}>
        <img 
            src={`http://localhost:3000/public/img/${mainProduct[0]["Product Category"]}/${ele["Sub Category"]}/${ele.Sku}/main.jpg`}
            alt={ele.Sku} 
        />
        <center><span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>{ele.Title}</span>
        <p>₹{ele["Selling Price "]}</p></center>
    </div>
))}=

    </div>
}
<nav class="navbar fixed-bottom bg-body-tertiary">
  <div class="container-fluid flex-around actions">
    <button id="add-cart" onClick={e=>cart()}>Add to Cart</button>
    <button onClick={e=>order()}>Order</button>
  </div>
</nav>


            </>
        );
}

export default Sofa;

                                
    