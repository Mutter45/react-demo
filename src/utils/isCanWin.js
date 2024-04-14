const SPACE = 20 * devicePixelRatio;
let historyArr = [],
  board = [],
  player = "",
  winArr = [];

// 判断是否胜利
export default function isCanWin(history, boardPoint, curPlayer) {
  historyArr = history;
  board = boardPoint;
  player = curPlayer;
  if (horizontal() || vertical() || diagonal() || oppositeDiagonal()) {
    return {
      result: "win",
      winArr: [...winArr, board].filter((item) => item[0]).sort(),
    };
  }
  winArr = [];
  return {
    result: "error",
  };
}
function findPoint([x, y]) {
  return historyArr.find(
    (item) => item.color === player && item.point[0] === x && item.point[1] === y
  )?.point;
}
function setCount(getX, getY) {
  let count = 0;
  let [curX, curY] = board;
  while (count < 5 && (curX !== undefined || curY !== undefined)) {
    [curX, curY] = findPoint([getX(curX), getY(curY)]) ?? [];
    winArr.push([curX, curY]);
    count++;
  }
  return count;
}
/** 水平 */
function horizontal() {
  return setCount(
    (argX) => argX + SPACE,
    (argY) => argY
  ) +
    setCount(
      (argX) => argX - SPACE,
      (argY) => argY
    ) >
    5
    ? true
    : false;
}

/** 竖线 */
function vertical() {
  return setCount(
    (argX) => argX,
    (argY) => argY + SPACE
  ) +
    setCount(
      (argX) => argX,
      (argY) => argY - SPACE
    ) >
    5
    ? true
    : false;
}
/** 对角线 */
function diagonal() {
  return setCount(
    (argX) => argX + SPACE,
    (argY) => argY - SPACE
  ) +
    setCount(
      (argX) => argX - SPACE,
      (argY) => argY + SPACE
    ) >
    5
    ? true
    : false;
}
/** 反对角线 */
function oppositeDiagonal() {
  return setCount(
    (argX) => argX - SPACE,
    (argY) => argY - SPACE
  ) +
    setCount(
      (argX) => argX + SPACE,
      (argY) => argY + SPACE
    ) >
    5
    ? true
    : false;
}
