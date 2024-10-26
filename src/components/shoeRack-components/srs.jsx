import { useState, useEffect } from "react";
import axios from "axios";
//components
import Nav from "../non-routed-comps/nav";
import LoadingComponent from "../non-routed-comps/loadingComp";

//media assets
import "../../assets/css/product-orderpage.css";
function SR() {
  const searchParams = new URLSearchParams(location.search);
  const [sku, setSku] = useState(searchParams.get("sku"));
  const [mainProduct, setMainProduct] = useState(null);
  const [productImgs, setProductImgs] = useState(null);
  const [rating, setRating] = useState(generateRating()); // Generates a random number between 3 and 5

  // const [sku, setSku] = useState("SCSO23003YL");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const [arr, setArr] = useState(null);

  useEffect(() => {
    const sofaFetch = async () => {
      console.log(sku);
      try {
        const data = { Sku: sku };
        const D = await axios.post(
          "https://api-sc-pgsn.onrender.com/SRget",
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
  }, [sku]);

  function generateRating() {
    const ratings = [3, 4, 5];
    return ratings[Math.floor(Math.random() * ratings.length)];
  }

  const [TITLE, setTITLE] = useState(null);
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
      setTITLE(fin[0]);

      //    alert(title)
    }
  }, [mainProduct]);

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
            alert("there is an error in backend");
          }
        } catch (error) {
          alert("there is an error in react");
          console.log(error);
        }
      };
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

      getOtherProducts();
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

  function gotoPage(sku) {
    window.location.href = `/sr?sku=${sku}`;
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
              src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${diSelected}`}
              loading="lazy"
            />
          </center>
          <div className="dialog-content">
            <div className="flex-dia">
              {productImgs.map((ele) => (
                <img
                  src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`}
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
                    src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${ele}`}
                    onClick={(e) => setSelectedImg(ele)}
                    loading="lazy"
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
                  src={`https://api-sc-pgsn.onrender.com/public/img/${mainProduct[0]["Product Category"]}/${mainProduct[0]["Sub Category"]}/${sku}/${selectedImg}`}
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
            <h3 className="mains" style={{ color: "#6F698A" }}>
              Similar Variants
            </h3>
          )}
          <div className="block">
            {otherSku &&
              otherSku.map(
                (ele, index) =>
                  ele !== "0" && (
                    <div key={index}>
                      <img
                        className={ele === sku ? "main-img" : "other-img"}
                        src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/SR/${mainProduct[0]["Sub Category"]}/${ele}/main.jpg`}
                        alt={ele}
                        onClick={(e) => setSku(ele.replace(" ", ""))}
                        loading="lazy"
                      />
                    </div>
                  )
              )}
          </div>
          <hr />
          <h3 className="mains" style={{ color: "#6F698A" }}>
            About Product
          </h3>
          {mainProduct && (
            <>
              <p
                style={{
                  marginLeft: "2vw",
                  fontSize: "3vh",
                  lineHeight: "1.5",
                }}
              >
                • <strong>{mainProduct[0].Title}</strong> is a premium shoerack
                from <em>SolaceCraft</em>, renowned for its exceptional quality
                and vibrant color. Crafted with high-grade materials, this
                shoerack offers durability and a sleek, modern design that
                complements any home decor.
                <br />
                <br />
                <span style={{ color: "green" }}>
                  Enjoy a special 25% discount!
                </span>{" "}
                Don't miss this limited-time offer. Originally priced at{" "}
                {mainProduct[0]["Mrp "]}Rs. you can now get it for just{" "}
                <strong>Rs {mainProduct[0]["Selling Price "]}</strong>. Upgrade
                your home storage with this top-tier shoerack from SolaceCraft
                and experience the perfect blend of functionality and elegance.
              </p>
            </>
          )}

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
        <h2 style={{ margin: "2vw", color: "#6F698A" }}>
          You Might Also Like{" "}
        </h2>
        <div className="flex-container">
          {otherProducts &&
            otherProducts.map((ele, index) => (
              <div
                key={index}
                class="card"
                style={{ width: "18rem" }}
                onClick={(e) => gotoPage(ele.Sku)}
              >
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/${mainProduct[0]["Product Category"]}/${ele["Sub Category"]}/${ele.Sku}/main.jpg`}
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

export default SR;
