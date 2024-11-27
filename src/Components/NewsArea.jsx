import { useEffect, useState } from "react"
import NewsItems from "./NewsItems";

const NewsArea = ( {category} ) => {
    const [articles,setArticles] = useState([]);

    useEffect(()=>{
        let url= `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.articles){
                setArticles(data.articles)       
            }else {
                setArticles([])
            }
        })
        .catch(error =>{
            console.error("Error fetching data: ", error)
            setArticles([])
        })        
        
                
    },[category])



  return (
    <div className="text-center">
        <h2 className="text-center">
            <span className="badge bg-danger mt-2">Breaking News!!!</span>
        </h2>
        {articles.length > 0 ? ( 
	articles.map((news, index) => { 
		return ( 
			<NewsItems
				key={index} 
				title={news.title} 
				description={news.description} 
				src={news.urlToImage} 
				url={news.url}
			/>
		);
	})
) : (
	<p>No news available</p>
)}
    </div>
  )
}

export default NewsArea


