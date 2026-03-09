class Obstacle{

constructor(x,y){

this.x=x
this.y=y
this.size=30

}

draw(ctx){

ctx.fillStyle="red"
ctx.fillRect(this.x,this.y,this.size,this.size)

}

}

class Obstacles{

constructor(){

this.list=[]

}

spawn(){

let x=Math.random()*window.innerWidth
let y=-50

this.list.push(new Obstacle(x,y))

}

update(){

for(let i=0;i<this.list.length;i++){

this.list[i].y+=4

}

}

draw(ctx){

this.list.forEach(o=>o.draw(ctx))

}

}
