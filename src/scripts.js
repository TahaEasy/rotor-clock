const rotorTops = document.querySelectorAll(".rotor-top");
const rotorTopEls = document.querySelectorAll(".rotor-top span");
const rotorBottomEls = document.querySelectorAll(".rotor-bottom span");
const rotorLeafEls = document.querySelectorAll(".rotor-leaf span");
const dateEl = document.querySelector(".date");

const date = new Date();

const putDate = () => {
  const day = date.toLocaleDateString("en-US", {
    day: "2-digit",
  });
  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const year = date.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const weekday = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  dateEl.innerHTML = `${month} ${day} ${year}  <span>${weekday}</span>`;
};

putDate();

let numTimeout;
let resetTimeout;

const putNum = (second, i) => {
  [...rotorLeafEls].at(i).innerHTML = second;
  [...rotorTops].at(i).classList.add("flip");
  numTimeout = setTimeout(() => {
    [...rotorTopEls].at(i).innerHTML = second;
    [...rotorTopEls].at(i).classList.add("flip-num");
  }, 240);
  resetTimeout = setTimeout(() => {
    [...rotorBottomEls].at(i).innerHTML = second;
    [...rotorTops].at(i).classList.remove("flip");
    [...rotorTopEls].at(i).classList.remove("flip-num");
  }, 500);
};

let savedSecond = `${date.getSeconds()}`.padStart(2, "0").at(-1);
let savedSecondTens = `${date.getSeconds()}`.padStart(2, "0").at(0);
let savedMinute = `${date.getMinutes()}`.padStart(2, "0").at(-1);
let savedMinuteTens = `${date.getMinutes()}`.padStart(2, "0").at(0);
let savedHour = `${date.getHours()}`.padStart(2, "0").at(-1);
let savedHourTens = `${date.getHours()}`.padStart(2, "0").at(0);

const putNums = (initializing = false) => {
  const now = new Date();

  const second = `${now.getSeconds()}`.padStart(2, "0").at(-1);
  const secondTens = `${now.getSeconds()}`.padStart(2, "0").at(0);

  if (second !== savedSecond || initializing) {
    putNum(second, 5);
    savedSecond = second;
  }
  if (secondTens !== savedSecondTens || initializing) {
    putNum(secondTens, 4);
    savedSecondTens = secondTens;
  }

  const minute = `${now.getMinutes()}`.padStart(2, "0").at(-1);
  const minuteTens = `${now.getMinutes()}`.padStart(2, "0").at(0);

  if (minute !== savedMinute || initializing) {
    putNum(minute, 3);
    savedMinute = minute;
  }
  if (minuteTens !== savedMinuteTens || initializing) {
    putNum(minuteTens, 2);
    savedMinuteTens = minuteTens;
  }

  const hour = `${now.getHours()}`.padStart(2, "0").at(-1);
  const hourTens = `${now.getHours()}`.padStart(2, "0").at(0);

  if (hour !== savedHour || initializing) {
    putNum(hour, 1);
    savedHour = hour;
    putDate();
  }
  if (hourTens !== savedHourTens || initializing) {
    putNum(hourTens, 0);
    savedHourTens = hourTens;
  }
};

putNums(true);

setTimeout(() => {
  setInterval(() => {
    clearTimeout(numTimeout);
    clearTimeout(resetTimeout);

    putNums();
  }, 1000);
}, 1000 - date.getMilliseconds());
