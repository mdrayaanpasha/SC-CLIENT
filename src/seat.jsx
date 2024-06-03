import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";



function Seat(){

    const [data,setData] = useState(null)
    useEffect(()=>{
        const cab = async ()=>{
            try {
                const D = await axios.get("http://localhost:3000/seatget");
                if(D.data.message==="ok"){
                    setData(D.data.Data)
                }else{
                    alert("there is an error in backend")
                }
            } catch (error) {
                console.log(error)
                alert("there is an error in frontend")
            }

        }
        cab()
    },[])

    useEffect(()=>{
        console.log(data);
    },[data])
    const g = (id) =>{
        const url = `/product?Id=${id}`;
        window.location.href=url;
      }
    return(
        <>
        <style>
            {`
            .products{
                display:flex;
                align-items:center;
                justify-content:space-evenly;
                flex-wrap:wrap;
            }
            .card{
                margin-top:5vh;
            }
            `}
        </style>
        <h1>Shoe Racks With Seat</h1>
        <div className="products">
        
        {data && data.map(product => (
            <div className="card" key={product._id} style={{ width: '18rem' }} onClick={()=>g(product._id)}>
            <img src={`http://localhost:3000/${product.MainImg}`} className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">{product.ProductName}</h6>
              <small className="silver">{product.ProductSubGroup}</small>
              <hr />
              <small style={{ color: 'green' }} >Today’s Deal</small>
              <p>₹{product.ProductPrice}</p>
              {/* <small className="card-text">{product.ProductDescripton}</small> <br /> */}
              
            </div>
          </div>
        ))}

</div>

</>
        
    
    
    )
        
        
    
}


export default Seat