class Car {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.angle = 0;

        this.speed = 0;
        this.maxSpeed = 12;

        this.acceleration = 0.25;
        this.reverseSpeed = 0.15;

        this.turnSpeed = 0.05;

        this.friction = 0.96;
        this.brakePower = 0.9;

        this.nitro = 100;
        this.nitroPower = 0.6;

        this.drift = false;
    }

    update() {

        // Przyspieszanie
        if (Input.down("ArrowUp")) {
            this.speed += this.acceleration;
        }

        // Cofanie
        if (Input.down("ArrowDown")) {
            this.speed -= this.reverseSpeed;
        }

        // Skręt zależny od prędkości
        const turnFactor = this.turnSpeed * (this.speed / this.maxSpeed + 0.5);

        // Skręt w lewo
        if (Input.down("ArrowLeft")) {
            this.angle -= turnFactor;
            this.drift = true;
        }

        // Skręt w prawo
        if (Input.down("ArrowRight")) {
            this.angle += turnFactor;
            this.drift = true;
        }

        // Nitro
        if (Input.down(" ")) {

            if (this.nitro > 0) {
                this.speed += this.nitroPower;
                this.nitro -= 0.7;
            }

        } else {

            // regeneracja nitro
            if (this.nitro < 100) {
                this.nitro += 0.1;
            }
        }

        // Ograniczenie prędkości
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if (this.speed < -5) {
            this.speed = -5;
        }

        // Tarcie
        this.speed *= this.friction;

        // Ruch auta
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    draw(ctx) {

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // cień auta
        ctx.shadowColor = "#ff0080";
        ctx.shadowBlur = 25;

        // karoseria
        ctx.fillStyle = "#ff0080";
        ctx.fillRect(-22, -10, 44, 20);

        // dach
        ctx.fillStyle = "#ff66aa";
        ctx.fillRect(-10, -6, 20, 12);

        // reflektory
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(20, -6, 4, 4);
        ctx.fillRect(20, 2, 4, 4);

        // tylne światła
        ctx.fillStyle = "red";
        ctx.fillRect(-24, -6, 4, 4);
        ctx.fillRect(-24, 2, 4, 4);

        ctx.restore();
    }

}
