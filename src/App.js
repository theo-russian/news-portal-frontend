import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import NewsForm from './NewsForm';
import NewsList from './NewsList';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">MR Sports News</h1>
                    <nav>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/news" className="nav-link">Notizie</Link>
                    </nav>
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" element={<NewsForm />} />
                        <Route path="/news" element={<NewsList />} />
                    </Routes>
                </main>
                <footer className="App-footer">
                    <p>&copy; 2025 MR Sports News. Tutti i diritti riservati.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;


