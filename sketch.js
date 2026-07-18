let cols=10;
let rows=20;
let cellSize=30;
let board;
let currentPiece;
let dropCounter=0;
let dropIntervalDefault=30;
let score=0;
let gameOver=false;
let colors=['#00f0f0','#ffff00','#a000f0','#f0a000','#0000f0','#00f000','#f00000'];
let shapes=[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]];
function makeEmptyBoard(){
  let b=[];
  for(let r=0;r<rows;r++){
    let row=[];
    for(let c=0;c<cols;c++){row.push(0);}
    b.push(row);
  }
  return b;
}
function copyMatrix(mat){
  let out=[];
  for(let r=0;r<4;r++){out.push(mat[r].slice());}
  return out;
}
function rotateMatrix(mat){
  let out=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for(let r=0;r<4;r++){
    for(let c=0;c<4;c++){
      out[c][3-r]=mat[r][c];
    }
  }
  return out;
}
function createPiece(){
  let idx=floor(random(shapes.length));
  let shape=copyMatrix(shapes[idx]);
  let piece={x:floor(cols/2)-2
