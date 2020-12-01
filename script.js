var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')
var player;
var enemy; 
var laser; 

//variables for key press
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var spacePressed = false;

class Laser{
  constructor(){
    this.position = {
  x: 0,
y: 0 };
this.direction = 0;
  }

  draw() {
  var x =  this.position.x;
  var y = this.position.y;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rect(0, 0, 2, 2);
  ctx.fill();
  ctx.translate(-x, -y);
};
update() {
  this.position = moveInDirection(this.position,
this.direction, 5);
};
}

class Enemy{
  constructor(){
    this.position = {
    x: 0,
    y: 0 };
    this.size = 30;
    this.direction = Math.random() * 360;
    this.speed = 1; 
  }
  draw(){
    var x = this.position.x;
    var y = this.position.y;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rect(0, 0, this.size, this.size);
    ctx.stroke()
    ctx.translate(-x, -y);
  }
  update() {
  this.position = moveInDirection(this.position, this.direction,this.speed);
  wrapAround(this);
};
}

class Ship {
  constructor(){
    this.position = {
      x: 200,
      y:150
    }
    this.rotation = 0;
  }
  draw(){
    var x = this.position.x
    var y = this.position.y
    var r = this.rotation

    ctx.translate(x,y);
    ctx.rotate(degToRad(r));
    ctx.beginPath();
    ctx.moveTo(0,-10);
    ctx.lineTo(-5,10);
    ctx.lineTo(5,10);
    ctx.closePath();
    ctx.stroke();
    ctx.rotate(degToRad(-r));
    ctx.translate(-x,-y);

  

  }
  update(){
     if (leftPressed) {
    this.rotation -= 10;
  }
  if (rightPressed) {
    this.rotation += 10;
  }

   if (upPressed) {
    this.position = moveInDirection(this.position, this.rotation,
3);
}

wrapAround(this)

  if (spacePressed) {
    laser = new Laser();
    laser.position = this.position;
    laser.direction = this.rotation;
}
  }
}

function main(){
  window.requestAnimationFrame(main);
  ctx.clearRect(0,0,canvas.width,canvas.height)
  
  //console.log("in main")
  if(player){
  player.update();
  player.draw();
  }
  if(enemy){
  enemy.update();
  enemy.draw();
  }
  if(laser){
  laser.update();
  laser.draw();
 }
}

function startGame(){
//console.log("startGame")
player = new Ship()
enemy = new Enemy()
main()
}

startGame()

function wrapAround(sprite) {
  if (sprite.position.x < 0) {
    sprite.position.x = 400;
  } else if (sprite.position.x > 400) {
    sprite.position.x = 0;
  }
  if (sprite.position.y < 0) {
    sprite.position.y = 300;
  } else if (sprite.position.y > 300) {
    sprite.position.y = 0;
  }
}

function degToRad(degrees) {
  var radians = (Math.PI/180) * degrees;
  return radians;
}


function moveInDirection(position, angle, distance) {
  var newX, newY;
  newX = position.x + (distance * Math.sin(degToRad(angle)));
  newY = position.y + (-distance * Math.cos(degToRad(angle)));
  return {x: newX, y: newY};
}

//adding event listeners

document.addEventListener('keydown',keyDownHandler,false)
document.addEventListener('keyup',keyUpHandler,false)

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 38) {
    upPressed = true;
  } else if (e.keyCode == 32) {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 32) {
    spacePressed = false;
  }
}






// var Person = function (name,age,height){
//   this.name = name;
//   this.age = age;
//   this.height = height;

//   this.sayHi = function(){
//     return ('hi my name is '+ this.name)
//   }
// }

// var Kim = new Person("Kim",23,'5 feet')

// class Person1{
//   constructor(name,age,height){
//     this.name = name
//     this.age = age
//     this.height = height
//   }

//   sayHi(){
//     return ('hi my name is '+ this.name)
//   }
// }

// console.log(Kim.age)
// var Bob = new Person1("Bob",40,'2 feet')
// console.log(Bob.age)



