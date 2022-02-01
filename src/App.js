import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';

function App() {
  return (
    <Router>
      <Navbar />
      <main className='container pt-5'>
        <Routes>
          <Route path="/customerspage" element={<CustomersPageWithPagination />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
