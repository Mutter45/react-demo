import { useRef, useEffect } from 'react'
import isCanWin from '../utils/isCanWin'
import useStack from '../hooks/useStack'
const SPACE = 20 * devicePixelRatio
const SIZE = 300 * devicePixelRatio
const PositionArr = []
export default function Backgammon() {
  /** 用于记录点击的点 */
  const historyStack = useStack([])
  /** 用于记录撤销的操作 */
  const regretStack = useStack([])
  const canvasRef = useRef(null)
  function isWin() {
    if (historyStack.isEmpty()) return
    const { result, winArr } = isCanWin(
      historyStack.getItems(),
      historyStack.peek().point,
      historyStack.peek().color,
    )
    if (result === 'win') {
      console.log(winArr)
      status = `恭喜你${historyStack.peek().color}，获胜了！`
    }
    return result === 'win'
  }
  function drawLine(ctx, moveTo, lineTo) {
    ctx.beginPath()
    ctx.moveTo(...moveTo)
    ctx.lineTo(...lineTo)
    ctx.closePath()
    ctx.strokeStyle = '#333'
    ctx.stroke()
  }
  // 定义点击事件处理函数
  function handleClick(event) {
    const x = event.clientX - canvasRef.current.offsetLeft
    const y = event.clientY - canvasRef.current.offsetTop
    // 打印鼠标在Canvas内部的位置
    setPoint(x, y)
  }
  function handRegret() {
    if (historyStack.size() === 0) {
      console.log('无法进行悔棋')
      return
    }
    regretStack.push(historyStack.pop())
  }
  function handCancel() {
    if (regretStack.size() === 0) {
      console.log('没有可撤销的步骤')
      return
    }
    historyStack.push(regretStack.pop())
  }
  function drawChess(point, color) {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const radius = SPACE / 2 - 2
    // 开始路径并绘制圆
    ctx.beginPath()
    ctx.arc(...point, radius, 0, 2 * Math.PI)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = ctx.shadowOffsetY = SPACE * 0.05
    const gradient = ctx.createRadialGradient(...point, 0, ...point, SPACE * 0.4)
    gradient.addColorStop(0, color === 'black' ? '#707070' : 'white')
    gradient.addColorStop(1, color === 'black' ? 'black' : '#d5d8dc')
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.closePath()
  }
  function findPoint(x, y) {
    /** 可以优化调整 */
    const curX = PositionArr.reduce(
      (prev, cur) => (Math.abs(cur - x) < Math.abs(prev - x) ? cur : prev),
      Infinity,
    )
    /** 可以优化调整 */
    const curY = PositionArr.reduce(
      (prev, cur) => (Math.abs(cur - y) < Math.abs(prev - y) ? cur : prev),
      Infinity,
    )
    return [curX, curY]
  }
  function setPoint(x, y) {
    const [curX, curY] = findPoint(x, y)
    // 判断是否重复点击
    if (historyStack.getItems().some((item) => item.point[0] === curX && item.point[1] === curY)) {
      console.log('重复点击')
      return
    }
    historyStack.push({
      point: [curX, curY],
      color: historyStack.peek().color === 'black' ? 'white' : 'black',
    })
    /** 清空已经记录的操作 */
    if (regretStack.size()) regretStack.clear()
  }
  ;(function setPositionArr() {
    for (let i = SPACE / 2; i < SIZE; i += SPACE) {
      PositionArr.push(i)
    }
  })()
  function drawChessGame() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    /**清除画布 */
    ctx.clearRect(0, 0, SIZE, SIZE)
    for (let i = SPACE / 2; i < SIZE; i += SPACE) {
      drawLine(ctx, [i, SPACE / 2], [i, SIZE - SPACE / 2])
      drawLine(ctx, [SPACE / 2, i], [SIZE - SPACE / 2, i])
    }
    historyStack.getItems().forEach((item, index) => {
      drawChess(item.point, index % 2 === 0 ? 'black' : 'white')
    })
  }
  let status = 'Next player: ' + (historyStack.size() % 2 === 0 ? 'black' : 'white')
  isWin() && (status = `恭喜你${historyStack.peek().color}，获胜了！`)
  // 绘制棋盘格
  useEffect(() => {
    drawChessGame()
  })

  return (
    <>
      <div>{status}</div>
      <div className="flex justify-center items-center">
        <canvas
          width={SIZE}
          height={SIZE}
          ref={canvasRef}
          className=" bg-[#dbcb8c]"
          onClick={handleClick}
        ></canvas>
        <div className="ml-2 flex flex-col">
          <button className="p-2 border border-blue-300  rounded-md mb-2" onClick={handRegret}>
            悔棋
          </button>
          <button className="p-2 border border-blue-300  rounded-md" onClick={handCancel}>
            撤销
          </button>
        </div>
      </div>
    </>
  )
}
