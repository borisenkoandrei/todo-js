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

let tasksArray = [];

function idInk() {
    id++;
    return id;
}

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

    addToTaskArray(value, id, taskContainer.classList.contains("checked"));

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

    if (tasksItem.changeTaskTitleq.call(this).classList.contains("disactive")){
        tasksItem.changeTaskTitleq.call(this).value = tasksItem.taskTitleq.call(this).innerHTML;
        tasksItem.changeButtonq.call(this).innerText = "Сохранить";
        tasksItem.checkboxq.call(this).classList.toggle("disactive");
        tasksItem.taskTitleq.call(this).classList.toggle("disactive");
        tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
        tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
        tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");
    } else{
        tasksItem.taskTitleq.call(this).innerHTML = tasksItem.changeTaskTitleq.call(this).value;
        tasksItem.changeButtonq.call(this).innerText = "Изменить";
        tasksItem.checkboxq.call(this).classList.toggle("disactive");
        tasksItem.taskTitleq.call(this).classList.toggle("disactive");
        tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
        tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
        tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");

        editTaskArray(tasksItem.changeTaskTitleq.call(this).value, tasksItem.taskq.call(this).id)

    }



}

function cancelButtonEvent(event){
    tasksItem.checkboxq.call(this).classList.toggle("disactive");
    tasksItem.taskTitleq.call(this).classList.toggle("disactive");
    tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
    tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
    tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");

    tasksItem.changeTaskTitleq.call(this).value = "";

}

function deleteButtonEvent(event){
    Tasks.removeChild(tasksItem.taskq.call(this));
}

function addToTaskArray(value, id, status) {
    let taskArrayItem = {
        value: value,
        id: id,
        status: status
    };

    tasksArray.push(taskArrayItem);
}

function editTaskArray(newValue, id) {
    tasksArray.forEach(function (item, index) {
        if (item.id == id){

            let n = {
                value: newValue,
                id: id,
                status: item.status
            };

            tasksArray.splice(index, 1, n);
        }
    });

    console.log(tasksArray);
}

// function addToLocalStorage(text, id) {
//
// }
//
// function loadFromLocalStorage() {
//
// }


Add.addEventListener("click",addNewTask);









