//import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './components/Board.jsx';
import './styles/kanband.css';

function Kanband() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Board />} />
        </Routes>
      </Router>
    </>
  );
}

export default Kanband;
