import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <main className='container pt-5'>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
