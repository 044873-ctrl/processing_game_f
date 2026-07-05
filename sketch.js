let player;let bullets=[];let enemies=[];let particles=[];let stars=[];let score=0;let gameOver=false;let lives=3;
function setup(){createCanvas(400,600);player={x:width/2,y:height-30,r:16,speed:5,invul:0};for(let i=0;i<30;i++){stars.push({x:random(0,width),y:random(0,height)
