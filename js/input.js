const Input = {
    keys: {},
    init() {
        // Klawiatura
        document.addEventListener("keydown", e => { this.keys[e.key] = true; });
        document.addEventListener("keyup", e => { this.keys[e.key] = false; });

        // Dotyk – przycisk przyspieszenia
        const upBtn = document.getElementById("upBtn"); // musisz mieć w HTML
        if (upBtn) {
            upBtn.addEventListener("touchstart", () => { this.keys["ArrowUp"] = true; });
            upBtn.addEventListener("touchend", () => { this.keys["ArrowUp"] = false; });
        }
    },
    down(key) {
        return this.keys[key];
    },
    press(key) { this.keys[key] = true; },
    release(key) { this.keys[key] = false; }
};
