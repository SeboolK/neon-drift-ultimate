const canvas=document.getElementById("game")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // odśwież tor
    world.width = canvas.width;
    world.height = canvas.height;
    world.centerX = canvas.width / 2;
    world.centerY = canvas.height / 2;
});


Input.init()
UI.init()

const car=new Car(canvas.width/2,canvas.height/2)
const world=new World(canvas.width,canvas.height)
const particles=new ParticleSystem()
const obstacles=new Obstacles()

let spawnTimer=0

Engine.update=()=>{

world.update()

car.update()



if(car.drift){

particles.spawn(car.x,car.y)

}

particles.update()

spawnTimer++

if(spawnTimer>80){

obstacles.spawn()
spawnTimer=0

}

obstacles.update()
// SPRAWDZANIE KOLIZJI

for (let obstacle of obstacles.list) {

    let dx = car.x - obstacle.x;
    let dy = car.y - obstacle.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 40) {

        // efekt uderzenia
        car.speed = -car.speed * 0.5;

        // odrzut auta
        car.x += dx * 0.3;
        car.y += dy * 0.3;

    }

}


UI.update(car)

car.drift=false

}

Engine.draw=()=>{

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

world.draw(ctx)

obstacles.draw(ctx)

particles.draw(ctx)

car.draw(ctx)

}

document.getElementById("startBtn").onclick=()=>{

document.getElementById("menu").style.display="none"
document.getElementById("ui").style.display="block"

Engine.start()

}
