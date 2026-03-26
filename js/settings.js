document.addEventListener("DOMContentLoaded", function () {
    let okButton = document.querySelector("#settings-modal .modal-footer .btn-secondary");

    okButton.addEventListener("click", function () {
        let pomodoroInput = document.getElementById("pomodoro-number-settings");
        let shortBreakInput = document.getElementById("short-break-number-settings");
        let longBreakInput = document.getElementById("long-break-number-settings");

        POMODORO_TIME = parseInt(pomodoroInput.value) || 25;
        SHORT_BREAK_TIME = parseInt(shortBreakInput.value) || 5;
        LONG_BREAK_TIME = parseInt(longBreakInput.value) || 15;

        if (currentMode === "pomodoro") {
            tiempo.innerText = formatMinutesToTime(POMODORO_TIME);
            tiempoInicial = formatMinutesToTime(POMODORO_TIME);
        } else if (currentMode === "shortBreak") {
            tiempo.innerText = formatMinutesToTime(SHORT_BREAK_TIME);
            tiempoInicial = formatMinutesToTime(SHORT_BREAK_TIME);
        } else if (currentMode === "longBreak") {
            tiempo.innerText = formatMinutesToTime(LONG_BREAK_TIME);
            tiempoInicial = formatMinutesToTime(LONG_BREAK_TIME);
        }
    });
});
