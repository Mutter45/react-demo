import { useState } from 'react';
import MyButton from '../components/MyButton';
import ShoppingList from '../components/ShoppingList';
export default function Home() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <>
      <ShoppingList></ShoppingList>
      <MyButton count={count} onClick={handleClick}></MyButton>
      <MyButton count={count} onClick={handleClick}></MyButton>
    </>
  );
}
