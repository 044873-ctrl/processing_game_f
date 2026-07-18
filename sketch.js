const CELL=50;
const ROWS=8;
const COLS=8;
let board=[];
const DIRS=[[ -1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
let turn=1;
let gameOver=false;
function setup(){createCanvas(400,400);initBoard();textAlign(CENTER,CENTER);textSize(16);}
function initBoard(){for(let r=0;r<ROWS;r++){board[r]=[];for(let c=0;c<COLS;c++){board[r][c]=0;}}board[3][3]=2;board[4][4]=2;board[3][4]=1;board[4][3]=1;turn=1;gameOver=false;}
function draw(){background(34,139,34);drawGrid();drawPieces();if(!gameOver){let moves=getValidMoves(1);if(moves.length>0&&turn===1)drawHints(moves);}else{let s=getScore();let winner=(s.black>s.white? 'Black': s.white>s.black? 'White':'Draw');fill(255);textSize(24);text(winner+' '+s.black+':'+s.white,width/2,height/2);}}
function drawGrid(){stroke(0);for(let i=0;i<=COLS;i++){line(i*CELL,0,i*CELL,height);}for(let j=0;j<=ROWS;j++){line(0,j*CELL,width,j*CELL);}}
function drawPieces(){noStroke();for(let r=0;r<ROWS;r++){for(let c=0;c<COLS;c++){let v=board[r][c];let x=c*CELL+CELL/2;let y=r*CELL+CELL/2;if(v===1){fill(0);ellipse(x,y,CELL-6,CELL-6);}else if(v===2){fill(255);ellipse(x,y,CELL-6,CELL-6);}}}}
function drawHints(moves){noStroke();fill(255,255,255,150);for(let i=0;i<moves.length;i++){let m=moves[i];let x=m.c*CELL+CELL/2;let y=m.r*CELL+CELL/2;ellipse(x,y,10,10);}}
function mouseClicked(){if(gameOver)return;let c=floor(mouseX/CELL);let r=floor(mouseY/CELL);if(r<0||r>=ROWS||c<0||c>=COLS)return;if(turn!==1)return;let flips=getFlips(r,c,1);if(flips.length===0)return;makeMove(r,c,1,flips);turn=2;processPostMove();}
function processPostMove(){if(isGameOver()){gameOver=true;return;}let movesWhite=getValidMoves(2);if(movesWhite.length===0){turn=1;return;}let bestMoves=[];let best= -1;for(let i=0;i<movesWhite.length;i++){let len=movesWhite[i].flips.length;if(len>best){best=len;bestMoves=[movesWhite[i]];}else if(len===best){bestMoves.push(movesWhite[i]);}}let choice=bestMoves[floor(random(bestMoves.length))];makeMove(choice.r,choice.c,2,choice.flips);if(isGameOver()){gameOver=true;return;}let movesBlack=getValidMoves(1);if(movesBlack.length===0){turn=2;return;}turn=1;}
function getFlips(r,c,player){let out=[];if(board[r][c]!==0)return out;let opp=(player===1?2:1);for(let d=0;d<DIRS.length;d++){let dr=DIRS[d][0];let dc=DIRS[d][1];let rr=r+dr;let cc=c+dc;let line=[];while(rr>=0&&rr<ROWS&&cc>=0&&cc<COLS&&board[rr][cc]===opp){line.push([rr,cc]);rr+=dr;cc+=dc;}if(line.length>0&&rr>=0&&rr<ROWS&&cc>=0&&cc<COLS&&board[rr][cc]===player){for(let k=0;k<line.length;k++){out.push(line[k]);}}}return out;}
function getValidMoves(player){let res=[];for(let r=0;r<ROWS;r++){for(let c=0;c<COLS;c++){if(board[r][c]!==0)continue;let flips=getFlips(r,c,player);if(flips.length>0){res.push({r:r
