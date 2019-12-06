// Setting up the variables and the game
let canvas = document.getElementById('ttt'),
    ctx = canvas.getContext('2d'),
    msg = document.getElementById('message'),
    mouse = {
      x: -1,
      y: -1,
    },
    cellSize = 70;
var board=[0],
//var board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    xPlayer = "Pink",
    oPlayer = "Gold",
    iter = 0,
    round = 0,
    currentPlayer = xPlayer,
    gameOver = false;
for (i=1;i<64;i++){
      board.push(i);
}
console.log(board);
canvas.width = canvas.height = 8*cellSize;
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
  x = Math.floor(mouse.x/70);
  y = Math.floor(mouse.y/70);
  play(x);
  console.log("X: " + x + "Y: " + y);
});

function play(x){
  if(gameOver){
    reset();
    gameOver=false;
    currentPlayer="Pink";
    document.getElementById("xWinner").classList.add('d-none');
    document.getElementById("oWinner").classList.add('d-none');
  }
  var row=8*7;
  var filled=true;
  var cell=x;
  while (row>=0 && filled){
    cell=x+row;
    if (board[cell]=="Pink"||board[cell]=="Gold"){
      filled=true;
    }
    else{
      filled=false;
      board[cell]=currentPlayer;
    }
    row=row-8;
  }
  if (filled){
    console.log("This column is filled");
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
  console.log("Cell: "+cell);
  checkRow(cell);
  // checkCol(cell);
  // checkDiag(cell);
}

function checkRow(cell){
  var start=cell-x;
  var end=cell-x+7;
  for (var i=start; i<=end-3; i++){
    if (board[i]==board[i+1]&&board[i]==board[i+2]&&board[i]==board[i+2]&&board[i]==board[i+3]){
      gameOver=true;
    }
  }
}

function reset() {
  round = 0;
  board = [0];
  for (i=1;i<64;i++){
    board.push(i);
  }
}

function draw () {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBoard();
  fillBoard();

  function drawBoard() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 7;
    ctx.beginPath();

    for (i=1; i<=8; i++){
      ctx.moveTo(i*cellSize, 0);
      ctx.lineTo(i*cellSize, canvas.height);
      ctx.stroke();

      ctx.moveTo(0, i*cellSize);
      ctx.lineTo(canvas.width, i*cellSize);
      ctx.stroke();
    }


    // ctx.moveTo(cellSize, 0);
    // ctx.lineTo(cellSize, canvas.height);
    // ctx.stroke();
    //
    // ctx.moveTo(2*cellSize, 0);
    // ctx.lineTo(2*cellSize, canvas.height);
    // ctx.stroke();
    //
    // ctx.moveTo(3*cellSize, 0);
    // ctx.lineTo(3*cellSize, canvas.height);
    // ctx.stroke();
    //
    // ctx.moveTo(0, cellSize);
    // ctx.lineTo(canvas.width, cellSize);
    // ctx.stroke();
    //
    // ctx.moveTo(0, 2*cellSize);
    // ctx.lineTo(canvas.width, 2*cellSize);
    // ctx.stroke();
    //
    // ctx.moveTo(0, 3*cellSize);
    // ctx.lineTo(canvas.width, 3*cellSize);
    // ctx.stroke();
  }

  function fillBoard () {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
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
  let x = (cell % 8) * cellSize;
      y = Math.floor(cell/8) * cellSize;

  return {
      'x' : x,
      'y' : y,
  };
}

draw();
