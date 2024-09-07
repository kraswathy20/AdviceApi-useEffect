import { useState,useEffect } from "react";

const adviceAPI = 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand';

export default function Advice(){
    const [advice,setAdvice] = useState([])
    const [curradvice,setCurradvice] = useState('')

    useEffect(()=>{
        fetchApi();
      },[])
        
    const fetchApi = async () =>{
        const response = await fetch(adviceAPI).then(data => data.json())
        setAdvice(response)
        pickRandom(response);
    }

    function pickRandom(jsonresponse = advice){
        if(jsonresponse.length > 0){
            const rand = Math.floor(Math.random() * jsonresponse.length )
            setCurradvice(jsonresponse[rand].content.rendered);
        }
     
    }
    return(
        <div>
            <h2>Please Listen!</h2>
            <h3 dangerouslySetInnerHTML={{__html : curradvice}}></h3>
            <button onClick={fetchApi}>Get me an Advice Please!</button>
        </div>
    )
}