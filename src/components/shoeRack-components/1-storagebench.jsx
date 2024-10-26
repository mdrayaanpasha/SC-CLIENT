import axios from "axios";
import { useEffect, useState, useRef } from "react";

//components
import LoadingComponent from "../non-routed-comps/loadingComp";
import Nav from "../non-routed-comps/nav";

//media assets
import "../../assets/css/product-pages.css";


function StorageBench() {
    const [data, setData] = useState(null);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });

    const hasFetchedRef = useRef(false); // Create a ref to track if data has been fetched

    useEffect(() => {
        const fetchD = async () => {
            if (hasFetchedRef.current) return; // Prevent fetching if already done

            try {
                const response = await axios.get("https://api-sc-pgsn.onrender.com/storageBGet");
                if (response.data.message === "ok") {
                    setData(response.data.Data);
                    hasFetchedRef.current = true; // Mark as fetched
                } else {
                    alert("There is an error in the backend!");
                }
            } catch (error) {
                alert("There is an error in the frontend");
                console.error(error);
            }
        };

        fetchD();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
           
            <Nav />
            <h4 className="theme">Storage Benches</h4>
            <div className="products">
                {data && data.length > 0 ? (
                    data.map((ele, index) => (
                        <div key={index} className="card" style={{ width: "18rem" }} onClick={e => window.location.href = `/sfs?sku=${ele.Sku}`}>
                            <img
                                src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/${ele["Sub Category"].replace(' ', '%20')}/${ele["Sku"]}/main.jpg`}
                                alt={ele.Title}
                                loading="lazy"
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{ele.Title}</h5>
                                <small className="silver">{ele["Sub Category"]}</small>
                                <hr />
                                <p className="card-text">
                                    <s style={{ color: "silver" }}>{formatter.format(ele["Mrp "] || 0)}</s> {formatter.format(ele["Selling Price "] || 0)} <span style={{ color: "green" }}>Save 25%</span>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </>
    );
}

export default StorageBench;
