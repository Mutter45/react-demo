export default function Square({ value, onSquareClick }) {
  return (
    <span
      data-num={value}
      onClick={onSquareClick}
      className=" flex justify-center items-center text-red-400 h-[33.33%] w-[33.33%] border border-red-400"
    >
      {value}
    </span>
  )
}
