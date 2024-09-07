// import { useState } from "react";

// const fetchApi = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand"


// export default function QuoteFetcher(){
//     const [catfact,setCatfact] = useState([])
//    async function fetchQuotes(){
//     const response = await fetch(fetchApi)
//     const jsonResponse = await response.json()
//     setCatfact(jsonResponse)
//     console.log(catfact);
    
//    }
// // const fetchQuotes = async() =>{
// //     const response = await fetch(fetchApi)
// //     .then(data => data.json())
// //     console.log(response);
// //     setCatfact(response)
// // }
//     return(
//         <div>
//             <h2>Some Ninja Cat Facts.</h2>
//             <div>
//                 {catfact.map((cont,idx)=>(
                    
//                     <p key={idx} dangerouslySetInnerHTML={{__html:cont.content}}></p>
//                     ))}
//             </div>
//             <button onClick={fetchQuotes}>Get the Quotes</button>
//         </div>
//     )
// }
import { useState, useEffect } from "react";

const fetchApi = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";

export default function QuoteFetcher() {
    const [quotes, setQuotes] = useState([]); // Stores all fetched quotes
    const [currentQuote, setCurrentQuote] = useState(''); // Stores the currently displayed quote

    useEffect(() => {
        fetchQuotes();
    }, []); // Empty dependency array to ensure it runs once after component mounts

    // Fetch all quotes once and store them
    async function fetchQuotes() {
        try {
            const response = await fetch(fetchApi);
            const jsonResponse = await response.json();
            setQuotes(jsonResponse); // Store all quotes
            pickRandomQuote(jsonResponse); // Pick a random quote to display initially
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
        }
    }

    // Pick a random quote from stored quotes
    function pickRandomQuote(fetchedQuotes = quotes) {
        if (fetchedQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * fetchedQuotes.length);
            setCurrentQuote(fetchedQuotes[randomIndex].content.rendered);
        }
    }

    return (
        <div>
            <h2>Some Ninja Cat Facts.</h2>
            <div dangerouslySetInnerHTML={{ __html: currentQuote }} />
            <button onClick={() => pickRandomQuote()}>Get a Random Quote</button>
        </div>
    );
}

