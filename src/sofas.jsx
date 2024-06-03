import { useEffect,useState } from "react"
import axios from "axios"
import Nav from "./nav"
import Seat1 from "./img/sofa-cat/sofa-cat-1.jpg"
import Seat2 from "./img/sofa-cat/sofa-cat-2.jpg"
import Seat3 from "./img/sofa-cat/sofa-cat-3.jpg"
import L from "./img/sofa-cat/sofa-cat-l.jpg"
import bench from "./img/sofa-cat/sofa-cat-bench.jpg"


function Sofas() {

    const string = "http://localhost:3000/public/img/sofa/1 Seater Sofa/SCSO23004BL/main.jpg"
    const thing = string.replace(" ","%20")
    const [sofa,setSofas] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getSofas");
                setSofas(response.data.S); // Update state with fetched data
            } catch (error) {
                console.log(error);
                alert("There was an error fetching data from the backend");
            }
        };
    
        fetchData();
    }, []);
    const se = (sku)=>{
        window.location.href=`/sofa?sku=${sku}`
    }

    
    return (
        <>
        <style>
            {`
            .silver{
                color:silver;
            }
            .flex-div{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                justify-content:space-around;
            }
            .card{
                margin:2vw;
                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }
            .card:hover{
                transform: scale(1.1);
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }
            .cat img{
                height:20vh;
                width:10vw;
                border-radius:10%;
                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }
            .cat img:hover {
                transform: scale(1.1);
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
            }
            .cat:hover, .card:hover{
                cursor:pointer;
            }
            .silver{
                color:silver;
                font-weight:bold;
            }
            .categories{
                display:flex;
                align-items:center;
                justify-content:space-evenly;
            }
            .theme {
                color: #82C2C9;
                font-weight: bold;
                padding:2vw;
            }
            @media(max-width:1200px){
                .cat img{
                    height:23vh;
                    width:15vw;
                }
            }
            @media(max-width:850px){
                .cat img{
                    height:20vh;
                }
            }

            @media(max-width:750px){
                .cat img{
                    width:18vw;
                }
            }

            @media(max-width:750px){
                .cat img{
                    width:20vw;
                }
            }

            @media(max-width:550px){
                .cat img{
                    height:18vh;
                }
            }
            @media(max-width:500px){
                .categories{
                    flex-wrap:wrap;
                }
                
            }
            
            @media(max-width:400px){
                .cat img{
                    width:30vw;
                    height:15vh;
                    border-radius:20%;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }
                .card{
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }
            }
            `}
        </style>
        <Nav></Nav>
        <h4 className="theme">Categories</h4>
        <div className="categories">
            
            <div className="cat">
                <img src={Seat1} alt="" onClick={e=>window.location.href="/sofas/1seater"}  />
               <center><p className="silver">1 Seater</p></center> 
            </div>

            <div className="cat" onClick={e=>window.location.href="/sofas/2seater"}>
                <img src={Seat2} alt="" />
                <center><p className="silver">2 Seater</p></center>  
            </div>
            
            <div className="cat" onClick={e=>window.location.href="/sofas/3seater"}>
                <img src={Seat3} alt="" />
               <center><p className="silver">3 Seater</p></center> 
            </div>

            <div className="cat" onClick={e=>window.location.href="/sofas/lshaped"}>
                <img src={L} alt="" />
                <center><p className="silver">L Shaped</p></center>
            </div>

            <div className="cat" onClick={e=>window.location.href="/sofas/storageBench"}>
                <img src={bench} alt="" />
               <center><p className="silver">Storage Bench</p></center> 
            </div>
            
           
            
            
        </div>
        <hr />
        <h4 className="theme">Sofas By SolaceCraft</h4>
        <div>
            
        {sofa ? (
            <div className="flex-div">
                {sofa.map((ele, index) => (
    <div key={index} className="card" style={{ width: "18rem" }} onClick={e=>se(ele.Sku)}>
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
))}

            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    </>
    )
}

export default Sofas
