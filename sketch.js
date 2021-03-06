var balloon, balloonImg, balloonImg2, backgroundImg;

var database, position;

function preload(){
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg = loadAnimation("images/Hot Air Ballon-02.png");
  balloonImg2 = loadAnimation("images/Hot Air Ballon-03.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,500);
  balloon = createSprite(400, 200, 10, 10);
  balloon.addAnimation("ballon", balloonImg);
  balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    keyEvents(-10, 0)
  }

  else if(keyDown(RIGHT_ARROW)){
    keyEvents(10, 0)
  }

  else if(keyDown(UP_ARROW)){
    balloon.scale = balloon.scale + 0.01
    keyEvents(0, -10)
  }

  else if(keyDown(DOWN_ARROW)){
    balloon.scale = balloon.scale - 0.01
    keyEvents(0, 10)
  }

  drawSprites();

  textSize(20);
  fill("black");
  stroke("white");
  text("Use arrow keys to move Hot Air Balloon!", 10, 20);
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error in writing to the database");
}

function keyEvents(x, y){
  balloon.addAnimation("balloon2", balloonImg2);
  balloon.changeAnimation("balloon2", balloonImg2);
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
})
}