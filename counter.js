const PomodoroTimer = () => {
  const counter = document.getElementById("counter");
  const sessionValue = document.getElementById("session-time");
  const breakValue = document.getElementById("break-time");
  const btn = document.getElementById("btn");
  const status = document.getElementById("counter-status");
  const timer = document.getElementById("timer");
  const restart = document.getElementById("restart");
  const arrows = document.querySelectorAll("em");

  let seconds = 0;
  let minutes = sessionValue.textContent;
  let sessionTime = true;
  let counterOn = false;
  let oldSessionValue = sessionValue.textContent;
  let oldBreakValue = breakValue.textContent;
  let sValue = sessionValue.textContent;
  let bValue = breakValue.textContent;
  resetTime = () => {
    seconds = 0;
    minutes = sessionTime ? sessionValue.textContent : breakValue.textContent;
    timer.textContent = sessionTime ? `${sValue}:00` : `${bValue}:00`;
    counter.classList.remove("paused");
    counter.classList.remove("active");
    counter.classList.add("restarted");
    btn.textContent = "START";

    clearInterval(counterOn);
  };

  changeStatus = () => {
    btn.textContent = "";
    let action;
    if (counter.classList.contains("active")) {
      action = counter.classList.contains("paused") ? "ZATRZYMAJ" : "WZNÓW";
      counter.classList.toggle("paused");
      counter.classList.remove("restarted");
    } else {
      counter.classList.add("active");
      counter.classList.remove("restarted");
      action = "ZATRZYMAJ";
    }

    setTimeout(() => {
      btn.textContent = action;
    }, 100);
    counterControl();
  };

  changeTime = (e) => {
    let elId = e.target.id;

    clearInterval(counterOn);

    if (elId === "time-less" || elId === "time-more") {
      elId === "time-less" ? sValue-- : sValue++;
    } else if (elId === "break-less" || elId === "break-more") {
      elId === "break-less" ? bValue-- : bValue++;
    }
    if (sValue < 1 || bValue < 1) {
      alert("Wybrana wartość musi być większa od 0");
      sValue < 1 ? sValue++ : bValue++;
    }
    if (sValue >= 60 || bValue >= 60) {
      alert("Wybrana wartość musi być mniejsza od 60");
      sValue >= 60 ? sValue-- : bValue--;
    }
    if (counterOn) {
      counter.classList.add("paused");
      btn.textContent = "WZNÓW";
    } else {
      minutes = sValue;
    }

    sessionValue.textContent = sValue;
    breakValue.textContent = bValue;
    status.textContent = sessionTime ? "Nauka" : "Przerwa";
    timer.textContent = `${minutes >= 10 ? minutes : "0" + minutes}:${
      seconds >= 10 ? seconds : "0" + seconds
    }`;
  };
  count = () => {
    if (minutes > 0 || (minutes === 0 && seconds > 0)) {
      if (seconds > 0) {
        seconds--;
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      alert(sessionTime ? "Pora na przerwę." : "Pora na naukę.");
      sessionTime = !sessionTime;
      minutes = sessionTime ? sessionValue.textContent : breakValue.textContent;
      status.textContent = sessionTime ? "Nauka" : "Przerwa";
    }

    timer.textContent = `${minutes >= 10 ? minutes : "0" + minutes}:${
      seconds >= 10 ? seconds : "0" + seconds
    }`;
  };

  counterControl = () => {
    if (
      !counter.classList.contains("paused") &&
      counter.classList.contains("active")
    ) {
      counterOn = setInterval(count, 1000);
    } else {
      clearInterval(counterOn);
    }
  };
  btn.addEventListener("click", changeStatus);
  for (let arrow of arrows) {
    arrow.addEventListener("click", changeTime);
  }
  restart.addEventListener("click", resetTime);
};

PomodoroTimer();
