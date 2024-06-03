import Nav from "./nav"
import axios from "axios"
import { useEffect, useState } from "react"

function StorageBench(){
    const [data,setData]=useState(null)

    useEffect(()=>{
        const fetchD = async()=>{
            try {
                const d = await axios.get("http://localhost:3000/storageBGet");
                if(d.data.message==="ok"){
                    setData(d.data.Data)
                }else{
                    alert("there is an error in backend!")
                }
                
            } catch (error) {
                alert("there is an error in frontend")
                console.log(error)
            }
           
        }
        fetchD()
    },[])

    useEffect(()=>{
        console.log(data)
    },[data])
    return(
        <>
        <style>
            {`
            .card:hover{
                cursor:pointer;
            }
            .products{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                justify-content:space-around;
            }
            .theme {
                color: #82C2C9;
                font-weight: bold;
                padding:2vw;
            }
            .card{
                margin:2vw;
                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            }
            .card:hover{
                transform: scale(1.1);
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }`}
        </style>
        <Nav></Nav>
        <h4 className="theme">Storage Benches</h4>
        <div className="products">
        {data && data.length > 0 ? (
                    data.map((ele, index) => (
                        <div key={index} className="card" style={{ width: "18rem" }} onClick={e=>window.location.href=`/sofa?sku=${ele.Sku}`}>
                        <img
                            src={`http://localhost:3000/public/img/sofa/${ele["Sub Category"].replace(' ', '%20')}/${ele["Sku"]}/main.jpg`}
                            alt={ele.Title}
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{ele.Title}</h5>
                            <small className="silver">{ele["Sub Category"]}</small>
                            <hr />
                
                            <p className="card-text">₹ {ele["Mrp "]}</p>
                            
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </>
    )
}


export default StorageBench