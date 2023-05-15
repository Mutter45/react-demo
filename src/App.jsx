import { useState } from "react";
import MyButton from "./components/MyButton";
import ShoppingList from "./components/ShoppingList";
import Game from "./components/Game";

function App() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
    <>
    <div className=" flex flex-col items-center">
    <ShoppingList></ShoppingList>
    <MyButton count={count} onClick={handleClick}></MyButton>
    <MyButton count={count} onClick={handleClick}></MyButton>
    <Game/>
    </div>
   
    </>
  );
}

export default App;
