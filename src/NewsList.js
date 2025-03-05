import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewsList() {
    const [news, setNews] = useState([]);

    // Funzione per caricare le notizie
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get("https://news-portal-backend-zly25gidqq-ew.a.run.app/news");
            setNews(response.data.news);
        } catch (error) {
            console.error("Errore nel recupero delle notizie:", error);
        }
    };

    // Funzione per eliminare una notizia con conferma
    const handleDelete = async (newsId) => {
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questa notizia?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://news-portal-backend-zly25gidqq-ew.a.run.app/delete_news/${newsId}`);
            alert("Notizia eliminata con successo!");
            fetchNews(); // Ricarica la lista dopo la cancellazione
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error);
            alert("Si è verificato un errore durante l'eliminazione.");
        }
    };

    return (
        <div className="NewsList">
            <h2>Elenco notizie</h2>
            {news.length === 0 ? (
                <p>Nessuna notizia disponibile.</p>
            ) : (
                news.map((article) => (
                    <div key={article.id} className="news-item">
                        <button className="delete-btn" onClick={() => handleDelete(article.id)}>X</button>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        {article.image_url && <img src={article.image_url} alt="Notizia" className="news-image" />}
                        <p><strong>Parole chiave:</strong> {article.keywords.join(", ")}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default NewsList;

