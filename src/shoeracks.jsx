import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./nav";
import Cab from "./img/sr-cat/cabinet-sr.jpg";
import Seat from "./img/sr-cat/seat-sr.jpg";
import Bench from "./img/sr-cat/bench-sr.jpg";
import Loading from "./loading";
function ShoeRacks() {
    const [shoeRacks, setShoeRacks] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api-sc-pgsn.onrender.com/ShoeRacksget");
                if (response.data.message === "ok") {
                    setShoeRacks(response.data.D);
                } else {
                    alert("There was some error in backend!");
                }
            } catch (error) {
                console.log(error);
                alert("There was an error fetching data from the backend");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (shoeRacks) {
            shoeRacks.forEach((element) => {
                console.log(element);
            });
        }
    }, [shoeRacks]);

    const se = (sku) => {
        window.location.href = `/sr?sku=${sku}`;
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    });

    return (
        <>
            <style>
                {`
                    .silver {
                        color: silver;
                    }
                    .flex-div {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: space-around;
                    }
                    .card {
                        margin: 2vw;
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                    }
                    .card:hover {
                        transform: scale(1.1);
                        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    }
                    .cat img {
                        height: 20vh;
                        width: 10vw;
                        border-radius: 10%;
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                    }
                    .cat img:hover {
                        transform: scale(1.1);
                        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                    }
                    .cat:hover, .card:hover {
                        cursor: pointer;
                    }
                    .silver {
                        color: silver;
                        font-weight: bold;
                    }
                    .categories {
                        display: flex;
                        align-items: center;
                        justify-content: space-evenly;
                    }
                    .theme {
                        color: #655F7F;
                        font-weight: bold;
                        padding: 2vw;
                    }
                    @media(max-width: 1200px) {
                        .cat img {
                            height: 23vh;
                            width: 15vw;
                        }
                    }
                    @media(max-width: 850px) {
                        .cat img {
                            height: 20vh;
                        }
                    }
                    @media(max-width: 750px) {
                        .cat img {
                            width: 18vw;
                        }
                    }
                    @media(max-width: 750px) {
                        .cat img {
                            width: 20vw;
                        }
                    }
                    @media(max-width: 550px) {
                        .cat img {
                            height: 18vh;
                        }
                    }
                    @media(max-width: 500px) {
                        .categories {
                            flex-wrap: wrap;
                        }
                    }
                    @media(max-width: 400px) {
                        .cat img {
                            width: 30vw;
                            height: 15vh;
                            border-radius: 20%;
                            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                        }
                        .card {
                            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                        }
                    }
                `}
            </style>
            <Nav />
            <h4 className="theme">Categories</h4>
            <div className="categories">
                <div className="cat">
                    <img src={Cab} alt="" onClick={e => window.location.href = "/shoeracks/cabinet"} />
                    <center><p className="silver">Cabinet</p></center>
                </div>
                <div className="cat" onClick={e => window.location.href = "/shoeracks/bench"}>
                    <img src={Bench} alt="" />
                    <center><p className="silver">With Bench</p></center>
                </div>
                <div className="cat" onClick={e => window.location.href = "/shoeracks/seat"}>
                    <img src={Seat} alt="" />
                    <center><p className="silver">With Seat</p></center>
                </div>
            </div>
            <hr />
            <h4 className="theme">ShoeRacks By SolaceCraft 👟</h4>
            <div>
                {shoeRacks ? (
                    <div className="flex-div">
                        {shoeRacks.map((ele, index) => (
                            <div key={index} className="card" style={{ width: "18rem" }} onClick={e => se(ele.Sku)}>
                                <img
                                    src={`https://api-sc-pgsn.onrender.com/public/img/SR/${ele["Sub Category"].replace(' ', '%20')}/${ele["Sku"]}/main.jpg`}
                                    alt={ele.Title}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{ele.Title}</h5>
                                    <small className="silver">{ele["Sub Category"]}</small>
                                    <hr />
                                    <p className="card-text">
                                        <s style={{ color: "silver" }}>{ formatter.format(ele["Mrp "])}</s> { formatter.format(ele["Selling Price "]) }  <span style={{ color: "green" }}>Save 25%</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Loading></Loading>

                )}
            </div>
        </>
    );
}

export default ShoeRacks;
