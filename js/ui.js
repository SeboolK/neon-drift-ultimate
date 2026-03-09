const UI = {

    score: 0,
    combo: 1,

    init() {
        this.scoreEl = document.getElementById("score");
        this.comboEl = document.getElementById("combo");
        this.speedEl = document.getElementById("speed");
        this.nitroEl = document.getElementById("nitro");

        // paski graficzne
        this.speedBar = document.getElementById("speedBar");
        this.nitroBar = document.getElementById("nitroBar");
    },

    update(car) {

        // combo
        if(car.drift){
            this.score += this.combo;
            this.combo += 0.02;
        } else {
            this.combo = 1;
        }

        // wartości tekstowe
        this.scoreEl.innerText = Math.floor(this.score);
        this.comboEl.innerText = this.combo.toFixed(1);
        this.speedEl.innerText = Math.floor(car.speed * 10);
        this.nitroEl.innerText = Math.floor(car.nitro);

        // kolor combo (im większe combo, tym jaśniejszy kolor)
        let comboColor = `rgb(${Math.min(255, this.combo * 30)}, 255, 50)`;
        this.comboEl.style.color = comboColor;

        // animacja podskoku przy dużym combo
        if(this.combo > 5){
            this.comboEl.style.transform = "scale(1.5)";
        } else {
            this.comboEl.style.transform = "scale(1)";
        }

        // paski prędkości i nitro
        if(this.speedBar) {
            this.speedBar.style.width = Math.min(100, (car.speed / car.maxSpeed) * 100) + "%";
        }

        if(this.nitroBar) {
            this.nitroBar.style.width = Math.min(100, (car.nitro)) + "%";
        }
    }

};
