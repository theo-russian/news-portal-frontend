import React, { useState, useEffect } from 'react';
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
        <div className="NewsList">
            <h2>Elenco Notizie</h2>
            {news.length === 0 ? (
                <p>Nessuna notizia disponibile.</p>
            ) : (
                news.map((article, index) => (
                    <div key={index} className="news-item">
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        {article.image_url && (
                            <img src={article.image_url} alt="Notizia" className="news-image" />
                        )}
                        <p><strong>Parole chiave:</strong> {article.keywords}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default NewsList;

