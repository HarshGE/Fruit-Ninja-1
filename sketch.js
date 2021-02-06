var score=0;
var BR,BRimg;

var PLAY=1;
var END=0;
var gamestate=PLAY;

var sword,swordImg;

var rand;

var fruit1;
var fruit2;
var fruit3;
var fruit4;

var enemy,enemyAn

var fruitsGroup;
var bacteriaGroup;

var gameover,gameoverImg;
var retry,retryImg;

var knifeSound;

function preload(){

 swordImg=loadImage('sword.png') ;
 
  BRimg=loadImage('download.jfif');

  fruit1=loadImage('fruit1.png');
   fruit2=loadImage('fruit2.png');
   fruit3=loadImage('fruit3.png');
   fruit4=loadImage('fruit4.png');
  
  enemyAN=loadAnimation('alien1.png',"alien2.png");
  
  retryImg=loadImage("79-791506_reset-button-restart-button-pixel-art-8-bit.png");
  
  gameoverImg=loadImage('gameover.png');

  knifeSound=loadSound('knifeSwooshSound.mp3')

}


function setup(){
  createCanvas(550,450);
  
  
  
  BR=createSprite(300,300);
  BR.addImage(BRimg);
  BR.scale=2.97908;
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImg);
  sword.scale=0.7;
  
  gameover=createSprite(265,200);
  gameover.addImage(gameoverImg);
  gameover.scale=1.5
  
  retry=createSprite(265,300);
  retry.addImage(retryImg);
  retry.scale=0.2
  
  
  fruitsGroup=createGroup();
  bacteriaGroup=createGroup();
  
  
  score=0;
}

function draw(){
  background('brown');
text('Score='+score,500,30)
  
  console.log('this is',gamestate);
  
  if(gamestate === PLAY){
    sword.y=World.mouseY;
     sword.x=World.mouseX;
    fruits();
  bacteria();
    if(fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
      score=score+1;
      knifeSound.play();
    }
    if(bacteriaGroup.isTouching(sword)){
    gamestate = END;
      
  }
    gameover.visible=false;
  retry.visible=false;
  }
  else if(gamestate===END){
    sword.velocityX=0;
    
    fruitsGroup.setVelocityEach(0);
    bacteriaGroup.setVelocityEach(0);
    
      fruitsGroup.setLifetimeEach(-1);
    bacteriaGroup.setLifetimeEach(-1);
    
     gameover.visible=true;
    retry.visible=true;
  }
  
  
drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    rand=Math.round(random(1,4));
    switch(rand){
        case 1:fruit.addImage(fruit1);
              break;
                case 2:fruit.addImage(fruit2);
          break;
          case 3:fruit.addImage(fruit3);
        break;
        case 4:fruit.addImage(fruit4);
        break;
        default:break;
    }
      fruit.y=Math.round(random(50,340))  ;
    
    fruit.velocityX=-(7+(score/10));
    fruit.lifetime=100;
    
    var position = Math.round(random(1,2))
  
  if (position==1){
    fruit.x=600;
  }
    if(position==2){
      fruit.y=800;
    }
    
    fruitsGroup.add(fruit);
  }
  
  
    
}

function bacteria(){
  if(World.frameCount%200===0){
    enemy=createSprite(400,200,20,20);
    enemy.addAnimation('moving',enemyAN)
    enemy.y=Math.round(random(100,300));
    enemy.velocityX=-(8+(score/10));
    enemy.setLifetime=50;
    
    bacteriaGroup.add(enemy);
  }
}