const Engine={

update:null,
draw:null,

start(){

function loop(){

Engine.update()
Engine.draw()

requestAnimationFrame(loop)

}

loop()

}

}
