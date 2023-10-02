let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// let counter = docucument.querySelector(".counter")

let arrayOfTasks = [];


if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


getDataFromLocalStorage();


submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); 
    input.value = ""; 
  }
};


tasksDiv.addEventListener("click", (e) => {

  if (e.target.classList.contains("del")) {

    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
  
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    e.target.classList.toggle("done");
  }
});
//
// tasksDiv.addEventListener("click", (e) => {
//     // Delete Button
//     if (e.target.classList.contains("del")) {
//       // Remove Task From Local Storage
//       editTaskWith(e.target.parentElement.getAttribute("edit-input"));
//       // Remove Element From Page
//       e.target.parentElement.edit(); 
   
//     }});
    //   
    
function addTaskToArray(taskText) {

  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
 
  arrayOfTasks.push(task);
 
  addElementsToPageFrom(arrayOfTasks);

  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {

  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {

    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
  
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
 
    div.appendChild(span);
  
    tasksDiv.appendChild(div);

    
    // let spann = document.createElement("span");
    // span.className = "edit";
    // span.appendChild(document.createTextNode("edit"));
 
    // div.appendChild(span);
  
    // tasksDiv.appendChild(div);
  });

//jhgfd
// tasksDiv.addEventListener("click ", (e)=> {
// div.setAttribute("edit", task.id);
//     div.appendChild(document.createTextNode(task.title));
  
//     let span = document.createElement("button");
//     button.className = "edit";
//     span.appendChild(document.createTextNode("edit"));
 
//     div.appendChild(button);
  
//     tasksDiv.appendChild(div);
    
// });
}
//jhgfd
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {

  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
//
// function editTaskWith(taskId) {

//   arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
//   addDataToLocalStorageFrom(arrayOfTasks);
// }
//
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  
  addDataToLocalStorageFrom(arrayOfTasks);
}
