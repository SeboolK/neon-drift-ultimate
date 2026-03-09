class World {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        // środek toru
        this.centerX = width / 2;
        this.centerY = height / 2;

        // główny owal toru
        this.outerRadiusX = 350;
        this.outerRadiusY = 220;
        this.innerRadiusX = 220;
        this.innerRadiusY = 100;

        // dekoracje i przeszkody na torze
        this.obstacles = [];
        this.decorations = [];

        // liczba pasów
        this.lanes = 3;

        // kolory toru i trawy
        this.grassColor = "#0f3d0f";
        this.trackColor = "#2f2f2f";
        this.lineColor = "white";

        // inicjalizacja dekoracji
        this.initDecorations();
    }

    initDecorations() {
        // randomowe przeszkody (np. kamienie lub pachołki)
        for (let i = 0; i < 30; i++) {
            let angle = Math.random() * Math.PI * 2;
            let radiusX = this.innerRadiusX + Math.random() * (this.outerRadiusX - this.innerRadiusX);
            let radiusY = this.innerRadiusY + Math.random() * (this.outerRadiusY - this.innerRadiusY);
            let x = this.centerX + Math.cos(angle) * radiusX;
            let y = this.centerY + Math.sin(angle) * radiusY;
            this.obstacles.push({x, y, size: 15});
        }

        // randomowe dekoracje poza torem (np. drzewa)
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            // pomiń środek toru
            if (!this.isInsideTrack(x, y)) {
                this.decorations.push({x, y, size: 10});
            }
        }
    }

    isInsideTrack(x, y) {
        let dx = x - this.centerX;
        let dy = y - this.centerY;
        let outerCheck = (dx*dx)/(this.outerRadiusX*this.outerRadiusX) + (dy*dy)/(this.outerRadiusY*this.outerRadiusY);
        let innerCheck = (dx*dx)/(this.innerRadiusX*this.innerRadiusX) + (dy*dy)/(this.innerRadiusY*this.innerRadiusY);
        return outerCheck <= 1 && innerCheck >= 1;
    }

    update() {
        // przeszkody mogą się przesuwać lub pulsować – np. animacja kamieni
        for (let o of this.obstacles) {
            o.size += Math.sin(Date.now()/500 + o.x + o.y) * 0.05;
            if (o.size < 10) o.size = 10;
            if (o.size > 20) o.size = 20;
        }
    }

    draw(ctx) {
    // ---- Tło: trawa ----
    ctx.fillStyle = this.grassColor;
    ctx.fillRect(0, 0, this.width, this.height);

    // ---- Dekoracje poza torem ----
    for (let d of this.decorations) {
        ctx.fillStyle = "#0a2d0a"; // ciemna zieleń
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI*2);
        ctx.fill();
    }

    // ---- Zewnętrzna część toru (asfalt) ----
    ctx.fillStyle = this.trackColor;
    ctx.beginPath();
    ctx.ellipse(this.centerX, this.centerY, this.outerRadiusX, this.outerRadiusY, 0, 0, Math.PI*2);
    ctx.fill();

    // ---- Wewnętrzna część toru (wycinamy środek) ----
    ctx.fillStyle = this.grassColor;
    ctx.beginPath();
    ctx.ellipse(this.centerX, this.centerY, this.innerRadiusX, this.innerRadiusY, 0, 0, Math.PI*2);
    ctx.fill();

    // ---- Krawędzie toru: pasy czerwono-białe ----
    for (let i = 0; i < 2; i++) {
        const ratioX = this.innerRadiusX + i * (this.outerRadiusX - this.innerRadiusX);
        const ratioY = this.innerRadiusY + i * (this.outerRadiusY - this.innerRadiusY);

        ctx.lineWidth = 8;

        // czerwony pas
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.ellipse(this.centerX, this.centerY, ratioX, ratioY, 0, 0, Math.PI*2);
        ctx.stroke();

        // biały pas obok czerwonego
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.ellipse(this.centerX, this.centerY, ratioX-4, ratioY-4, 0, 0, Math.PI*2);
        ctx.stroke();
    }

    // ---- Linie toru (wewnętrzne pasy) ----
    for (let i = 1; i < this.lanes; i++) {
        const rx = this.innerRadiusX + i * (this.outerRadiusX - this.innerRadiusX) / this.lanes;
        const ry = this.innerRadiusY + i * (this.outerRadiusY - this.innerRadiusY) / this.lanes;
        ctx.setLineDash([15, 10]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#dddddd";
        ctx.beginPath();
        ctx.ellipse(this.centerX, this.centerY, rx, ry, 0, 0, Math.PI*2);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    // ---- Linia środkowa toru ----
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(
        this.centerX,
        this.centerY,
        (this.outerRadiusX + this.innerRadiusX)/2,
        (this.outerRadiusY + this.innerRadiusY)/2,
        0, 0, Math.PI*2
    );
    ctx.stroke();

    // ---- Przeszkody na torze (pachołki) ----
    for (let o of this.obstacles) {
        ctx.fillStyle = "#ff5555";
        ctx.beginPath();
        ctx.save();
        ctx.translate(o.x, o.y);
        ctx.rotate(Math.random()*Math.PI/6); // lekki obrót dla naturalności
        ctx.fillRect(-o.width/2, -o.height, o.width, o.height);
        ctx.restore();
    }

    // ---- Dodatkowe cienie toru dla głębi ----
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${0.05*i})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(this.centerX, this.centerY,
            this.innerRadiusX + i*5,
            this.innerRadiusY + i*5,
            0, 0, Math.PI*2);
        ctx.stroke();
    }
}


}
