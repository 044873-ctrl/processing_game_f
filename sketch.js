let rows=8
let cols=8
let cell=50
let board=[]
let currentPlayer=1
let dirs=[[ -1,-1],[ -1,0],[ -1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
let gameOver=false
function initBoard(){
  for(let r=0;r<rows;r++){board[r]=[]
    for(let c=0;c<cols;c++){board[r][c]=0}}
  board[3][3]=2
  board[4][4]=2
  board[3][4]=1
  board[4][3]=1
  currentPlayer=1
  gameOver=false
}
function inBounds(r,c){
  return r>=0 && r<rows && c>=0 && c<cols
}
function getFlips(r,c,player){
  let flips=[]
  if(!inBounds(r,c))return flips
  if(board[r][c]!==0)return flips
  let opponent=(player===1?2:1)
  for(let d=0;d<dirs.length;d++){
    let dr=dirs[d][0]
    let dc=dirs[d][1]
    let rr=r+dr
    let cc=c+dc
    let line=[]
    while(inBounds(rr,cc) && board[rr][cc]===opponent){
      line.push([rr,cc])
      rr+=dr
      cc+=dc
    }
    if(line.length>0 && inBounds(rr,cc) && board[rr][cc]===player){
      for(let i=0;i<line.length;i++){flips.push(line[i])}
    }
  }
  return flips
}
function isValidMove(r,c,player){
  let flips=getFlips(r,c,player)
  return flips.length>0
}
function validMoves(player){
  let moves=[]
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      let flips=getFlips(r,c,player)
      if(flips.length>0){
        moves.push({r:r,c:c,flips:flips})
      }
    }
  }
  return moves
}
function applyMove(r,c,player){
  let flips=getFlips(r,c,player)
  if(flips.length===0)return false
  board[r][c]=player
  for(let i=0;i<flips.length;i++){
    let p=flips[i]
    board[p[0]][p[1]]=player
  }
  return true
}
function countScores(){
  let black=0
  let white=0
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      if(board[r][c]===1)black++
      else if(board[r][c]===2)white++
    }
  }
  return {black:black,white:white}
}
function drawBoard(){
  background(34)
  stroke(0)
  for(let r=0;r<=rows;r++){
    line(0,r*cell,cols*cell,r*cell)
  }
  for(let c=0;c<=cols;c++){
    line(c*cell,0,c*cell,rows*cell)
  }
  let moves=validMoves(currentPlayer)
  for(let i=0;i<moves.length;i++){
    let m=moves[i]
    noStroke()
    fill(200,200,0,150)
    ellipse(m.c*cell+cell*0.5,m.r*cell+cell*0.5,12,12)
  }
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      if(board[r][c]!==0){
        if(board[r][c]===1){fill(0,102,204)
        }else{fill(255)}
        noStroke()
        ellipse(c*cell+cell*0.5,r*cell+cell*0.5,cell*0.8,cell*0.8)
      }
    }
  }
  let scores=countScores()
  noStroke()
  fill(255)
  textSize(14)
  textAlign(LEFT,TOP)
  text('Black: '+scores.black,6,6)
  textAlign(RIGHT,TOP)
  text('White: '+scores.white,width-6,6)
  textAlign(CENTER,BOTTOM)
  if(gameOver){
    let msg='Draw'
    if(scores.black>scores.white)msg='Black wins'
    else if(scores.white>scores.black)msg='White wins'
    fill(0,200)
    rect(0,height/2-20,width,40)
    fill(255)
    text(msg,width/2,height/2+6)
  } else {
    text(currentPlayer===1?'Turn: Black':'Turn: White',width/2,height-6)
  }
}
function setup(){
  createCanvas(cols*cell,rows*cell)
  initBoard()
  frameRate(60)
}
function draw(){
  drawBoard()
}
function mousePressed(){
  if(gameOver)return
  let c=floor(mouseX/cell)
  let r=floor(mouseY/cell)
  if(!inBounds(r,c))return
  if(currentPlayer!==1)return
  if(!applyMove(r,c,currentPlayer))return
  currentPlayer=2
  let movesWhite=validMoves(2)
  if(movesWhite.length===0){
    let movesBlack=validMoves(1)
    if(movesBlack.length===0){
      gameOver=true
      return
    }
    currentPlayer=1
    return
  }
  let best=null
  for(let i=0;i<movesWhite.length;i++){
    let m=movesWhite[i]
    if(best===null || m.flips.length>best.flips.length){best=m}
  }
  if(best!==null){
    applyMove(best.r,best.c,2)
  }
  currentPlayer=1
  let movesAfterBlack=validMoves(1)
  let movesAfterWhite=validMoves(2)
  if(movesAfterBlack.length===0 && movesAfterWhite.length===0){
    gameOver=true
  }
}
