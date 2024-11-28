import { useEffect, useState } from "react";
import NewsItems from "./NewsItems";

const test = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchData = async (retryAttempt = 0) => {
            try {
                const url = `https://newsdata.io/api/1/latest?apikey=pub_605816548cb8e7379e3ed5103792fabfcea86&q=mental%20health&sentiment=negative`;

                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 429 && retryAttempt < 3) {
                        // If rate limit error and retry attempt is less than 3, retry with exponential backoff
                        const waitTime = Math.pow(2, retryAttempt) * 1000;
                        setTimeout(() => fetchData(retryAttempt + 1), waitTime);
                        return;
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API response:", data);
                if (data.results) {
                    setArticles(data.results);
                    console.log("Articles:", data.results);
                } else {
                    setArticles([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setArticles([]);
            }
        };

        fetchData();

    }, [category]);

    return (
        <div className="text-center">
            <h2 className="text-center">
                <span className="badge bg-danger mt-2">Breaking News!!!</span>
            </h2>
            {error ? (
                <p>Error fetching news: {error}</p>
            ) : articles.length > 0 ? (
                articles.map((news, index) => (
                    <NewsItems
                        key={index}
                        title={news.title}
                        description={news.description}
                        src={news.image_url}
                        url={news.link}
                    />
                ))
            ) : (
                <p>No news available</p>
            )}
        </div>
    );
};

export default test;
