import axios from "axios"
import { useEffect } from "react"

function Dummy(){
    useEffect(()=>{
        const fet = async()=>{
            const d = await axios.get("http://localhost:3000/Dummy");
        }
        fet();
    })
    return(
        <p>Hello world!</p>
    )
}

export default Dummy