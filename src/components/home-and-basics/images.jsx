import { useEffect, useState } from "react";
import axios from "axios";

//media assets
import "../../assets/css/images.css";
function Images() {
  const searchParams = new URLSearchParams(location.search);
  const [sku, setSku] = useState(searchParams.get("sku"));
  const [imgPaths, setImgPaths] = useState(null);
  const [info, setInfo] = useState(null);
  const [selected, setSelected] = useState("/main.jpg");

  useEffect(() => {
    if (sku) {
      const fet = async () => {
        try {
          const d = await axios.post(
            "https://api-sc-pgsn.onrender.com/sofaimg",
            { sku: sku }
          );
          if (d.data.message === "ok") {
            const filteredImgPaths = d.data.names.filter(
              (item) => item !== "main.jpg"
            );
            setImgPaths(filteredImgPaths);
            setInfo(d.data.D); // Set the info state
          } else {
            alert(d.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fet();
    }
  }, [sku]);

  return (
    <>
      <div className="body">
        {sku && info && (
          <>
            <div
              className="flex-x"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p></p>
              <h4
                onClick={(e) => (window.location.href = `/sfs?sku=${info.Sku}`)}
                style={{
                  color: "#6F698A",
                  fontSize: "5vh",
                  marginRight: "2vw",
                  cursor: "pointer",
                }}
              >
                &#10006;
              </h4>
            </div>
            <div className="flex">
              <center>
                <div className="main">
                  <img
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/${info["Sub Category"]}/${sku}/${selected}`}
                    loading="lazy"
                    alt="this"
                  />
                </div>
              </center>
              <div className="other">
                <img
                  src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/${info["Sub Category"]}/${sku}/main.jpg`}
                  className={
                    `/main.jpg` === selected ? "selected" : "notselected"
                  }
                  loading="lazy"
                  onClick={(e) => setSelected(`/main.jpg`)}
                />
                {imgPaths.map((ele, index) => (
                  <img
                    key={index}
                    src={`https://raw.githubusercontent.com/mdrayaanpasha/sc-api/main/public/img/sofa/${info["Sub Category"]}/${sku}/${ele}`}
                    className={
                      `/${ele}` === selected ? "selected" : "notselected"
                    }
                    loading="lazy"
                    onClick={(e) => setSelected(`/${ele}`)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Images;
