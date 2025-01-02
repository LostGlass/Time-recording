// БЛОК С ID (НАЧАЛО)//
var startTimerOnClick = document.getElementById("start_time");
var stopTimerOnClick = document.getElementById("stop_time");
var saveTime = document.getElementById("SaveTime");
var showPopUpIcons = document.getElementById("showBar_saveTime");
var closeUpIcons = document.getElementById("close_save_time_window");
var action_confirmation = document.getElementById("action_confirmation_id");
var resetTimePopUpIcons = document.getElementById("ResetTime");
var actionConfirmationYes = document.getElementById("action_confirmation_yes");
var main_timerID = document.getElementById("main_timer");
var actionConfirmationNo = document.getElementById("action_confirmation_no");
var timeBlock = document.getElementById("time_block_control_container_id");
var timeControlWindowRoll = document.getElementById(
  "time_control_window_roll_up_and_roll_down_unit_id"
);
var ikonsTimeControlWindowRoll = document.getElementById(
  "ikons_time_control_window_roll_id"
);
var exitInRegistration = document.getElementById("exit_in_registration");
// БЛОК С ID (КОНЕЦ)//

// БЛОК ОБЬЯВЛЕНИЯ ДАННЫХ(НАЧАЛО)//
var startStopTime = Boolean;
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = "";
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0;
// init = 0;

// БЛОК ОБЬЯВЛЕНИЯ ДАННЫХ(КОНЕЦ)//

async function generateSaveTimeBloc(readout) {
  const date = new Date();
  const newDiv = document.createElement("div");
  const buttonDeleteTime = document.createElement("button");
  const theLastChild = timeBlock.lastChild;
  const theLastChildNewDiv = newDiv.lastChild;
  const a = (buttonDeleteTime.innerHTML = "Delete");
  const b = buttonDeleteTime.classList.add("button_delete_time_save_vindow");
  const ab =
    (newDiv.innerHTML = `<span>${date.toLocaleDateString()} --- ${readout}</span>`);
  const aw = timeBlock.insertBefore(newDiv, theLastChild);
  const ar = newDiv.insertBefore(buttonDeleteTime, theLastChildNewDiv);

  var data = [];
  data.push(newDiv);
  data.push(buttonDeleteTime);
  data.push(theLastChild);
  data.push(theLastChildNewDiv);
  data.push(a);
  data.push(b);
  data.push(ab);
  data.push(aw);
  data.push(ar);

  const response = await fetch("http://localhost:2000/server/html", {
    method: "POST",
    mode: "no-cors",
    body: data,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse);

  return true;
}

// БЛОК С АКТИВНЫМИ СОБЫТИЯМИ (НАЧАЛО)//
// exitInRegistration.addEventListener("click", () => {
//   localStorage.getItem();
// });

timeControlWindowRoll.addEventListener("click", () => {
  timeBlock.classList.toggle("active");
  ikonsTimeControlWindowRoll.classList.toggle("active");
});

startTimerOnClick.addEventListener("click", () => {
  StartStop();
  stopTimerOnClick.classList.add("active");
  startTimerOnClick.classList.add("active");
});

stopTimerOnClick.addEventListener("click", () => {
  stopTime();
  startTimerOnClick.classList.remove("active");
  stopTimerOnClick.classList.remove("active");
});

stopTimerOnClick.addEventListener("click", () => {
  showPopUpIcons.classList.add("active");
});
closeUpIcons.addEventListener("click", () => {
  action_confirmation.classList.add("active");
});

actionConfirmationYes.addEventListener("click", () => {
  showPopUpIcons.classList.remove("active");
  ClearСlock();
  action_confirmation.classList.remove("active");
});
actionConfirmationNo.addEventListener("click", () => {
  action_confirmation.classList.remove("active");
});
resetTimePopUpIcons.addEventListener("click", () => {
  showPopUpIcons.classList.remove("active");
  ClearСlock();
});

// /////////+/

saveTime.addEventListener("click", () => {
  generateSaveTimeBloc(readout);
  ClearСlock();
  showPopUpIcons.classList.remove("active");
  action_confirmation.classList.remove("active");
});
// /////////+/

// БЛОК С АКТИВНЫМИ СОБЫТИЯМИ (КОНЕЦ)//

// БЛОК СИСТЕМЫ ОТСЧЕТА(НАЧАЛО)//

function stopTime() {
  startStopTime = false;
  main_timerID.classList.remove("active");
  document.getElementById("timer_wariableJS").innerHTML = readout;
}

//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = "00:00:00";
  document.MyForm.stopwatch.value = readout;
}

// Функция запуска и остановки
function StartStop() {
  // if (init == 0) {
  // ClearСlock();
  startStopTime = true;
  cheked = 1;
  dateObj = new Date();
  StartTIME();
  // init = 1;
  // }
  main_timerID.classList.add("active");
}

//функция для старта секундомера
function StartTIME() {
  const cdateObj = new Date();
  const t = cdateObj.getTime() - dateObj.getTime() - s * 1000;
  if (startStopTime) {
    if (t > 999) {
      s++;
    }
    if (s >= m * base) {
      ts = 0;
      m++;
    } else {
      ts = parseInt(ms / 100 + s);
      if (ts >= base) {
        ts = ts - (m - 1) * base;
      }
    }
    if (m > h * base) {
      tm = 1;
      h++;
    } else {
      tm = parseInt(ms / 100 + m);
      if (tm >= base) {
        tm = tm - (h - 1) * base;
      }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
      ms = 0;
    }
    if (ms == 0) {
      ms = "00";
    }
    if (ms > 0 && ms <= 9) {
      ms = "0" + ms;
    }
    if (ts > 0) {
      ds = ts;
      if (ts < 10) {
        ds = "0" + ts;
      }
    } else {
      ds = "00";
    }
    dm = tm - 1;
    if (dm > 0) {
      if (dm < 10) {
        dm = "0" + dm;
      }
    } else {
      dm = "00";
    }
    dh = h - 1;
    if (dh > 0) {
      if (dh < 10) {
        dh = "0" + dh;
      }
    } else {
      dh = "00";
    }
    readout = dh + ":" + dm + ":" + ds;
    document.MyForm.stopwatch.value = readout;
    clocktimer = setTimeout("StartTIME()");
  }
}
// БЛОК СИСТЕМЫ ОТСЧЕТА(КОНЕЦ)//

//БЛОК СОХРАНЕНИЯ ДАННЫХ ВРЕМЕНИ ПОЛЬЗОВАТЕЛЯЯ (НАЧАЛО)//

//БЛОК СОХРАНЕНИЯ ДАННЫХ ВРЕМЕНИ ПОЛЬЗОВАТЕЛЯЯ (КОНЕЦ)//
