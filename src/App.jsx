import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';

export function App() {
  return (
    <section className="main-app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/mail" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/mail" element={<EmailIndex />} />
        </Routes>
      </Router>
    </section>
  );
}
