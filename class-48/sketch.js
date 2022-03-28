var paddle , ball , brick , bricks , score;
var ballImg,gameoverImg;

var lives = 3;

var gamestate = "serve"


function preload(){
  ballImg = loadImage("image/ball1.png");
  paddleImg = loadImage("image/paddle.png")
  gameoverImg = loadImage("image/gameover.png");
  hitSound = loadSound("sound/gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  paddle = createSprite(300,580,80,10); 
  paddle.addImage(paddleImg);
  paddle.scale = 1.3;
  ball = createSprite(300,490,20,20);
  ball.addImage(ballImg);
  ball.scale = 0.025;
  bricks = new Group(); 
  score = 0;
  edges= createEdgeSprites();
  createBrickRow(70,"red");
  createBrickRow(120,"yellow");
  createBrickRow(170,"green");
  createBrickRow(220,"orange");
  createBrickRow(270,"white");
  
}

function createBrickRow(y,color){ 
  
 for(var c = 0;c < 5; c++){
   var brick = createSprite(85+106*c,y,100,40); 
   brick.shapeColor = color
   bricks.add(brick);
  }
}

function draw() {
  background("black");
  fill("white");
  textSize(20);
  //textStyle(BOLDITALIC);
  text("Score: " + score ,30,30);
  text("Lives: " + lives ,510,30);
  
  if(gamestate === "serve"){
    text("Click to serve the ball",200,400);
    ball.velocityX=0;
    ball.velocityY=0;
    ball.x = 300;
    ball.y = 490;

  }else if(gamestate==="end"){
    gameover = createSprite(300,300,50,50);
    gameover.addImage(gameoverImg);
    gameover.scale = 1;
    ball.remove;
  }

  else{
    gameplay();
  
  }

  drawSprites();
}


function brickHit(ball,brick){
  brick.remove();
  score = score+100; 
}
function mousePressed(){
//  ball.velocityX = 8;
//  ball.velocityY = 8;
  if(gamestate === "serve" ){
       gamestate = "play";
      ball.velocityY = 5;
      ball.velocityX = 5;
     }
  
}

function lifeover(){
lives = lives-1;
if(lives>=1){
  gamestate="serve";
}else{
  gamestate="end";
}
}

function gameplay(){
  paddle.x = mouseX
  if(paddle.x<40){
     paddle.x = 40;
     }
  
  if(paddle.x>560){
     paddle.x = 560;
  }
  

  //ball.bounceOff(paddle);
   ball.bounceOff(edges[0]);
   ball.bounceOff(edges[1]);
   ball.bounceOff(edges[2]);
   ball.bounceOff(bricks,brickHit);
   
   if(ball.bounceOff(paddle)){
    hitSound.play();
  }
  
  
  if(ball.isTouching(edges[3])){
     lifeover(); 
     } 

     if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
}