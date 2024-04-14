import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import TicTacToe from "./views/TicTacToe";
import Backgammon from "./views/Backgammon";

function App() {
  return (
    <>
      <nav className="flex justify-center mb-4">
        <Link to="/" className="mr-2">
          首页
        </Link>
        <Link to="/TicTacToe" className="mr-2">
          TicTacToe
        </Link>
        <Link to="/Backgammon" className="text-blue-400">
          Backgammon
        </Link>
      </nav>
      <div className=" flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/TicTacToe" element={<TicTacToe />}></Route>
          <Route path="/Backgammon" element={<Backgammon />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
