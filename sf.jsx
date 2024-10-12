import Nav from "./src/nav";
import { useState, useEffect } from "react";
import axios from "axios";

function Sf() {
    const searchParams = new URLSearchParams(location.search);
    const [sku, setSku] = useState(searchParams.get("sku"));
    const [mainProduct, setMainProduct] = useState(null);
    const [productImgs, setProductImgs] = useState(null);
    const [rating, setRating] = useState(generateRating()); // Generates a random number between 3 and 5
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });


    
    const [arr,setArr]=useState(null)
    useEffect(() => {
        if (sku) {
            const sofaFetch = async () => {
                try {
                    const data = { Sku: sku };
                    const D = await axios.post("https://api-sc-pgsn.onrender.com/getS", data);
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
        }
    }, [sku]);

    function generateRating() {
        const ratings = [3, 4, 5];
        return ratings[Math.floor(Math.random() * ratings.length)];
    }

    const [TITLE,setTITLE]=useState(null)
    const [ThingSame,setThingSame]=useState(null)
    useEffect(() => {
        if (mainProduct && mainProduct.length > 0) {
            const similarSku = mainProduct[0]["Similar Sku"];
            const thing = similarSku[0].split(",");
       

            
            setOtherSku(thing);
          
            let title = mainProduct[0]["Title"];

            // Split the string into an array of words
            let words = title.split(" ");
            
            // Capitalize the first letter of each word
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            }
            
            // Join the words back into a single string
            let capitalizedTitle = words.join(" ");

            let fin = capitalizedTitle.split("In");
            setTITLE(fin[0])

        //    alert(title)
        }
    }, [mainProduct]);

    const [otherSku, setOtherSku] = useState(null);
    const [otherProducts, setOtherProducts] = useState(null);

    useEffect(() => {
        if (mainProduct) {
            const getOtherProducts = async () => {
                try {
                    const D = await axios.post("https://api-sc-pgsn.onrender.com/otherGetData", { PC: mainProduct[0]["Sub Category"], Product: mainProduct[0]["Product Category"] });
                    if (D.data.message === "ok") {
                        setOtherProducts(D.data.Data);
                    } else {
                        alert("There is an error in the backend");
                    }
                } catch (error) {
                    alert("There is an error in react");
                    console.log(error);
                }
            };

            getOtherProducts();
        }

        if(mainProduct){
            let a = mainProduct[0]["Size"].replace("Size:", "").replace(/\bSH:\s+/g, 'SH:').replace("W","Product Width").replace("D","Product Depth").replace("SH","Product Seating Height").replace("H","Product Height")
            
            a = a.split('"')
            setArr(a)


            

        }
    }, [mainProduct]);
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
    const addToCart = async () => {
        const user = localStorage.getItem("D");
        if (user) {
            try {
                const response = await axios.post("https://api-sc-pgsn.onrender.com/addcart", { Email: user, Sku: sku });
                if (response.data.message === "done") {
                    alert("Added");
                } else if (response.data.message === "there") {
                    alert("Item Already There in cart");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("You are not logged in!");
            localStorage.setItem("redirect", window.location.href);
            window.location.href = "/reg";
        }
    };

    const placeOrder = () => {
        const user = localStorage.getItem("D");
        if (user) {
            window.location.href = `/order?sku=${sku}`;
        } else {
            alert("You are not logged in!");
            localStorage.setItem("redirect", window.location.href);
            window.location.href = "/reg";
        }
    };
    const [selectedImg,setSelectedImg]=useState("main.jpg")
    const handleNextClick = () => {
        const currentIndex = productImgs.indexOf(selectedImg);
        const nextIndex = (currentIndex + 1) % productImgs.length;
        setSelectedImg(productImgs[nextIndex]);
      };

      const handlePrevClick = () => {
        const currentIndex = productImgs.indexOf(selectedImg);
        const nextIndex = (currentIndex - 1) % productImgs.length;
        setSelectedImg(productImgs[nextIndex]);
      };
    function BigSofa(){
        window.location.href=`/sofaimg?sku=${sku}`
    }
    const [diSelected,setDiSelected]=useState('main.jpg')

    return (
        <>
            <style>
                {`
              
                .carousel, .carousel-inner, .carousel-item, .carousel-item img {
                    height: 100vh;
                    width: 40vw;
                    object-fit: contain;
                    padding: 0;
                     position: sticky;
                    top: 10vh; 
                }
                    
               
                .flex-product {
                    display: flex;
                    flex-wrap: wrap;
                    
                    
                }
                .flex-product .card{
                max-width:40vw;
                }
                .fa-star.checked {
                    color: orange;
                }
                .product-information {
                    margin-left: 20px;
                }
                .block img {
                    cursor: pointer;
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
                .product-information{
                    margin-top:10vh;
                }
                .mains{
                padding:1vw;
                }
                .card{
                
                margin-top:5vh;
                background-color:#F3F2ED;
                }
                 .other-product{
                        display:inline-block;
                        border:1px solid silver;
                        border-radius:0.5vw;
                        margin:2vw;
                        
                    }
                    body{
                        overflow-x:hidden;
                    }
                    
                    .other-product img{
                        height:20vh;
                        width:12vw !important;
                        // object-fit:contain;
                        border-radius:0.5vw 0.5vw 0 0;
                    }
                    .other-product:hover{
                        cursor:pointer;
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
                    s{
                        color:silver;
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
                        .other-product{
                        display:inline-block;
                        border:1px solid silver;
                        border-radius:0.5vw;
                        margin:2vw;
                        
                    }
                    body{
                        overflow-x:hidden;
                    }
                    
                    .other-product img{
                        height:20vh;
                        width:12vw !important;
                        // object-fit:contain;
                        border-radius:0.5vw 0.5vw 0 0;
                    }
                    .other-product:hover{
                        cursor:pointer;
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
                    s{
                        color:silver;
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
                        margin:1vw;
                        
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                        
                    }
                    .other-product,.other-product img{
                    border-radius:0.4vw;
                    }

                    .other-product:hover, .other-img:hover{
                        transform: scale(1.2);
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    }
                    .main-img:hover{
                        transform: scale(1.1);
                        box-shadow: 5px 5px 15px lightblue;
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
                    
               .flex-dia{
                    display:flex;
                    align-items:center;
                    justify-content:space-evenly;
                    flex-wrap:nowrap;
                    overflow:auto;

                    }
                    .flex-dia img{
                    width:7vw;
                    object-fit:contain;
                margin-right:2vw;
                    }
                    .di-main-img{
                    height:70vh;
                    object-contain:fit;
                    padding:1vw;
                    border-radius:1vw !important;
                    
                    }

                    dialog {
                        padding:2vw;
                        border: none;
                        border-radius: 2vw;
                        background: rgba(255, 255, 255, 0.3); /* Semi-transparent background */
                        backdrop-filter: blur(10px); /* Blur effect */
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
                        width: 100vw;

                        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
                    }
                    dialog button{
                    font-size:5vh;
                    background-color:transparent;
                   
                    }

                    @media(max-width:600px){
                     .flex-dia img{
                    height:10vh;
                    width:auto;
                }

                    }
                
                        
                `}
            </style>
            <Nav />
            {productImgs && mainProduct && (
  <dialog id="imageDialog">
<button onClick={() => document.getElementById('imageDialog').close()}>&#10006;</button>
<center>
    <img class="di-main-img"
    src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${mainProduct[0]["Sub Category"]}/${sku}/${diSelected}`} 
    
    
    />
    </center>
    <div className="dialog-content">
        
      
      <div className="flex-dia">
      {productImgs.map(ele => (
        <img 
          src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`} 
          onClick={e => setDiSelected(ele)} 
          alt="" 
        />
      ))}
      </div>
    </div>
  </dialog>
)}
            <div className="flex-product">
                <div className="product-img">
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    />
                    <style>
                        {`
                        .otherimgs img{
                        width:7vw;
                        object-fit:contain;
                       
                        margin:1vw;
                        
                        }
                        .ProductAll{
                        display:flex;
                        
                        
                        }
                        .carousel-next, .carousel-prev{
                        position:absolute;
                           padding:1vw 1vw;
                        font-size:5vh;
                        color:white;
                        background-color:rgb(0,0,0,0.2);
                        border-radius:1vw;
                        z-index:9;
                        }
                        .carousel-next{
                        right:0;
                        top:45%;
                     
                        }
                        .carousel-prev{
                        left:0;
                        top:45%;
                        }
                        .carousel-no{
                        position:absolute;
                        top:15%;
                        }
                          @media(max-width:1500px){
                          .otherimgs img{
                          width:10vw;

                        }

                        @media(max-width:1000px){
                        .ProductAll{
                        display:block;
                        }
                        .otherimgs{
                        position:sticky;
                        bottom:0;
                        display:flex;
                        }
                        }
                        `}
                    </style>
                    {productImgs && mainProduct ? (
                        <div className="ProductAll">
                        <div className="otherimgs">
                            {productImgs.map(ele=>(
                            <img src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`} onClick={e=>setSelectedImg(ele)}  alt="" />

                           ))}
                        </div>
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <button onClick={handleNextClick} class="carousel-next">&rarr;</button>
                            <button onClick={handlePrevClick} class="carousel-prev">&larr;</button>

                            <img
        src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${mainProduct[0]["Sub Category"]}/${sku}/${selectedImg}`}
        className={selectedImg === 'main.jpg' ? 'carousel-yes' : 'carousel-no'}
         alt="" onClick={() => document.getElementById('imageDialog').showModal()} 

      />                       
                         </div>
                         </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    
                </div>
                <div className="product-information">
                    {mainProduct && (
                        <>
                            <h3>{TITLE}</h3>
                            <h5 style={{color:"silver"}}>({mainProduct[0].Material})</h5>
                            <h4>
                                <span>{rating}/5 </span>
                                {[...Array(rating)].map((_, i) => (
                                    <span key={i} className="fa fa-star checked"></span>
                                ))}
                                {[...Array(5 - rating)].map((_, i) => (
                                    <span key={i} className="fa fa-star"></span>
                                ))}
                            </h4>
                            <h4>
                                <s style={{color:"silver"}}>{formatter.format(mainProduct[0]["Mrp "])}</s> 
                                {formatter.format(mainProduct[0]["Selling Price "])}  
                                <span style={{color:"green"}}> Save 25%</span>
                            </h4>
                            <hr />
                        </>
                    )}
            {otherSku && otherSku.length > 1 && <h3 className="mains">Similar Colors</h3>}
                <div className="block">
                    {otherSku && otherSku.map((ele, index) => (
                        ele !== '0' && (
                            <div key={index}>
                                <img 
                                    className={ele === sku ? 'main-img' : 'other-img'}
                                    src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${mainProduct[0]["Sub Category"]}/${ele.replace(" ","")}/main.jpg`} 
                                    alt={ele} 
                                    onClick={e => setSku(ele.replace(" ",""))}
                                />
                            </div>
                        )
                    ))}
                </div>
               {otherSku && otherSku.length > 1 && <hr />}

               {ThingSame && ThingSame.length > 1 && <h3 className="mains">Similar Variants</h3>}
                <div className="block">
                    {ThingSame && ThingSame.map((ele, index) => (
                        (
                            <div key={index}>
                                <img 
                                    className={ele === sku ? 'main-img' : 'other-img'}
                                    src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${mainProduct[0]["Sub Category"]}/${ele}/main.jpg`} 
                                    alt={ele} 
                                    onClick={e => setSku(ele)}
                                />
                            </div>
                        )
                    ))}
                </div>
                <h3 className="main" style={{marginBottom:"2vh"}}>About Product</h3>
                {mainProduct &&
                    <div className="product-description" style={{maxWidth:"40vw"}}>
            
            <p>
                <strong>{mainProduct[0].Title}</strong> is a premium sofa offered by SolaceCraft, renowned for its exceptional quality and vibrant color. This sofa is crafted with the finest materials to ensure durability and comfort, making it an ideal addition to any living space.
            </p>
            <p>
                Designed to elevate your home decor, the {mainProduct[0].Title} features a sleek, modern aesthetic that seamlessly blends with various interior styles. Its plush cushions provide superior comfort, making it the perfect spot for relaxation, whether you're watching TV, reading a book, or entertaining guests.
            </p>
           
         
        </div>
            
                }   
               
<hr />
            {mainProduct &&
            <div className="card" style={{width:"18rem;"}}>
                <ul className="list-group list-group-flush">
                <li><h4 style={{ padding:"0.5vw"}}>Hightlights</h4></li>
                {arr && arr.filter(ele => ele.trim() !== '').map((ele, index) => (
    <li key={index} className="list-group-item">{ele}</li>
))}

                    {mainProduct && 
                   <li className="list-group-item"> Product color: {mainProduct[0]["Color"]}</li>
                    }
                    <li className="list-group-item">
                        <h4>• <u>Disclaimer</u> </h4>  
                        This product is handcrafted by skilled artisans, and therefore will have minor variations. <br />
                        Actual product colour may vary from the images shown due to lighting conditions.</li>
                    <li class="list-group-item">
                    <h4>• <u>Warranty Norms</u></h4>
            
                <li>- Normal wear and tear</li>
                <li>- Damage or scratches from impacts or accidents</li>
                <li>- Misuse, incorrect storage, or improper cleaning methods (e.g., fabric fading from sunlight and cleaning)</li>
                <li>- Upholstery and fabrics</li>
                <li>- Unauthorized handling, alterations, accidents, or repairs</li>
            
        </li>
                </ul>
            </div>
          
            }
               


                </div>

                
                
                
            </div>
            <hr />
           
            <style>
                {`
                .b{
                    padding:0.2vw;
                    width:44vw;
                    background-color:green;
                    border-radius:0.3vw;
                    font-weight:bold;
                }
                .b-1{
                    background-color:#F8F7F2;
                    color:#655F7F;
                    border:2px solid #655F7F;
                }
                .b-1:hover{
                    background-color:#655F7F;
                    color:#F8F7F2;
                    border:2px solid #655F7F;
                }
                .b-2{
                    background-color:#655F7F;
                    color:#F8F7F2;
                }
                .b-2:hover{
                    background-color:#F8F7F2;
                    color:#655F7F;
                    border:2px solid #655F7F;
                }
                @media(max-width:900px){
                    button{
                        padding:1.8vw;
                    }
                    
                }
                @media(max-width:700px){
                    button{
                        padding:2vw;
                    }
                    .other-product {
                        margin:5vw
                    }
                       
                }
               
               
                
                `}
            </style>

            <style>
                {`
                
                .flex-container-c{
                display:flex;
                flex-direction:row;
                flex-wrap:no-wrap;
                align-items:center;
                justify-content:space-evenly;
                overflow-x:auto;
                height:80vh;
                width:100vw;
                box-sizing: border-box; /* Ensures padding and border are included in width/height */
                position: relative;
                }
                .other-product img, .other-product{
                    width:20vw !important;
                    border-radius:1vw;
                    
                }
                
                .other-product, .card-x{
                    flex: 0 0 auto;
                    margin-left:5vw;
                    background-color:#F8F7F2;
                    border:none;
                    padding:0.2vw;
                    border-radius:1vw;
                    
                }
                .card-x{
                 transition: transform 0.3s ease;
                 }
                 .card-x:hover{
                 transform:scale(1.1);
                 }
                    .card-x img
                    {
                    border-radius:1vw;
                    }

                .card:hover{
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 
              0 4px 6px rgba(0, 0, 0, 0.16), 
              0 5px 15px rgba(0, 0, 0, 0.15);
                }
              .otherp-info{
              padding:1vw;
              }
              body{
              overflow-x:hidden;
              }
                ::-webkit-scrollbar {
    width: 8px; /* Adjust the width as needed */
}


              @media(max-width:1000px){
              .flex-container{
                    height:50vh;
              
              }
            
              
              }


              @media(max-width:600px){
              .flex-container-c{
              height
              }
                    .other-product{
                    height:40vh;
                    }
                    .otther-product{
                    he
                    }
                    #th{
                    display:none;
                    }
              }
                `}
            </style>

            <div className="ohterProducts">
                <div className="flex-div-o" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><h2 style={{margin:"2vw",color:"#6F698A"}}>You Might Also Like  </h2> <p style={{color:"#6F698A", marginRight:"3vw", fontSize:"3vh" }}>Scroll &rarr;</p></div>
                
                <div className="flex-container-c">
                {otherProducts && otherProducts.map((ele, index) => (
                    <div key={index} class="card card-x" style={{width: "18rem"}} onClick={e=>window.location.href=`/sfs?sku=${ele.Sku}`}>
                  
                    <img 
                    src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"].toLowerCase()}/${ele["Sub Category"]}/${ele.Sku}/main.jpg`}
                    alt={ele.Sku}  class="card-img-top"/>
                    <div class="card-body">
                      <h5 class="card-title"><span className="d-inline-block text-truncate" style={{ maxWidth: '90%' }}>{ele.Title}</span></h5>
                      <p class="card-text"><p style={{color:"#6F698A"}} id="th">{ele["Sub Category"]}</p>
                      <b><p >{formatter.format(ele["Selling Price "])}</p></b></p>
                 
                    </div>
                  </div>
 
            ))}
            </div>
            </div>
            <nav class="navbar sticky-bottom bg-body-tertiary">
                <div class="container-fluid">
                   <button className="b b-1" onClick={e=>addToCart()}>Add To Cart</button>
                   <button className="b b-2"onClick={e=>placeOrder()}>Order</button>
                </div>
            </nav>
        </>
    );
}

export default Sf;
