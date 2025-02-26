import React, { useState } from 'react';
import axios from 'axios';
import './NewsForm.css';

function NewsForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [keywords, setKeywords] = useState('');

    const handleSummarize = async () => {
        if (!content) {
            alert("Inserisci un testo da riassumere!");
            return;
        }
        try {
            const response = await axios.post("https://news-portal-backend-zly25gidqq-ew.a.run.app/synthesize", { text: content });
            setContent(response.data.summary);
        } catch (error) {
            console.error("Errore durante il riassunto:", error);
            alert("Si è verificato un errore durante il riassunto.");
        }
    };

    const handleCheckGrammar = async () => {
        if (!content) {
            alert("Inserisci un testo da correggere!");
            return;
        }
        try {
            const response = await axios.post("https://news-portal-backend-zly25gidqq-ew.a.run.app/check_grammar", { text: content });
            setContent(response.data.corrected_text);
        } catch (error) {
            console.error("Errore durante la correzione grammaticale:", error);
            alert("Si è verificato un errore durante la correzione grammaticale.");
        }
    };

    const handleGenerateKeywords = async () => {
        if (!content) {
            alert("Inserisci una notizia per generare le parole chiave!");
            return;
        }
        try {
            const response = await axios.post("https://news-portal-backend-zly25gidqq-ew.a.run.app/generate_labels", { text: content });
            setKeywords(response.data.labels.join(", "));
        } catch (error) {
            console.error("Errore durante la generazione delle parole chiave:", error);
            alert("Si è verificato un errore durante la generazione delle parole chiave.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Titolo e notizia sono obbligatori per la pubblicazione!");
            return;
        }
    
        try {
            const response = await axios.post("https://news-portal-backend-zly25gidqq-ew.a.run.app/publish_news", {
                title,
                content,
                keywords
            });
    
            if (response.status === 201) {
                alert("Notizia pubblicata con successo!");
                setTitle('');
                setContent('');
                setKeywords('');
            }
        } catch (error) {
            console.error("Errore durante la pubblicazione:", error);
            alert("Si è verificato un errore durante la pubblicazione.");
        }
    };
    

    return (
        <div className="NewsForm">
            <h2>Pubblica una nuova notizia</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titolo:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Notizia:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Immagine:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="keywords">Parole chiave:</label>
                    <input
                        type="text"
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="Le parole chiave saranno generate qui"
                    />
                </div>
                <div className="buttons-group">
                    <button type="button" className="action-btn" onClick={handleSummarize}>Riassumi</button>
                    <button type="button" className="action-btn" onClick={handleCheckGrammar}>Correggi</button>
                    <button type="button" className="action-btn" onClick={handleGenerateKeywords}>Genera parole chiave</button>
                </div>
                <button type="submit" className="submit-btn">Pubblica</button>
            </form>
        </div>
    );
}

export default NewsForm;



