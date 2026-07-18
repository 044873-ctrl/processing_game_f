const CELL=30
const COLS=10
const ROWS=20
let board=[]
let SHAPES=[]
SHAPES.push([[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]])
SHAPES.push([[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]])
SHAPES.push([[[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,0,0],[0,1,1,0],[0,1,0,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,0],[0,1,0,0]],[[0,0,0,0],[0,1,0,0],[1,1,0,0],[0,1,0,0]]])
SHAPES.push([[[0,0,0,0],[0,0,1,0],[1,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,0,0],[0,1,0,0],[0,1,1,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,0],[1,0,0,0]],[[0,0,0,0],[1,1,0,0],[0,1,0,0],[0,1,0,0]]])
SHAPES.push([[[0,0,0,0],[1,0,0,0],[1,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[0,1,0,0],[0,1,0,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,0],[0,0,1,0]],[[0,0,0,0],[0,1,0,0],[0,1,0,0],[1,1,0,0]]])
SHAPES.push([[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],[[0,0,0,0],[0,1,0,0],[0,1,1,0],[0,0,1,0]],[[0,0,0,0],[0,0,0,0],[0,1,1,0],[1,1,0,0]],[[0,0,0,0],[1,0,0,0],[1,1,0,0],[0,1,0,0]]])
SHAPES.push([[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,0,0],[1,1,0,0],[1,0,0,0]],[[0,0,0,0],[0,0,0,0],[1,1,0,0],[0,1,1,0]],[[0,0,0,0],[0,0,1,0],[0,1,1,0],[0,1,0,0]]])
let COLORS=['#00ffff','#ffff00','#aa00ff','#ff9900','#0000ff','#00ff00','#ff0000']
let current=null
let fallTimer=0
let score=0
let gameOver=false
function initBoard(){board=[];for(let r=0;r<ROWS;r++){let row=[];for(let c=0;c<COLS;c++){row.push(0)}board.push(row)}}
function spawnPiece(){let idx=floor(random(0,SHAPES.length));let piece={idx:idx,rot:0,x:3,y:-1,shape:SHAPES[idx],color:idx+1};current=piece;if(!validPosition(current,current.x,current.y,current.rot)){gameOver=true;noLoop()}}
function validPosition(piece,x,y,rot){let mat=piece.shape[rot];for(let r=0;r<4;r++){for(let c=0;c<4;c++){let v=mat[r][c];if(v){let bx=x+c;let by=y+r;if(bx<0||bx>=COLS){return false}if(by>=ROWS){return false}if(by>=0){if(board[by][bx]!==0){return false}}}}}return true}
function lockPiece(){let mat=current.shape[current.rot];for(let r=0;r<4;r++){for(let c=0;c<4;c++){if(mat[r][c]){let bx=current.x+c;let by=current.y+r;if(by>=0&&by<ROWS&&bx>=0&&bx<COLS){board[by][bx]=current.color}}}}clearLines();spawnPiece()}
function clearLines(){let newBoard=[];let cleared=0;for(let r=0;r<ROWS;r++){let full=true;for(let c=0;c<COLS;c++){if(board[r][c]===0){full=false;break}}if(!full){newBoard.push(board[r])}else{cleared++}}for(let i=0;i<cleared;i++){let empty=[];for(let c=0;c<COLS;c++){empty.push(0)}newBoard.unshift(empty)}board=newBoard;if(cleared>0){score+=cleared*10;if(score>=100){gameOver=true;noLoop()}}}
function moveDown(){current.y+=1;if(!validPosition(current,current.x,current.y,current.rot)){current.y-=1;lockPiece()}}
function moveLeft(){current.x-=1;if(!validPosition(current,current.x,current.y,current.rot)){current.x+=1}}
function moveRight(){current.x+=1;if(!validPosition(current,current.x,current.y,current.rot)){current.x-=1}}
function rotateCurrent(){let old=current.rot;current.rot=(current.rot+1)%current.shape.length;if(!validPosition(current,current.x,current.y,current.rot)){current.rot=old}}
function setup(){createCanvas(COLS*CELL,ROWS*CELL);initBoard();spawnPiece();textSize(16);textAlign(LEFT,TOP)}
function draw(){background(30);stroke(50);for(let r=0;r<ROWS;r++){for(let c=0;c<COLS;c++){let v=board[r][c];if(v){noStroke();fill(COLORS[v-1]);rect(c*CELL,r*CELL,CELL,CELL)}stroke(80);noFill();rect(c*CELL,r*CELL,CELL,CELL)}}if(!gameOver&&current){let mat=current.shape[current.rot];for(let r=0;r<4;r++){for(let c=0;c<4;c++){if(mat[r][c]){let bx=(current.x+c);let by=(current.y+r);if(by>=0){noStroke();fill(COLORS[current.color-1]);rect(bx*CELL,by*CELL,CELL,CELL)}}}}if(keyIsDown(DOWN_ARROW)){fallTimer++;if(fallTimer>=1){moveDown();fallTimer=0}}else{fallTimer++;if(fallTimer>=30){moveDown();fallTimer=0}}}fill(255);noStroke();text('Score: '+score,5,5);if(gameOver){fill(200);textAlign(CENTER,CENTER);text('Game Over',width/2,height/2);textAlign(LEFT,TOP)}}
function keyPressed(){if(gameOver){return}if(keyCode===LEFT_ARROW){moveLeft()}else if(keyCode===RIGHT_ARROW){moveRight()}else if(keyCode===UP_ARROW){rotateCurrent()}else if(keyCode===DOWN_ARROW){moveDown()}}
