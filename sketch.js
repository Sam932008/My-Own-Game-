var bg,player,gameState,life,v,GO ;
var bg1 , player1,go1 , monster1, monster2, monster3 , push1;
var edges ;

function preload(){
bg1 = loadImage("bg.png");

player1 = loadImage("player.png");

monster1 = loadImage("monster1.png");
monster2 = loadImage("monster2.png");
monster3 = loadImage("monster3.png");

go1 = loadImage("GO.png"); 

push1 = loadImage("push.png");

}



function setup() {

   bg = createSprite(200,200,400,400);
   bg.addImage(bg1);
  
   player = createSprite(50,300,20,40);
  player.addImage(player1);
  
  player.scale = 0.4;
   
   gameState = "play";
  
   monsterGroup = createGroup();
  
   life = 10 ;
  
   v = 0 ;
  
   GO = createSprite(200,250,20,20);
  GO.addImage(go1);
  GO.scale=0.1;
  GO.visible = false;
}
function draw() {
  
  background("white");
  if (gameState==="play"){
    
  if(keyDown("right")){
    player.x = player.x + 3;
  }
  if(keyDown("left")){
    player.x = player.x - 3 ;
  }
  edges = createEdgeSprites();
  player.bounceOff(edges);
  
  spawnMonsters();
  if (monsterGroup.isTouching(player)){
   
    life = life-1;
    v = v+1 ;
    monsterGroup[0].destroy();
  }
  if (life===0){
     gameState = "end";
  }
  
  }
   
 drawSprites(); 
 
  if (gameState==="end"){
    monsterGroup.destroyEach();
    player.visible = false;
    stroke("red");
    textSize(30);
    strokeWeight(4);
    fill("WHITE");
    text("GAME OVER",120,200);
   
     GO.visible = true;
   if(mousePressedOver(GO)){
    v = 0 ; 
     gameState = "play";
     
     player.visible = true ;
     life = 10 ;
     GO.visible = false ; 
   }  
  }
  
 noStroke(); 
 fill("white");
 textSize(20);
 
 text("Life: "+ life ,30,50);
}

function spawnMonsters() {
  if(World.frameCount%70===0){
     var monster = createSprite(random(50,350),-10 ,50,50);
     monster.velocityY = v+5;
     
     monster.scale = 0.4;
     var rand= Math.round(random(1,3));
     if(rand === 1) {
       monster.addImage(monster1);
       
     }
     else if (rand === 2) {
       monster.addImage(monster2);
     }
      
     else {
       monster.addImage(monster3);
     }
        
   monsterGroup.add(monster);
   
     
  }
}
