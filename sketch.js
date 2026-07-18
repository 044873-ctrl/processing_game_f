let player = {x:240, y:0, w:40, h:20, speed:6};
let bullets = [];
let enemies = [];
let score = 0;
let lives = 3;
let spawnInterval = 60;
let lastSpawn = 0;
let gameOver = false;
let fireCooldown = 12;
let lastFire = -100;
function spawnEnemy(){
  let ew = Math.floor(random(24,60));
  let ex = Math.floor(random(0, width - ew));
  let ev = random(1.5,3.0);
  let enemy = {x: ex, y: -ew, w: ew, h: ew, vy: ev};
  enemies.push(enemy);
}
function rectsOverlap(a,b){
  return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);
}
function resetGame(){
  bullets = [];
  enemies = [];
  score = 0;
  lives = 3;
  lastSpawn = frameCount;
  lastFire = frameCount - fireCooldown;
  gameOver = false;
  player.x = width/2;
  player.y = height - 40;
}
function setup(){
  createCanvas(480,640);
  player.x = width/2;
  player.y = height - 40;
  lastSpawn = frameCount;
  lastFire = frameCount - fireCooldown;
  textAlign(LEFT,TOP);
  rectMode(CORNER);
  noStroke();
}
function draw(){
  background(18,18,28);
  fill(255);
  textSize(16);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 30);
  if(gameOver){
    textAlign(CENTER,CENTER);
    textSize(32);
    fill(255,100,100);
    text("GAME OVER", width/2, height/2 - 20);
    textSize(16);
    fill(200);
    text("Press R to restart", width/2, height/2 + 20);
    textAlign(LEFT,TOP);
    return;
  }
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    player.x -= player.speed;
  }
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    player.x += player.speed;
  }
  player.x = constrain(player.x, 0, width - player.w);
  if(keyIsDown(32) && frameCount - lastFire >= fireCooldown){
    let bx = player.x + player.w/2 - 3;
    let by = player.y - 6;
    let b = {x: bx, y: by, w:6, h:12, vy: 8};
    bullets.push(b);
    lastFire = frameCount;
  }
  if(frameCount - lastSpawn >= spawnInterval){
    spawnEnemy();
    lastSpawn = frameCount;
    if(spawnInterval > 20 && frameCount % 600 == 0){
      spawnInterval = Math.max(20, spawnInterval - 5);
    }
  }
  for(let i = bullets.length - 1; i >= 0; i--){
    let b = bullets[i];
    b.y -= b.vy;
    fill(255,220,60);
    rect(b.x, b.y, b.w, b.h);
    if(b.y + b.h < 0){
      bullets.splice(i,1);
    }
  }
  for(let j = enemies.length - 1; j >= 0; j--){
    let e = enemies[j];
    e.y += e.vy;
    fill(180,60,60);
    rect(e.x, e.y, e.w, e.h);
    if(e.y > height){
      lives -= 1;
      enemies.splice(j,1);
      if(lives <= 0){
        gameOver = true;
      }
      continue;
    }
    if(rectsOverlap(e, player)){
      lives -= 1;
      enemies.splice(j,1);
      if(lives <= 0){
        gameOver = true;
      }
      continue;
    }
    for(let i = bullets.length - 1; i >= 0; i--){
      let b = bullets[i];
      if(rectsOverlap(e,b)){
        enemies.splice(j,1);
        bullets.splice(i,1);
        score += 10;
        break;
      }
    }
  }
  fill(80,160,255);
  rect(player.x, player.y, player.w, player.h);
  if(score >= 100){
    fill(255,240,100);
    textSize(18);
    text("You Win!", width - 120, 10);
  }
}
function keyPressed(){
  if(gameOver && (key == 'r' || key == 'R')){
    resetGame();
  }
}
