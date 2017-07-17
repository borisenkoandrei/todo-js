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
    checkbox.setAttribute("class", "checkbox");

    let taskName = document.createElement('div');
    taskName.setAttribute("class", "task-name");
    taskName.innerText = TaskText.value;

    let taskNameContainer = document.createElement("label");
    taskNameContainer.setAttribute("class","active");

    let taskText = document.createElement("input");
    taskText.setAttribute("class","task-text");
    taskText.setAttribute("type","text");
    taskText.setAttribute("placeholder","Task...");

    let changeButton = document.createElement("button");
    changeButton.setAttribute("class", "change-button");
    changeButton.innerText = "Изменить";

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.innerText = "Удалить";

    let cancelButton = document.createElement("button");
    cancelButton.setAttribute("class", "cancel-button");
    cancelButton.innerText = "Отмена";

    taskNameContainer.appendChild(checkbox);
    taskNameContainer.appendChild(taskName);
    taskNameContainer.appendChild(taskText);
    taskContainer.appendChild(taskNameContainer);
    taskContainer.appendChild(changeButton);
    taskContainer.appendChild(deleteButton);
    taskContainer.appendChild(cancelButton);

    Tasks.appendChild(taskContainer);

    TaskText.value = "";
}


function changeTask(e) {
    let target = e.target;
    let task = target.closest(".task");
    let taskName = task.querySelector(".task-name");
    let changeTaskName = task.querySelector(".task-text");
    let deleteButton = task.querySelector(".delete-button");
    let cancelButton = task.querySelector(".cancel-button");


    if (target.className === "change-button" && !taskName.classList.contains("disactive")){

        taskName.classList.toggle("disactive");
        changeTaskName.value = taskName.innerHTML;
        changeTaskName.classList.toggle("active");

        deleteButton.classList.toggle("disactive");
        cancelButton.classList.toggle("active");

    } else if (target.className === "change-button" && taskName.classList.contains("disactive")){
        taskName.classList.toggle("disactive");
        taskName.innerHTML = changeTaskName.value;
        changeTaskName.classList.toggle("active");

        deleteButton.classList.toggle("disactive");
        cancelButton.classList.toggle("active");
    } else if (target.classList.contains("cancel-button")){
        console.log('OK')
        taskName.classList.toggle("disactive");
        changeTaskName.classList.toggle("active");

        deleteButton.classList.toggle("disactive");
        cancelButton.classList.toggle("active");
    } else if (target.className === "delete-button") {
        Tasks.removeChild(task);
    }
}

function reversedActiveElement(activeElement, disactiveElement) {
    activeElement.classList.toggle("disactive");
    disaciveElement.classList.toggle("active");


}

Add.addEventListener("click",addNewTask);
Tasks.addEventListener('click', changeTask);








