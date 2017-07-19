const Tasks = document.querySelector(".tasks");
const Add = document.querySelector(".add-task");
const TaskText = document.querySelector(".new-task-text");
var id = 0;

var tasksItem = {
    taskq : function(){return this.closest(".task")},
    checkboxq : function () {return this.closest(".task").querySelector(".checkbox")},
    changeButtonq : function () {return this.closest(".task").querySelector(".change-button")} ,
    deleteButtonq : function () {return this.closest(".task").querySelector(".delete-button")},
    cancelButtonq : function () {return this.closest(".task").querySelector(".cancel-button")},
    taskTitleq : function () {return this.closest(".task").querySelector(".task-name")},
    changeTaskTitleq : function () {return this.closest(".task").querySelector(".changeTaskTitle")}
};



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
    changeButton.addEventListener("click",changeButtonEvent);
    cancelButton. addEventListener("click",cancelButtonEvent);
    deleteButton. addEventListener("click",deleteButtonEvent);
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

    // console.log(tasksItem.taskq.call(this));
    // console.log(tasksItem.checkboxq.call(this));
    // console.log(tasksItem.deleteButtonq.call(this));
    // console.log(tasksItem.cancelButtonq.call(this));
    // console.log(tasksItem.changeButtonq.call(this));
    // console.log(tasksItem.taskTitleq.call(this));
    // console.log(tasksItem.changeTaskTitleq.call(this));


    // let task = this.closest(".task");
    // let checkbox = task.querySelector(".checkbox");
    // let changeButton = this;
    // let deleteButton = task.querySelector(".delete-button");
    // let cancelButton = task.querySelector(".cancel-button");
    // let taskTitle = task.querySelector(".task-name");
    // let changeTaskTitle = task.querySelector(".changeTaskTitle");

    if (tasksItem.changeTaskTitleq.call(this).classList.contains("disactive")){
        tasksItem.changeTaskTitleq.call(this).value = tasksItem.taskTitleq.call(this).innerHTML;
        tasksItem.checkboxq.call(this).classList.toggle("disactive");
        tasksItem.taskTitleq.call(this).classList.toggle("disactive");
        tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
        tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
        tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");
    } else{
        tasksItem.taskTitleq.call(this).innerHTML = tasksItem.changeTaskTitleq.call(this).value;
        tasksItem.checkboxq.call(this).classList.toggle("disactive");
        tasksItem.taskTitleq.call(this).classList.toggle("disactive");
        tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
        tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
        tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");
    }



}

function cancelButtonEvent(event){
    // let task = this.closest(".task");
    // let checkbox = task.querySelector(".checkbox");
    // let changeButton = this;
    // let deleteButton = task.querySelector(".delete-button");
    // let cancelButton = task.querySelector(".cancel-button");
    // let taskTitle = task.querySelector(".task-name");
    // let changeTaskTitle = task.querySelector(".changeTaskTitle");

    tasksItem.checkboxq.call(this).classList.toggle("disactive");
    tasksItem.taskTitleq.call(this).classList.toggle("disactive");
    tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
    tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
    tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");

    tasksItem.changeTaskTitleq.call(this).value = "";

}

function deleteButtonEvent(event){
    console.log(Tasks);
    console.log(tasksItem.taskq.call(this));
    Tasks.removeChild(tasksItem.taskq.call(this));
}



Add.addEventListener("click",addNewTask);









