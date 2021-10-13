import React, { useState, useEffect } from 'react'

function News() {

    const [news, setNews] = useState([]);

    const fetchNews = (path) => {
        fetch(path)
            .then(response => {
                console.log(response.json());
                setNews(response.articles)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const fetchingPath = "https://newsapi.org/v2/everything?q=tesla&from=2021-07-22&sortBy=publishedAt&apiKey=dcda989a9bbf47d08951d27028a58a63";
        fetchNews(fetchingPath);
    }, [])

    return (
        <div>
            <h1>News will be shown soon....</h1>
            {/* {news.map(val=>(
                <h1>val</h1>
            ))} */}
        </div>
    )
}

export default News
