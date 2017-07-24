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

    addTaskInArray(TaskText.value, task.id);
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

function addTask(value, id, status){

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

    if (status === false){
        console.log(taskContainer);
        taskContainer.classList = "dasdasdasdasd";
        console.log(taskContainer)
    }

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
    cancelButton.addEventListener("click",cancelButtonEvent);
    deleteButton.addEventListener("click",deleteButtonEvent);
}




function checkboxEvent(){
    let task = this.closest(".task");
    let checkbox = this;
    let changeButton = task.querySelector(".change-button");
    let deleteButton = task.querySelector(".delete-button");
    let taskTitle = task.querySelector(".task-name");

    if(checkbox.checked){
        changeButton.setAttribute("disabled", null);
        deleteButton.setAttribute("disabled", null);
        taskTitle.style.textDecoration = "line-through";
        setTaskStatusInArray(task.id);
    } else {
        changeButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
        taskTitle.style.textDecoration = "none";
        setTaskStatusInArray(task.id);
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
        console.log("qwwwwwwwwww")
    } else{
        tasksItem.taskTitleq.call(this).innerHTML = tasksItem.changeTaskTitleq.call(this).value;
        tasksItem.checkboxq.call(this).classList.toggle("disactive");
        tasksItem.taskTitleq.call(this).classList.toggle("disactive");
        tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
        tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
        tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");
        changeTextInArray(tasksItem.taskq.call(this).id , tasksItem.changeTaskTitleq.call(this).value);
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
    let task = tasksItem.taskq.call(this);
    console.log(task);
    deleteTaskInArray(task.id);
    Tasks.removeChild(task);

}

/**
 * Работа с массивом задач
 */


function addTaskInArray(text, id) {
    let task =  {
        text: text,
        id: id,
        status: true
    };

    tasksArray.push(task);
    addToLocalStorage();
};

function deleteTaskInArray(id) {
    tasksArray.forEach(function (item, index) {
        if (item.id === id){
            tasksArray.splice(index, 1)
        }
    });
    addToLocalStorage();
}

function setTaskStatusInArray(id) {
    tasksArray.forEach(function (item, index) {
        if (item.id === id){
            let task =  {
                text: item.text,
                id: item.id,
                status: !item.status
            };

            tasksArray.splice(index, 1, task);
        }
    });
    addToLocalStorage();
}

function changeTextInArray(id, newText){
    tasksArray.forEach(function (item, index) {
        if (item.id === id){
            let task =  {
                text: newText,
                id: item.id,
                status: item.status
            };
            tasksArray.splice(index, 1, task);
        }
    });
    addToLocalStorage();
    console.log(tasksArray)
}


/**
 * LocalStorage
 */

function addToLocalStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

(function loadFromLocalStorage(){
    tasksArray = JSON.parse(localStorage.getItem('tasksArray')) ;
    tasksArray.forEach(function (item) {
        let task = addTask(item.text,item.id, item.status);
        Tasks.appendChild(task);
    })
})();

function init (){

}

Add.addEventListener("click",addNewTask);






