const date_picker_element = document.querySelector('.date-picker');
let selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;
selected_date_element.textContent = "choose date...";

populateDates();

// EVENT LISTENERS..
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// functions.
function toggleDatePicker(e) {
  if (!checkEventPathForClass(e.path, 'dates')) {
    dates_element.classList.toggle('active');
  }
}

function goToNextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  date.setMonth(date.getMonth() + 1);
  populateDates();
}

function goToPrevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  date.setMonth(date.getMonth() - 1);
  populateDates();
}

function populateDates() {
  date.setDate(1);
  mth_element.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  let days = "";
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="day">${i}</div>`;
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    days_element.innerHTML = days;
  }

  function setSelectedDays() {
    let crtDaysEle = Array.from(document.querySelectorAll(".day"));
    for (let i = 0; i < crtDaysEle.length; i++) {
      if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
        crtDaysEle[i].classList.add('selected');
      }
    
      crtDaysEle[i].addEventListener("click", () => {
        console.log("getiing fired on days" );
        console.log("simply month", month);
        selectedDate = new Date((year) + '-' + (month + 1) + '-' + (i + 1));
        console.log("selectedDate", selectedDate);
        selectedDay = i + 1;
        if (selectedDay < 10) {
          selectedDay = `0${i + 1}`;
        }

        selectedMonth = month;
        selectedYear = year;
        selected_date_element.textContent = formatDate(selectedDate);
        populateDates();
      });
    }
  }
  setSelectedDays();
};

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  let year = d.getFullYear();
  return day + ' / ' + month + ' / ' + year;
}
