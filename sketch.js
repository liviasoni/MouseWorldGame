var bgImg;
var girl,girlImg,jump;
var mouse1,mouse2,stone,stoneImg;
var gun,bulletImg,edges,invisibleGround,bullet;
var cheese,coin,bg2,mouse,bg2Img,cheese,cheeseImg;
var bulletsGroup,mouseGroup,boomImg,coinImg;
var score = 0;
var coinsGroup,gameOverImg,restartImg,bgM;
var gameState = "play";
var overS,jumpS,coinS,hitS,gunS;

function preload() {
bgImg = loadImage("assets/Mouseworld.png");
girlImg = loadAnimation("assets/Girl/g3.png","assets/Girl/g5.png","assets/Girl/g6.png",
"assets/Girl/g7.png","assets/Girl/g8.png");
mouse1 = loadAnimation("assets/Mouse1/m1.png","assets/Mouse1/m2.png","assets/Mouse1/m3.png","assets/Mouse1/m4.png",
"assets/Mouse1/m5.png","assets/Mouse1/m6.png","assets/Mouse1/m7.png");
mouse2 = loadAnimation("assets/Mouse2/mo1.png","assets/Mouse2/mo2.png","assets/Mouse2/mo3.png",
"assets/Mouse2/mo4.png","assets/Mouse2/mo5.png","assets/Mouse2/mo6.png");
bulletImg = loadImage("assets/gunImg/Bullet.png");
//cheese = loadImage("assets/Cheese.jpg");
coinImg = loadImage("assets/Coin.png");
bg2Img = loadImage("assets/jungle.jpg");
stoneImg = loadImage("assets/StoneImg/Stone.png");
jump = loadAnimation("assets/Girl/g9.png","assets/Girl/g10.png","assets/Girl/g11.png")
boomImg = loadAnimation("assets/Boom.png");
gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");
cheeseImg = loadImage("assets/Cheese.png")
bgM = loadSound ("assets/bgMusic.mpeg");
overS = loadSound ("assets/overSound.mp3");
hitS = loadSound ("assets/hitSound.mp3");
coinS = loadSound ("assets/coinSound.mp3");
gunS = loadSound ("assets/gunSound.mp3");
}


function setup() {
  createCanvas(1200,700);

  bg2 = createSprite(width/2+100,height/2,width,height);
bg2.addImage(bg2Img);
bg2.scale = 1.25;

bgM.play();
bgM.setVolume(0.5);


  
bg = createSprite(width/2,height/2,width,height);
bg.addImage(bgImg);
bg.scale = 1.25;


girl = createSprite(200,500, 50,350);
girl.addAnimation("running",girlImg);
girl.addAnimation("jumping",jump);
girl.changeAnimation("running");
girl.scale = 2.25;

gameOver  = createSprite(width/2,height/2);
gameOver.addImage(gameOverImg);

restart = createSprite(width/2+20,height/2+235);
restart.addImage(restartImg);
restart.scale = 0.3;

edges = createEdgeSprites();

invisibleGround =createSprite(width/2,680,width,10)
invisibleGround.visible = false;
gun = createImg('gunBtn.png');
gun.position(100,150)
gun.size(120,120) 
gun.mouseClicked(spawnBullets);


mouseGroup = new Group();
bulletsGroup = new Group();
coinsGroup = new Group();
stonesGroup = new Group();
cheeseGroup = new Group();
}


function draw() {
  background(0); 
  if (gameState==="play"){
    bg.velocityX = -1;

  
  if (bg.x<width/2-140) {
bg.x = width/2;


  }

  if (keyDown("space")){
 girl.velocityY = -19        ;
//jumpS.play();
}

if (girl.y>=450){
  girl.changeAnimation("running");

}

else{
  girl.changeAnimation("jumping");

}
girl.velocityY = girl.velocityY+5

girl.collide(invisibleGround);

bulletsGroup.isTouching(mouseGroup,function(collector,collected){
collector.remove();
collected.changeAnimation("boom");
collected.scale = 0.5 ;
hitS.play();
hitS.setVolume(0.2);
setTimeout(()=>{
  collected.remove();

},750);
score = score+5;
})

girl.isTouching(coinsGroup,function(collector,collected){
collected.remove();
score = score+ 10;
coinS.play();
})

girl.isTouching(cheeseGroup,function(collector,collected){
  collected.remove();
  score = score+ 5;
  coinS.play();
  })

if(girl.isTouching(mouseGroup)){
console.log("GameOver");
mouseGroup.destroyEach();
gameState = "end";
overS.play();
}

if(girl.isTouching(stonesGroup)){
stonesGroup.destroyEach();
gameState = "end";
overS.play();
}
spawnMouse();
spawnStone();
spawnCoin();
spawnCheese();
gameOver.visible = false;
restart.visible = false;
  }

  else if(gameState==="end"){
    gameOver.visible = true;
    restart.visible = true;
    bg.velocityX = 0;
    mouseGroup.destroyEach();
    coinsGroup.destroyEach();
    cheeseGroup.destroyEach();
    bgM.stop();
    girl.remove();
    stonesGroup.destroyEach();
  }

  if(mousePressedOver(restart)){
  window.location.reload();
  }
  drawSprites();

textSize(50);
fill("white");
  text("Score:"+score,width-250,55);
  
}

function spawnMouse(){
if(frameCount%150 === 0){
  mouse = createSprite(width,570,100,300)
  mouse.velocityX = -5;
  mouse.addAnimation("mouse1",mouse1);
  mouse.addAnimation("mouse2",mouse2);
  mouse.addAnimation("boom",boomImg);
  var rand = Math.round(random(1,2))
  if(rand === 1) {
  mouse.changeAnimation("mouse1");
}
else{
mouse.changeAnimation("mouse2");
mouse.y = 580;
}

mouseGroup.add(mouse);
}


}
function spawnStone(){
if(frameCount%400 === 0){
  stone = createSprite(width,595,100,300)
  stone.addImage("stone",stoneImg);
 stone.velocityX = -3;
 stone.scale = 0.4; 
stonesGroup.add(stone);
}
}

function spawnBullets(){
//if (frameCount%2 ===0) {
bullet = createSprite(200,550,50,50)
bullet.velocityX = 7;
bullet.addImage("bullet",bulletImg);
bullet.scale = 0.1;
bulletsGroup.add(bullet);
gunS.play();
gunS.setVolume(0.2);
//}

}

function spawnCoin(){
if (frameCount%300===0){
coin = createSprite(width,580,50,50);
coin.addImage("coin",coinImg);
coin.velocityX = -2;
coin.scale = 0.1;
coin.y = random(10,550);
coinsGroup.add(coin);
}


}
function spawnCheese(){
  if (frameCount%200===0){
  cheese = createSprite(width,580,50,50);
  cheese.addImage("cheese",cheeseImg);
  cheese.velocityX = -2;
  cheese.scale = 0.1;
  cheese.y = random(10,550);
  cheeseGroup.add(cheese);

  }
}
