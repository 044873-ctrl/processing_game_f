let canvasW = 400;
let canvasH = 600;
let playerX;
let playerY;
let playerSpeed = 5;
let playerRadius = 12;
let bullets = [];
let enemies = [];
let particles = [];
let stars = [];
let enemyRadius = 12;
let enemySpeed = 2;
let bulletRadius = 4;
let bulletSpeed = 8;
let particleRadius = 3;
let particleLifeInit = 20;
let score = 0;
let gameOver = false;
let spawnTimer = 0;
let fireCooldown = 0;
function spawnEnemy() {
  let ex = random(enemyRadius, canvasW - enemyRadius);
  let ey = -enemyRadius;
  let e = { x: ex, y: ey, r: enemyRadius, speed: enemySpeed };
  enemies.push(e);
}
function spawnBullet() {
  let bx = playerX;
  let by = playerY - playerRadius;
  let b = { x: bx
