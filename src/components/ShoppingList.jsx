const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
]

export default function ShoppingList() {
  function handleClick(id) {
    console.log(id)
  }
  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen',
      }}
      onClick={() => {
        handleClick(product.id)
      }}
    >
      {product.title}
    </li>
  ))

  return <ul>{listItems}</ul>
}
