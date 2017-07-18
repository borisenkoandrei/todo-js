const Tasks = document.querySelector(".tasks");
const Add = document.querySelector(".add-task");
const TaskText = document.querySelector(".new-task-text");
var id = 0;

function idInk() {
    id++;
    return id;
}
let tasksArray = [];

function addNewTask(event) {
    event.preventDefault();

    if (TaskText.value === ""){
        alert("Task is empty");
        return;
    }

    let task = createTask(TaskText.value);
    Tasks.appendChild(task);

    TaskText.value = "";

}

function createTask(value, id){
    !id ? id = idInk(): id;

    let taskContainer = document.createElement("li");
    taskContainer.setAttribute("class", "task");
    taskContainer.setAttribute("id", id);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("class", "checkbox");

    let taskTitle = document.createElement('div');
    taskTitle.setAttribute("class", "task-name");
    taskTitle.innerText = value;

    let taskNameContainer = document.createElement("label");
    taskNameContainer.setAttribute("class","active");

    let changeTaskTitle = document.createElement("input");
    changeTaskTitle.setAttribute("class","changeTaskTitle disactive");
    changeTaskTitle.setAttribute("type","text");
    changeTaskTitle.setAttribute("placeholder","Task...");

    let changeButton = document.createElement("button");
    changeButton.setAttribute("class", "change-button");
    changeButton.innerText = "Изменить";

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.innerText = "Удалить";

    let cancelButton = document.createElement("button");
    cancelButton.setAttribute("class", "cancel-button disactive");
    cancelButton.innerText = "Отмена";

    taskNameContainer.appendChild(checkbox);
    taskNameContainer.appendChild(taskTitle);
    taskNameContainer.appendChild(changeTaskTitle);
    taskContainer.appendChild(taskNameContainer);
    taskContainer.appendChild(changeButton);
    taskContainer.appendChild(deleteButton);
    taskContainer.appendChild(cancelButton);

    addEvents(taskContainer);
    return taskContainer;
}

function addEvents(task) {
    let checkbox = task.querySelector(".checkbox");
    let changeButton = task.querySelector(".change-button");
    let cancelButton = task.querySelector(".cancel-button");
    let deleteButton = task.querySelector(".delete-button");

    checkbox.addEventListener("click",checkboxEvent);
    changeButton.addEventListener("click",changeButtonEvent)


}

function checkboxEvent(event){
    let task = this.closest(".task");
    let checkbox = this;
    let changeButton = task.querySelector(".change-button");
    let deleteButton = task.querySelector(".delete-button");
    let taskTitle = task.querySelector(".task-name");

    if(checkbox.checked){
        changeButton.setAttribute("disabled", null);
        deleteButton.setAttribute("disabled", null);
        taskTitle.style.textDecoration = "line-through";
    } else {
        changeButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
        taskTitle.style.textDecoration = "none";
    }
}

function changeButtonEvent (event) {
    let task = this.closest(".task");
    let checkbox = task.querySelector(".checkbox");
    let changeButton = this;
    let deleteButton = task.querySelector(".delete-button");
    let cancelButton = task.querySelector(".cancel-button");
    let taskTitle = task.querySelector(".task-name");
    let changeTaskTitle = task.querySelector(".changeTaskTitle");

    if (changeTaskTitle.classList.contains("disactive")){
        checkbox.classList.toggle("disactive");
        taskTitle.classList.toggle("disactive");
        deleteButton.classList.toggle("disactive");
        cancelButton.classList.toggle("disactive");
        changeTaskTitle.classList.toggle("disactive");
    } else{
        taskTitle.innerHTML = changeTaskTitle.value;
        checkbox.classList.toggle("disactive");
        taskTitle.classList.toggle("disactive");
        deleteButton.classList.toggle("disactive");
        cancelButton.classList.toggle("disactive");
        changeTaskTitle.classList.toggle("disactive");
    }



}

Add.addEventListener("click",addNewTask);









