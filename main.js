const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let tasks = [];
let count = 0;

window.addEventListener("DOMContentLoaded", function () {
  this.setInterval(() => printDate(), 1000);

  this.document
    .querySelector("#addTaskBtn")
    .addEventListener("click", function () {
      onInsertHandler({
        key: count + 1,
        task: document.querySelector("#inputTask").value.trim(),
        softDeleted: false,
      });
    });

  this.document
    .querySelector("#inputTask")
    .addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        onInsertHandler({
          key: count + 1,
          task: e.target.value.trim(),
          softDeleted: false,
        });
      }
    });
});

function printDate() {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const dayStr = days[day];
  const monthStr = months[month];

  const dateStr = `${dayStr}, ${date} ${monthStr} ${year}`;
  const timeStr = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  document.querySelector('#dateTxt').innerHTML = dateStr + ' ' + timeStr
}

function onInsertHandler(obj) {
  if(!obj?.task) return;

  insertTask(obj)
  reset()
}

function insertTask(obj) {
  tasks = [...tasks, obj]
  count++
  renderTasks()
}

function renderTasks() {
const container = document.querySelector('#tasksWrapper')

// TODO: Change the style of the inputTask
container.innerHTML = tasks.map((task) => 
  `<div id="${'noteTemplate' + task.key}" class="flex justify-between items-center px-[8px] py-[4px] mx-4 mb-2 border border-gray-800 rounded-[12px]">
      <div id="${'taskInfo' + task.key}" class="flex items-center">
        <input type="checkbox" id="${'taskCheck' + task.key}" onclick="strikeThrough(${task.key})" class="w-[20px] h-[20px] mr-[6px]" ${task.softDeleted ? 'checked' : ''}>
        <label id="${'taskTxt' + task.key}" for="${'taskCheck' + task.key}" class="w-[200px] leading-[1.2rem] overflow-hidden break-words whitespace-normal text-base ${task.softDeleted ? 'line-through text-gray-800': ''}">${task.task}</label>
      </div>
      <button type="button" id="${'taskDelBtn' + task.key}" class="w-[35px] h-[35px]" onclick="deleteTask(${task.key})">X</button>
    </div>`).join("")
}

function strikeThrough(key) {
  tasks = tasks.map((task)=> task.key === key ? {...task, softDeleted: !task.softDeleted} : task)
  renderTasks()
}

function deleteTask(key) {
  tasks = tasks.filter(task => task.key !== key)
  renderTasks()
}

function reset() {
  document.querySelector('#inputTask').value = ''
}


 
