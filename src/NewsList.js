import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get("https://news-portal-backend-zly25gidqq-ew.a.run.app/news")
            .then(response => {
                setNews(response.data.news);
            })
            .catch(error => {
                console.error("Errore nel recupero delle notizie:", error);
            });
    }, []);

    return (
        <div>
            <h2>Notizie pubblicate</h2>
            {news.length === 0 ? (
                <p>Non ci sono notizie disponibili.</p>
            ) : (
                news.map((article, index) => (
                    <div key={index} className="news-item">
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <p><strong>Keywords:</strong> {article.keywords}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default NewsList;

