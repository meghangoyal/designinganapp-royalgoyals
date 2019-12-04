// Setting up the variables and the game
let canvas = document.getElementById('ttt'),
    ctx = canvas.getContext('2d'),
    msg = document.getElementById('message'),
    mouse = {
      x: -1,
      y: -1,
    },
    cellSize = 180;
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    xPlayer = "Pink",
    oPlayer = "Gold",
    iter = 0,
    round = 0,
    currentPlayer = xPlayer,
    gameOver = false;
canvas.width = canvas.height = 4*cellSize;
ctx.lineCap = "round";

canvas.addEventListener('mouseout', function() {
  mouse.x = mouse.y = -1;
});

canvas.addEventListener('mousemove', function(e){
  let x = e.pageX - canvas.offsetLeft,
      y = e.pageY - canvas.offsetTop;

  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener('click', function(e) {
  x = Math.floor(mouse.x/180);
  y = Math.floor(mouse.y/180);
  play(x+y*4);
  console.log("X: " + x + "Y: " + y + "Math: " + (x+y*4));
});

function play(cell){
  if(gameOver){
    reset();
    gameOver=false;
    currentPlayer="Pink";
    document.getElementById("xWinner").classList.add('d-none');
    document.getElementById("oWinner").classList.add('d-none');
  }
  if (board[cell]=="Pink"||board[cell]=="Gold"){
    currentPlayer=currentPlayer;
  }
  else{
    board[cell]=currentPlayer;
    if (currentPlayer=="Pink"){
      currentPlayer="Gold";
    }
    else{
      currentPlayer="Pink";
    }
  }
  console.log(board);
  // checkRow(cell);
  // checkCol(cell);
  // checkDiag(cell);
}

function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
}

function draw () {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBoard();
  fillBoard();

  function drawBoard() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(cellSize, 0);
    ctx.lineTo(cellSize, canvas.height);
    ctx.stroke();

    ctx.moveTo(2*cellSize, 0);
    ctx.lineTo(2*180, canvas.height);
    ctx.stroke();

    ctx.moveTo(3*cellSize, 0);
    ctx.lineTo(3*180, canvas.height);
    ctx.stroke();

    ctx.moveTo(0, cellSize);
    ctx.lineTo(canvas.width, cellSize);
    ctx.stroke();

    ctx.moveTo(0, 2*180);
    ctx.lineTo(canvas.width, 2*180);
    ctx.stroke();

    ctx.moveTo(0, 3*180);
    ctx.lineTo(canvas.width, 3*180);
    ctx.stroke();
  }

  function fillBoard () {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 25;
    for(let i = 0; i < board.length; i++){
      let coords = getCellCoords(i);

      ctx.save();
      ctx.translate(coords.x + cellSize/2, coords.y + cellSize/2);
      if(board[i] == "Pink"){
        ctx.strokeStyle = 'pink';
        drawPink();
      }
      if(board[i] == "Gold"){
        ctx.strokeStyle = 'gold';
        drawGold();
      }
      ctx.restore();
    }
  }

  function drawPink(){
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, Math.PI*2);
    ctx.stroke();
  }

  function drawGold() {
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, Math.PI*2);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

function getCellCoords(cell){
  let x = (cell % 4) * cellSize;
      y = Math.floor(cell/4) * cellSize;

  return {
      'x' : x,
      'y' : y,
  };
}

draw();
