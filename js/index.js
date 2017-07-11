const Tasks = document.querySelector(".tasks");

const Add = document.querySelector(".add-task");
const Delete = document.querySelector(".delete-button");
const TaskText = document.querySelector(".new-task-text");

function addNewTask(e) {
    e.preventDefault();

    if(TaskText.value === ""){
        alert("Task is empty!");
        return;
    }

    let taskContainer = document.createElement("li");
    taskContainer.setAttribute("class", "task");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");

    let taskTitle = document.createElement("label");
    taskTitle.setAttribute("class","active");
    taskTitle.innerText = TaskText.value;


    let taskText = document.createElement("input");
    taskText.setAttribute("class","task-text disactive");
    taskText.setAttribute("type","text");
    taskText.setAttribute("placeholder","Task...");

    let changeButton = document.createElement("button");
    changeButton.setAttribute("class", "change-button");
    changeButton.innerText = "Изменить";

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.innerText = "Удалить";

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(changeButton);
    taskContainer.appendChild(deleteButton);

    Tasks.appendChild(taskContainer);

    TaskText.value = "";
};

Add.addEventListener("click",addNewTask);








