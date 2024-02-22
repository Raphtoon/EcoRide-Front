import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';

// Creation d'un composant stateless qui contient notre système de root
const Root = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                {/* Pour les routes par défault on mettra un path global ("*") */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
export default Root