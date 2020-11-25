var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')

/*
function main(){
  console.log("new frame")
}

setTimeout(main,1);
*/


var main = function(){
  window.requestAnimationFrame(main);
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function startGame(){
main()
}

startGame()



