import Nav from "./nav";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingComponent from "./loadingComp";
function SR() {
    const searchParams = new URLSearchParams(location.search);
    const [sku, setSku] = useState(searchParams.get("sku"));
    const [mainProduct, setMainProduct] = useState(null);
    const [productImgs, setProductImgs] = useState(null);
    const [rating, setRating] = useState(generateRating()); // Generates a random number between 3 and 5

    // const [sku, setSku] = useState("SCSO23003YL");
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });


    
    const [arr,setArr]=useState(null)
    
    useEffect(() => {
        const sofaFetch = async () => {
            console.log(sku)
            try {
                const data = { Sku: sku };
                const D = await axios.post("https://api-sc-pgsn.onrender.com/SRget", data);
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

    function generateRating() {
        const ratings = [3, 4, 5];
        return ratings[Math.floor(Math.random() * ratings.length)];
    }

    const [TITLE,setTITLE]=useState(null)
    const [otherSku, setOtherSku] = useState(null);
    useEffect(() => {
        if (mainProduct && mainProduct.length > 0) {
            const similarSku = mainProduct[0]["SKUs"];

            const thing = similarSku.split(",");
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

    
    const [otherProducts, setOtherProducts] = useState(null);

    

           
    useEffect(()=>{
        if(mainProduct){
        const getOtherProducts = async()=>{
            try {
                const D = await axios.post("https://api-sc-pgsn.onrender.com/otherGetData",{PC:mainProduct[0]["Sub Category"],Product:mainProduct[0]["Product Category"]})
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
        if(mainProduct){
            let a = mainProduct[0]["Size"].replace("Size:", "").replace(/\bSH:\s+/g, 'SH:').replace("W","Product Width").replace("D","Product Depth").replace("SH","Product Seating Height").replace("H","Product Height")
            
            a = a.split('"')
            setArr(a)


            

        }

        getOtherProducts()
    }
    },[mainProduct])

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
    
    function gotoPage(sku){
        window.location.href=`/sr?sku=${sku}`
    }
    const [diSelected,setDiSelected]=useState('main.jpg')
    return (
        <>
            <style>
                {`
                .product-information p, .product-information ul {
    max-width: 50vw;
    word-break: break-word;
}

@media(max-width: 1200px) {
    .product-information p, .product-information ul {
        max-width: 30vw;
    }
}

@media(max-width: 1000px) {
    .product-information p, .product-information ul {
        max-width: 40vw;
    }
}

@media(max-width: 780px) {
    .product-information p, .product-information ul {
        max-width: 50vw;
    }
}

@media(max-width: 600px) {
    .product-information p, .product-information ul {
        max-width: 60vw;
    }
}

@media(max-width: 400px) {
    .product-information p, .product-information ul,.product-information ul p, p {
        max-width: 100vw;
        font-size:2vh !important;
    }
}

                
                 .carousel, .carousel-inner, .carousel-item, .carousel-item img {
                    height: 100vh;
                    width: 35vw;
                    object-fit: contain;
                    padding: 0;
                     position: sticky;
                    top: 10vh; 
                    margin-bottom:5vh;
                }
                    
               
                .flex-product {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content:space-evenly;
                }
                .fa-star.checked {
                    color: orange;
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
                  
                    }
                    body{
                        overflow-x:hidden;
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
                     

                    }
                    @media(max-width:500px){
                        .similar-products{
                            margin-right:5vw;
                            margin-left:5vw;
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
                     

                    }
                    @media(max-width:500px){
                        .similar-products{
                            margin-right:5vw;
                            margin-left:5vw;
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
                    border-radius:1vw;
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
    src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${diSelected}`} 
    loading="lazy"
    
    />
    </center>
    <div className="dialog-content">
        
      
      <div className="flex-dia">
      {productImgs.map(ele => (
        <img 
          src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`} 
          onClick={e => setDiSelected(ele)} 
          alt="" 
          loading="lazy"
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
                     
                   .flex-product {
                    display: flex;
                    flex-wrap: wrap;
                    
                    
                }
                .flex-product .card{
                max-width:40vw;
                }
                        .otherimgs img{
                        width:7vw;
                        object-fit:contain;
                        border-radius:1vw;
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
                        display:none;
                        }

                        }
                        `}
                    </style>
                    {productImgs && mainProduct ? (
                        <div className="ProductAll">
                        <div className="otherimgs">
                            {productImgs.map(ele=>(
                            <img src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`} onClick={e=>setSelectedImg(ele)}  loading="lazy" alt="" />

                           ))}
                        </div>
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <button onClick={handleNextClick} class="carousel-next">&rarr;</button>
                            <button onClick={handlePrevClick} class="carousel-prev">&larr;</button>

                            <img
        src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${selectedImg}`}
        className={selectedImg === 'main.jpg' ? 'carousel-yes' : 'carousel-no'} 
        alt="" onClick={() => document.getElementById('imageDialog').showModal()}
loading="lazy"
      />                       
                         </div>
                         </div>
                    ) : (
                        <LoadingComponent/>

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
            {otherSku && otherSku.length > 1 && <h3 className="mains" style={{color:"#6F698A"}}>Similar Variants</h3>}
                <div className="block">
                    {otherSku && otherSku.map((ele, index) => (
                        ele !== '0' && (
                            <div key={index}>
                                <img 
                                    className={ele === sku ? 'main-img' : 'other-img'}
                                    src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/SR/${mainProduct[0]["Sub Category"]}/${ele}/main.jpg`} 
                                    alt={ele} 
                                    onClick={e => setSku(ele.replace(" ",""))}
                                    loading="lazy"
                                />
                            </div>
                        )
                    ))}
                </div>
                <hr />
                <h3 className="mains" style={{color:"#6F698A"}}>About Product</h3>
                {mainProduct && <>
                    <p style={{ marginLeft: "2vw", fontSize: "3vh", lineHeight: "1.5" }}>
  • <strong>{mainProduct[0].Title}</strong> is a premium shoerack from <em>SolaceCraft</em>,
  renowned for its exceptional quality and vibrant color. Crafted with high-grade materials, this shoerack offers durability and a sleek, modern design that complements any home decor.<br />
 <br />
  <span style={{ color: "green" }}>Enjoy a special 25% discount!</span> Don't miss this limited-time offer. Originally priced at {mainProduct[0]["Mrp "]}Rs. you can now get it for just <strong>Rs {mainProduct[0]["Selling Price "]}</strong>. Upgrade your home storage with this top-tier shoerack from SolaceCraft and experience the perfect blend of functionality and elegance.
</p>

                </>
                }   
               

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
            <style>
                {`
                
                .flex-container{
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
                
                .other-product, .card{
                    flex: 0 0 auto;
                    margin-left:5vw;
                    background-color:#F8F7F2;
                    border:none;
                    
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

              @media(max-width:1000px){
              .flex-container{
                    height:50vh;
              
              }
            
              
              }


              @media(max-width:600px){
              .flex-container{
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

            <hr />
            <div className="ohterProducts">
                <h2 style={{margin:"2vw",color:"#6F698A"}}>You Might Also Like  </h2>
                <div className="flex-container">
                {otherProducts && otherProducts.map((ele, index) => (
                    <div key={index} class="card" style={{width: "18rem"}} onClick={e=>gotoPage(ele.Sku)}>
                  
                    <img 
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/${mainProduct[0]["Product Category"]}/${ele["Sub Category"]}/${ele.Sku}/main.jpg`}
                    alt={ele.Sku}  class="card-img-top"
                    loading="lazy"
                    />
                    <div class="card-body">
                      <h5 class="card-title"><span className="d-inline-block text-truncate" style={{ maxWidth: '90%' }}>{ele.Title}</span></h5>
                      <p class="card-text"><p style={{color:"#6F698A"}} id="th">{ele["Sub Category"]}</p>
                      <b><p >{formatter.format(ele["Selling Price "])}</p></b></p>
                 
                    </div>
                  </div>
 
))}
</div>
            </div>
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
                        height:5vh;
                    }
                    .navbar{
                        width:99vw;
                        padding:0;
                    }
                    .container-fluid{
                    width:100%;
                    }
                   
                       
                }
               
               
                
                `}
            </style>
            <nav class="navbar sticky-bottom bg-body-tertiary">
                <div class="container-fluid">
                   <button className="b b-1" onClick={e=>addToCart()}>Add To Cart</button>
                   <button className="b b-2"onClick={e=>placeOrder()}>Order</button>
                </div>
            </nav>
        </>
    );
}

export default SR;
