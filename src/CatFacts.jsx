import { useState,useEffect } from "react";

const CatAPI = "https://catfact.ninja/fact"

export default function CatFacts(){
    const [facts,setFacts] = useState([])
    const fetchFacts = async () =>{
        const response = await fetch(CatAPI)
        .then(data => data.json())
        console.log(response);
        setFacts(response.fact)
    }
useEffect(() =>{
    fetchFacts();
},[])
    return(
        <div>
            <h2>Some Ninja Cat Facts!</h2>
            <h3>{facts}</h3>
            <button onClick={fetchFacts}>Get some CatFacts!</button>
        </div>
    )
}