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
  x = Math.floor((mouse.x+15)/70);
  y = Math.floor(mouse.y/70);
  console.log("mouse.x: "+ mouse.x+ " mouse.y: "+ mouse.y);
  console.log("x: "+x+" y: "+y);
  play(x);
});

var pinkWins=0;
var goldWins=0;
var pinkScores="Pink: "+ pinkWins;
var goldScores="Gold: "+ goldWins;
document.getElementById("pinkScore").innerHTML=pinkScores;
document.getElementById("goldScore").innerHTML=goldScores;

function play(x){
  if(gameOver){
    reset();
    gameOver=false;
    currentPlayer="Pink";
    document.getElementById("pinkWinner").classList.add('d-none');
    document.getElementById("goldWinner").classList.add('d-none');
  }
  var row=7;
  var filled=true;
  var cell=x;
  while (row>=0 && filled){
    cell=x+row*8;
    if (board[cell]=="Pink"||board[cell]=="Gold"){
      filled=true;
    }
    else{
      filled=false;
      board[cell]=currentPlayer;
    }
    row=row-1;
  }
  y=row+1;
  if (filled){
    console.log("This column is filled");
  }
  else{
    board[cell]=currentPlayer;
    switchPlayer();
  }
  console.log("Cell: "+cell);
  checkRow(cell);
  checkCol(cell);
  checkDiag(cell);
}

function switchPlayer(){
  if (currentPlayer=="Pink"){
    currentPlayer="Gold";
  }
  else{
    currentPlayer="Pink";
  }
}

function checkRow(cell){
  var start=cell-x;
  var end=cell-x+7;
  for (var i=start; i<=end-3; i++){
    if (board[i]==board[i+1]&&board[i]==board[i+2]&&board[i]==board[i+2]&&board[i]==board[i+3]){
      declareWinner();
      switchPlayer();
      console.log(currentPlayer+" Wins!");
      gameOver=true;
    }
  }
}

function checkCol(cell){
  var start=x;
  var end=x+56;
  for (var i=start; i<=end-24; i+=8){
    if (board[i]==board[i+8]&&board[i]==board[i+16]&&board[i]==board[i+24]){
      declareWinner();
      switchPlayer();
      console.log(currentPlayer+" Wins!");
      gameOver=true;
    }
  }
}

function checkDiag(cell){
  console.log("Coords (x  y): "+x+" "+y);
  //Check First Diagonal (Top Left to Bottom Right)
  while (x>0&&y>0){
    x=x-1;
    y=y-1;
  }
  start=x+y*8;
  while(x<7&&y<7){
    x+=1;
    y+=1;
  }
  end=x+y*8;
  var diff=end-start;
  if (diff/9<3){
    currentPlayer=currentPlayer;
  }
  else{
    for (var i=start; i<=end-27; i++){
      if (board[i]==board[i+9]&&board[i]==board[i+18]&&board[i]==board[i+27]){
        declareWinner();
        switchPlayer();
        console.log(currentPlayer+" Wins!");
        gameOver=true;
      }
    }
  }
  //Check Second Diagonal (Bottom Left to Top Right)
  while (x>0&&y<7){
    x=x-1;
    y=y+1;
  }
  end=x+y*8;
  while(x<7&&y>0){
    x+=1;
    y-=1;
  }
  start=x+y*8;
  var diff=end-start;
  if (diff/7<3){
    currentPlayer=currentPlayer;
  }
  else{
    for (var i=start; i<=end-21; i++){
      if (board[i]==board[i+7]&&board[i]==board[i+14]&&board[i]==board[i+21]){
        declareWinner();
        switchPlayer();
        console.log(currentPlayer+" Wins!");
        gameOver=true;
      }
    }
  }
}

function declareWinner(){
  if (currentPlayer=="Pink"){
    goldWins++;
    document.getElementById("goldWinner").classList.remove('d-none');
  }
  else{
    pinkWins++;
    document.getElementById("pinkWinner").classList.remove('d-none');
  }
  pinkScores="Pink: "+ pinkWins;
  goldScores="Gold: "+ goldWins;
  document.getElementById("pinkScore").innerHTML=pinkScores;
  document.getElementById("goldScore").innerHTML=goldScores;
  gameOver=true;
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
