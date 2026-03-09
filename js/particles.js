class Particle{

constructor(x,y){

this.x=x
this.y=y

this.vx=(Math.random()-0.5)*5
this.vy=(Math.random()-0.5)*5

this.life=40

}

update(){

this.x+=this.vx
this.y+=this.vy

this.life--

}

draw(ctx){

ctx.fillStyle="cyan"
ctx.fillRect(this.x,this.y,2,2)

}

}

class ParticleSystem{

constructor(){

this.particles=[]

}

spawn(x,y){

for(let i=0;i<1;i++){

this.particles.push(new Particle(x,y))

}

}

update(){

for(let i=this.particles.length-1;i>=0;i--){

let p=this.particles[i]

p.update()

if(p.life<=0){

this.particles.splice(i,1)

}

}

}

draw(ctx){

this.particles.forEach(p=>p.draw(ctx))

}

}
