import { useState, useEffect } from "react";
import axios from "axios";

//components
import Nav from "../non-routed-comps/nav";
import LoadingComponent from "../non-routed-comps/loadingComp";

//media assets
import "../../assets/css/product-orderpage.css";

function Sf() {
  const searchParams = new URLSearchParams(location.search);
  const [sku, setSku] = useState(searchParams.get("sku"));
  const [mainProduct, setMainProduct] = useState(null);
  const [productImgs, setProductImgs] = useState(null);
  const [rating, setRating] = useState(generateRating()); // Generates a random number between 3 and 5
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const [arr, setArr] = useState(null);
  useEffect(() => {
    if (sku) {
      const sofaFetch = async () => {
        try {
          const data = { Sku: sku };
          const D = await axios.post(
            "https://api-sc-pgsn.onrender.com/getS",
            data
          );
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

  const [TITLE, setTITLE] = useState(null);
  const [ThingSame, setThingSame] = useState(null);
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
      setTITLE(fin[0]);

      //    alert(title)
    }
  }, [mainProduct]);

  const [otherSku, setOtherSku] = useState(null);
  const [otherProducts, setOtherProducts] = useState(null);

  useEffect(() => {
    if (mainProduct) {
      const getOtherProducts = async () => {
        try {
          const D = await axios.post(
            "https://api-sc-pgsn.onrender.com/otherGetData",
            {
              PC: mainProduct[0]["Sub Category"],
              Product: mainProduct[0]["Product Category"],
            }
          );
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

    if (mainProduct) {
      let a = mainProduct[0]["Size"]
        .replace("Size:", "")
        .replace(/\bSH:\s+/g, "SH:")
        .replace("W", "Product Width")
        .replace("D", "Product Depth")
        .replace("SH", "Product Seating Height")
        .replace("H", "Product Height");

      a = a.split('"');
      setArr(a);
    }
  }, [mainProduct]);
  useEffect(() => {
    if (productImgs) {
      const target = "main.jpg";
      const index = productImgs.findIndex(
        (img) => img.toLowerCase() === target
      );
      if (index !== -1 && index !== 0) {
        const newProductImgs = [...productImgs];
        [newProductImgs[0], newProductImgs[index]] = [
          newProductImgs[index],
          newProductImgs[0],
        ];
        setProductImgs(newProductImgs);
      }
    }
  }, [productImgs]);
  const addToCart = async () => {
    const user = localStorage.getItem("D");
    if (user) {
      try {
        const response = await axios.post(
          "https://api-sc-pgsn.onrender.com/addcart",
          { Email: user, Sku: sku }
        );
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
  const [selectedImg, setSelectedImg] = useState("main.jpg");
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
  function BigSofa() {
    window.location.href = `/sofaimg?sku=${sku}`;
  }
  const [diSelected, setDiSelected] = useState("main.jpg");

  return (
    <>
      <Nav />
      {productImgs && mainProduct && (
        <dialog id="imageDialog">
          <button
            onClick={() => document.getElementById("imageDialog").close()}
          >
            &#10006;
          </button>
          <center>
            <img
              class="di-main-img"
              src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                "Product Category"
              ].toLowerCase()}/${
                mainProduct[0]["Sub Category"]
              }/${sku}/${diSelected}`}
              loading="lazy"
            />
          </center>
          <div className="dialog-content">
            <div className="flex-dia">
              {productImgs.map((ele) => (
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                    "Product Category"
                  ].toLowerCase()}/${
                    mainProduct[0]["Sub Category"]
                  }/${sku}/${ele}`}
                  onClick={(e) => setDiSelected(ele)}
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

          {productImgs && mainProduct ? (
            <div className="ProductAll">
              <div className="otherimgs">
                {productImgs.map((ele) => (
                  <img
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                      "Product Category"
                    ].toLowerCase()}/${
                      mainProduct[0]["Sub Category"]
                    }/${sku}/${ele}`}
                    onClick={(e) => setSelectedImg(ele)}
                    alt=""
                  />
                ))}
              </div>
              <div id="carouselExampleIndicators" className="carousel slide">
                <button onClick={handleNextClick} class="carousel-next">
                  &rarr;
                </button>
                <button onClick={handlePrevClick} class="carousel-prev">
                  &larr;
                </button>

                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                    "Product Category"
                  ].toLowerCase()}/${
                    mainProduct[0]["Sub Category"]
                  }/${sku}/${selectedImg}`}
                  className={
                    selectedImg === "main.jpg" ? "carousel-yes" : "carousel-no"
                  }
                  alt=""
                  onClick={() =>
                    document.getElementById("imageDialog").showModal()
                  }
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <LoadingComponent />
          )}
        </div>
        <div className="product-information">
          {mainProduct && (
            <>
              <h3>{TITLE}</h3>
              <h5 style={{ color: "silver" }}>({mainProduct[0].Material})</h5>
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
                <s style={{ color: "silver" }}>
                  {formatter.format(mainProduct[0]["Mrp "])}
                </s>
                {formatter.format(mainProduct[0]["Selling Price "])}
                <span style={{ color: "green" }}> Save 25%</span>
              </h4>
              <hr />
            </>
          )}
          {otherSku && otherSku.length > 1 && (
            <h3 className="mains">Similar Colors</h3>
          )}
          <div className="block">
            {otherSku &&
              otherSku.map(
                (ele, index) =>
                  ele !== "0" && (
                    <div key={index}>
                      <img
                        className={ele === sku ? "main-img" : "other-img"}
                        src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                          "Product Category"
                        ].toLowerCase()}/${
                          mainProduct[0]["Sub Category"]
                        }/${ele.replace(" ", "")}/main.jpg`}
                        alt={ele}
                        onClick={(e) => setSku(ele.replace(" ", ""))}
                        loading="lazy"
                      />
                    </div>
                  )
              )}
          </div>
          {otherSku && otherSku.length > 1 && <hr />}

          {ThingSame && ThingSame.length > 1 && (
            <h3 className="mains">Similar Variants</h3>
          )}
          <div className="block">
            {ThingSame &&
              ThingSame.map((ele, index) => (
                <div key={index}>
                  <img
                    className={ele === sku ? "main-img" : "other-img"}
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                      "Product Category"
                    ].toLowerCase()}/${
                      mainProduct[0]["Sub Category"]
                    }/${ele}/main.jpg`}
                    alt={ele}
                    onClick={(e) => setSku(ele)}
                    loading="lazy"
                  />
                </div>
              ))}
          </div>
          <h3 className="main" style={{ marginBottom: "2vh" }}>
            About Product
          </h3>
          {mainProduct && (
            <div className="product-description" style={{ maxWidth: "40vw" }}>
              <p>
                <strong>{mainProduct[0].Title}</strong> is a premium sofa
                offered by SolaceCraft, renowned for its exceptional quality and
                vibrant color. This sofa is crafted with the finest materials to
                ensure durability and comfort, making it an ideal addition to
                any living space.
              </p>
              <p>
                Designed to elevate your home decor, the {mainProduct[0].Title}{" "}
                features a sleek, modern aesthetic that seamlessly blends with
                various interior styles. Its plush cushions provide superior
                comfort, making it the perfect spot for relaxation, whether
                you're watching TV, reading a book, or entertaining guests.
              </p>
            </div>
          )}

          <hr />
          {mainProduct && (
            <div className="card" style={{ width: "18rem;" }}>
              <ul className="list-group list-group-flush">
                <li>
                  <h4 style={{ padding: "0.5vw" }}>Hightlights</h4>
                </li>
                {arr &&
                  arr
                    .filter((ele) => ele.trim() !== "")
                    .map((ele, index) => (
                      <li key={index} className="list-group-item">
                        {ele}
                      </li>
                    ))}

                {mainProduct && (
                  <li className="list-group-item">
                    {" "}
                    Product color: {mainProduct[0]["Color"]}
                  </li>
                )}
                <li className="list-group-item">
                  <h4>
                    • <u>Disclaimer</u>{" "}
                  </h4>
                  This product is handcrafted by skilled artisans, and therefore
                  will have minor variations. <br />
                  Actual product colour may vary from the images shown due to
                  lighting conditions.
                </li>
                <li class="list-group-item">
                  <h4>
                    • <u>Warranty Norms</u>
                  </h4>

                  <li>- Normal wear and tear</li>
                  <li>- Damage or scratches from impacts or accidents</li>
                  <li>
                    - Misuse, incorrect storage, or improper cleaning methods
                    (e.g., fabric fading from sunlight and cleaning)
                  </li>
                  <li>- Upholstery and fabrics</li>
                  <li>
                    - Unauthorized handling, alterations, accidents, or repairs
                  </li>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr />

      <div className="ohterProducts">
        <div
          className="flex-div-o"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: "2vw", color: "#6F698A" }}>
            You Might Also Like{" "}
          </h2>{" "}
          <p style={{ color: "#6F698A", marginRight: "3vw", fontSize: "3vh" }}>
            Scroll &rarr;
          </p>
        </div>

        <div className="flex-container-c">
          {otherProducts &&
            otherProducts.map((ele, index) => (
              <div
                key={index}
                class="card card-x"
                style={{ width: "18rem" }}
                onClick={(e) => (window.location.href = `/sfs?sku=${ele.Sku}`)}
              >
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0][
                    "Product Category"
                  ].toLowerCase()}/${ele["Sub Category"]}/${ele.Sku}/main.jpg`}
                  alt={ele.Sku}
                  class="card-img-top"
                  loading="lazy"
                />
                <div class="card-body">
                  <h5 class="card-title">
                    <span
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: "90%" }}
                    >
                      {ele.Title}
                    </span>
                  </h5>
                  <p class="card-text">
                    <p style={{ color: "#6F698A" }} id="th">
                      {ele["Sub Category"]}
                    </p>
                    <b>
                      <p>{formatter.format(ele["Selling Price "])}</p>
                    </b>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <nav class="navbar sticky-bottom bg-body-tertiary">
        <div class="container-fluid">
          <button className="b b-1" onClick={(e) => addToCart()}>
            Add To Cart
          </button>
          <button className="b b-2" onClick={(e) => placeOrder()}>
            Order
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sf;
