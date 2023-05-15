import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import TicTacToe from './views/TicTacToe';

function App() {
  return (
    <>
      <nav className=" flex justify-center mb-4">
        <Link to="/" className="mr-2">
          首页
        </Link>
        <Link to="/TicTacToe">TicTacToe</Link>
      </nav>
      <div className=" flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/TicTacToe" element={<TicTacToe />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
