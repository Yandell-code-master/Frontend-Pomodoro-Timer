let tiempo = document.getElementById("tiempo");
let btnIniciar = document.getElementById("btn-iniciar");
let btnPomodoro = document.getElementById("btn-pomodoro");
let btnSBreak = document.getElementById("btn-sbreak");
let btnLBreak = document.getElementById("btn-lbreak");

let active = false;
let interval = null;
let tiempoInicial = "25:00";

let POMODORO_TIME = 25;
let SHORT_BREAK_TIME = 5;
let LONG_BREAK_TIME = 15;
let currentMode = "pomodoro";

let btnClicked = null;

function formatMinutesToTime(minutes) {
    return String(minutes).padStart(2, '0') + ":00";
}

function cambiarEstiloIniciado() {
    let btnOmitir = document.getElementById("btn-omitir");
    btnOmitir.classList.add("btn-visible");
    btnOmitir.classList.remove("btn-invisible");

    btnIniciar.innerText = "PAUSE";

    btnIniciar.classList.remove("btn-iniciar-desactivado");
    btnIniciar.classList.add("btn-iniciar-activado");
}

function cambiarEstiloNoIniciado() {
    let btnOmitir = document.getElementById("btn-omitir");
    btnIniciar.innerText = "START"

    btnOmitir.classList.add("btn-invisible");
    btnOmitir.classList.remove("btn-visible")

    btnIniciar.classList.add("btn-iniciar-desactivado");
    btnIniciar.classList.remove("btn-iniciar-activado");
}

function cambiarPresionadoEstilo(btn) {
    btn.classList.add("btn-contenedor-reloj-pressed")
    btn.classList.remove("btn-contenedor-noPressed");
}

function cambiarNoPresionadoEstilo(btn) {
    btn.classList.add("btn-contenedor-reloj-noPressed")
    btn.classList.remove("btn-contenedor-reloj-pressed");
}

function manejarClick(btn) {
    if (btnClicked) {
        cambiarNoPresionadoEstilo(btnClicked);
        cambiarPresionadoEstilo(btn);
    } else {
        cambiarPresionadoEstilo(btn);
    }

    btnClicked = btn;
}

document.addEventListener("DOMContentLoaded", function () {
    manejarClick(btnPomodoro);

    btnIniciar.addEventListener("click", function () {
        let buttonSound = new Audio('resources/ui-click-43196.mp3');
        buttonSound.play();

        if (active) {
            pausarCronometro();
            cambiarEstiloNoIniciado();
        } else {
            interval = setInterval(restarTiempo, 1000);
            active = true;
            cambiarEstiloIniciado();
        }
    });

    btnPomodoro.addEventListener("click", () => configuracionInicial("pomodoro", POMODORO_TIME));
    btnSBreak.addEventListener("click", () => configuracionInicial("shortBreak", SHORT_BREAK_TIME));
    btnLBreak.addEventListener("click", () => configuracionInicial("longBreak", LONG_BREAK_TIME));
});

function configuracionInicial(mode, minutes) {
    pausarCronometro();
    cambiarEstiloNoIniciado();
    currentMode = mode;
    tiempoInicial = formatMinutesToTime(minutes);
    tiempo.innerText = tiempoInicial;

    if (mode === "pomodoro") {
        manejarClick(btnPomodoro);
    } else if (mode === "shortBreak") {
        manejarClick(btnSBreak);
    } else if (mode === "longBreak") {
        manejarClick(btnLBreak);
    }
}

function pausarCronometro() {
    active = false;
    clearInterval(interval);
}

function restarTiempo() {
    let tiempoTexto = tiempo.innerText;
    let minutos = parseInt(tiempoTexto.substring(0, 2));
    let segundos = parseInt(tiempoTexto.substring(3, 5));

    if (minutos === 0 && segundos === 0) {
        let buttonSound = new Audio('resources/alarm.wav');
        buttonSound.play();

        pausarCronometro();
        tiempo.innerText = tiempoInicial;
        cambiarEstiloNoIniciado();
        return;
    }

    if (segundos === 0) {
        segundos = 59;
        minutos--;
    } else {
        segundos--;
    }

    let minStr = String(minutos).padStart(2, '0');
    let segStr = String(segundos).padStart(2, '0');

    tiempo.innerText = `${minStr}:${segStr}`;
}