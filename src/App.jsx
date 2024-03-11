import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';

import { EmailDetails } from './cmps/EmailDetails';
import { EmailListContainer } from './cmps/EmailListContainer';
import { UserMsg } from './cmps/UserMsg';

export function App() {
  return (
    <section className="main-app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/email" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/email" element={<EmailIndex />}>
            <Route index element={<Navigate to={'/email/inbox'} />} />
            <Route path="/email/:folder" element={<EmailListContainer />} />
            <Route path="/email/:folder/:emailId" element={<EmailDetails />} />
          </Route>
        </Routes>
      </Router>
      <UserMsg />
    </section>
  );
}
