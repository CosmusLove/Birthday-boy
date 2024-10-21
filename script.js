const player = document.getElementById("player");
let isJumping = false;
let score = 0;

document.addEventListener("keydown", function(event) {
    if (event.key === " " && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    player.style.bottom = "150px"; // Zwiększona wysokość skoku
    setTimeout(function() {
        player.style.bottom = "20px";
        isJumping = false;
    }, 500);
}

function createCar() {
    const car = document.createElement("div");
    car.classList.add("car");
    // Losowo wybierz, z której strony wjedzie samochód
    car.style.left = Math.random() < 0.5 ? "0px" : "calc(100vw - 60px)"; 
    document.getElementById("game").appendChild(car);
    
    let carInterval = setInterval(function() {
        const carPosition = parseInt(car.style.left);
        
        // Przesuwanie samochodu w kierunku gracza
        car.style.left = (carPosition + (carPosition < window.innerWidth / 2 ? 5 : -5)) + "px";
        
        // Sprawdzenie kolizji
        if (
            carPosition > (window.innerWidth / 2 - 30) && 
            carPosition < (window.innerWidth / 2 + 30) && 
            parseInt(player.style.bottom) < 80 // Ustawienie wysokości kolizji
        ) {
            clearInterval(carInterval);
            alert("Koniec gry! Twój wynik: " + score);
            location.reload();
        }
        
        // Usuwanie samochodu, gdy wychodzi poza ekran
        if (carPosition < -60 || carPosition > window.innerWidth) {
            clearInterval(carInterval);
            car.remove();
            score++;
        }
    }, 20);
}

// Zmiana prędkości samochodów, aby były bardziej realistyczne
setInterval(createCar, 1500); // Tworzenie samochodów co 1,5 sekundy
