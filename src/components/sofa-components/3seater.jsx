import Nav from "../non-routed-comps/nav"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import LoadingComponent from "../non-routed-comps/loadingComp";

function Seat3(){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });

    const [data, setData] = useState(null);
    const dataCache = useRef(null); // Initialize useRef to cache data

    useEffect(() => {
        const fetchD = async () => {
            try {
                const response = await axios.get("https://api-sc-pgsn.onrender.com/3seatget");
                if (response.data.message === "ok") {
                    dataCache.current = response.data.Data; // Store data in the ref
                    setData(dataCache.current); // Update state with fetched data
                } else {
                    alert("There is an error in the backend!");
                }
            } catch (error) {
                alert("There is an error in the frontend");
                console.log(error);
            }
        }

        // Check if data is already cached
        if (!dataCache.current) {
            fetchD(); // Fetch data if cache is empty
        } else {
            setData(dataCache.current); // Load from cache
        }
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <style>
                {`
                .products {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-around;
                }
                .theme {
                    color: #655F7F;
                    font-weight: bold;
                    padding: 2vw;
                }
                .card:hover {
                    cursor: pointer;
                }
                .card {
                    margin: 2vw;
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                }
                .card:hover {
                    transform: scale(1.1);
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                }`}
            </style>
            <Nav />
            <h4 className="theme">3 Seater Sofas</h4>
            <div className="products">
                {data && data.length > 0 ? (
                    data.map((ele, index) => (
                        <div key={index} className="card" style={{ width: "18rem" }} onClick={() => window.location.href = `/sfs?sku=${ele.Sku}`}>
                            <img
                                src={`https://api-sc-pgsn.onrender.com/public/img/sofa/${ele["Sub Category"].replace(' ', '%20')}/${ele["Sku"]}/main.jpg`}
                                alt={ele.Title}
                                className="card-img-top"
                                loading="lazy"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{ele.Title}</h5>
                                <small className="silver">{ele["Sub Category"]}</small>
                                <hr />
                                <p className="card-text"><s style={{ color: "silver" }}>{formatter.format(ele["Mrp "])}</s> {formatter.format(ele["Selling Price "])} <span style={{ color: "green" }}>Save 25%</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </>
    )
}

export default Seat3;
