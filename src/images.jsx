import { useEffect, useState } from "react";
import axios from "axios";

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
            const d = await axios.post("https://api-sc-pgsn.onrender.com/sofaimg", { sku: sku });
            if (d.data.message === "ok") {
              const filteredImgPaths = d.data.names.filter(item => item !== 'main.jpg');
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
      <style>{`
      .flex{

        justify-content:space-evenly;
        flex-wrap:wrap;
        align-items:center;
        margin-top:vh;
      }
      .other{
      
        display: flex;
        justify-content:space-evenly;
        flex-wrap:nowrap;
        overflow-x:auto;
      }
        .other img{
            height:15vh;
            margin:2vh;
        }
        .main img{
            height:70vh;
            border:3px solid #6F698A;
            border-radius:0.2vw;
            padding:0.5vw;
            object-fit: contain;

        }
        .selected,.notselected{
            border-radius:0.2vw;
            padding:0.1vw;
        }
        .selected{
            border:3px solid #6F698A;
        }
        .cross{
            display:flex;
            justify-content:right;
            font-size:30px;
            cursor:pointer;
        }
        
    `}
      </style>
      
      <div className="body">
        
      
      {sku && info && (
        
        <>
    
        <div className="flex-x" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}} >
          <p></p>
          <h4 onClick={e=>window.location.href=`/sfs?sku=${info.Sku}`} style={{color:"#6F698A", fontSize:"5vh", marginRight:"2vw", cursor:"pointer"}}>&#10006;</h4>
        </div>
  <div className="flex">
    
    <center>
    <div className="main">
      <img
        src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/${info["Sub Category"]}/${sku}/${selected}`}
        alt="this"
      />
      
    </div>
    </center>
  <div className="other">
    
  <img 
      src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/${info["Sub Category"]}/${sku}/main.jpg`}
      className={`/main.jpg` === selected ? "selected" : "notselected"}
      onClick={e=>setSelected(`/main.jpg`)} /> 
  {imgPaths.map((ele, index) => (
    <img
      key={index}
      src={`https://raw.githubusercontent.com/mdrayaanpasha/api-sc/main/public/img/sofa/${info["Sub Category"]}/${sku}/${ele}`}
      className={`/${ele}` === selected ? "selected" : "notselected"}
      onClick={e=>setSelected(`/${ele}`)}
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
  