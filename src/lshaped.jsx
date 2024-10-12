import Nav from "./nav"
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "./loading"
function Lshaped(){
    const [data,setData]=useState(null)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });
    useEffect(()=>{
        const fetchD = async()=>{
            try {
                const d = await axios.get("https://api-sc-pgsn.onrender.com/Lget");
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
            .products{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                justify-content:space-around;
            }
            .theme {
                color:#655F7F;
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
        <h4 className="theme">L Shaped Sofas</h4>
        <div className="products">
        {data && data.length > 0 ? (
                    data.map((ele, index) => (
                        <div key={index} className="card" style={{ width: "18rem" }} onClick={e=>window.location.href=`/sfs?sku=${ele.Sku}`}>
                        <img
                            src={`https://api-sc-pgsn.onrender.com/public/img/sofa/${ele["Sub Category"].replace(' ', '%20')}/${ele["Sku"]}/main.jpg`}
                            alt={ele.Title}
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{ele.Title}</h5>
                            <small className="silver">{ele["Sub Category"]}</small>
                            <hr />
                
                            <p className="card-text"><s style={{color:"silver"}}>{formatter.format(ele["Mrp "])}</s> {formatter.format(ele["Selling Price "])} <span style={{color:"green"}}>Save 25%</span></p>

                            
                        </div>
                    </div>
                    ))
                ) : (
                    <Loading></Loading>

                )}
            </div>
        </>
    )
}


export default Lshaped