import { useState } from "react";

export default function useStack(initialItems = []) {
  const [items, setItems] = useState(initialItems);

  function push(item) {
    setItems([...items, item]);
  }

  function pop() {
    if (isEmpty()) {
      return "Stack is empty";
    }
    const poppedItem = items[items.length - 1];
    setItems(items.slice(0, items.length - 1));
    return poppedItem;
  }

  function peek() {
    if (isEmpty()) {
      return "Stack is empty";
    }
    return items[items.length - 1];
  }

  function isEmpty() {
    return items.length === 0;
  }

  function size() {
    return items.length;
  }

  function clear() {
    setItems([]);
  }

  function getItems() {
    return items;
  }

  return { push, pop, peek, isEmpty, size, clear, getItems };
}
