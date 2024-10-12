import { useEffect, useState } from "react"
import Nav from "./nav";
import axios from "axios";


function Spotlights(){

    const [RandomData,setRandomData]=useState(null)
    
    useEffect(()=>{
        const randomFetching = async()=>{
            try {
                const D = await axios.get("https://api-sc-pgsn.onrender.com/randomspotlights");
                if(D.data.message==="ok"){
                    setRandomData(D.data.Da)
                }else{
                    alert("there is an error in backend!")
                }
            } catch (error) {
                alert("there  is an error in reat")
                console.log(error)
            }
        }
        randomFetching()
    },[])


    
    useEffect(()=>{
        if(RandomData){
            let Data= RandomData
            Data.forEach(element => {
                if(element["Product Category"]==="SR"){
                    element["Redirect"]=`http://localhost:5173/sr?sku=${element["Sku"]}`
                }else{
                    element["Redirect"]=`http://localhost:5173/sfs?sku=${element["Sku"]}`
                }
            });

            setRandomData(Data)
        }
    },[RandomData])
    return(
        <>
        <style>
            {`
             .spotlight{
                display:flex;
                align-items:center;
                justify-content:space-evenly;
                flex-wrap:wrap;
                }
                .spotlight .card{
                margin:2vw;

                }
            .card{
                margin:5vw;
                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }
            .card:hover{
                transform: scale(1.1);
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }
                .theme {
                    color: #655F7F;
                    font-weight: bold;
                    
                }
                .mar{
                    margin:3vw;
                }
            `}
        </style>
        <Nav></Nav>
        <h4 className='theme mar'>Spotlights by SolaceCraft 🔦</h4>
        <div className="spotlight" >
                {RandomData && RandomData.map(element => (
                    <div className="card" style={{ width: "18rem" }} onClick={e=>window.location.href=element["Redirect"]}>
                        <img className="thing" src={`https://api-sc-pgsn.onrender.com/public/img/${element["Product Category"]}/${element["Sub Category"]}/${element["Sku"]}/main.jpg`} alt={element["Title"]} ></img>
                        <div className="card-body">
                        <h5 className="card-title">Swank Fabric Sofa</h5>
                        <p><b>3 Seater Sofa</b></p>
                        <hr />
                        <p className="card-text"><s style={{color:"silver"}}>₹24999</s> ₹19999 <span style={{color:"green"}}>Save 25%</span> </p>
                        </div>
                </div>
                ))}  
        </div>
        </>
    )
}


export default Spotlights