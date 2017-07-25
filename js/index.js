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

/**
 *
 * Получаем id
 * @returns {number}
 */

function getId() {
    if (Tasks.lastChild){
        let id = +Tasks.lastChild.id + 1;
        return id;
    } else{
        return 1;
    }

}

/**
 * Массив с задачами
 * @type {Array}
 */

let tasksArray = [];

/**
 * Обработчик события для кнопки "добавить"
 * @param event
 */

function addNewTask(event) {
    event.preventDefault();

    if (TaskText.value === ""){
        alert("Task is empty");
        return;
    }

    let task = createTask(TaskText.value, getId());
    Tasks.appendChild(task);

    addTaskInArray(TaskText.value, task.id);
    TaskText.value = "";
}

/**
 * Создаем DOM элемент задачи и навешиваем на его элементы обработчики событий
 * @param value - текст задачи
 * @param id
 * @returns {Element}
 */

function createTask(value, id){

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

/**
 * Функция создания элемента задачи из LocalStorage
 *
 * @param value - текст задачи
 * @param id
 * @param status - статус задачи true - в работе, false - выполнена
 * @returns {Element}
 */

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
        let changeButton = taskContainer.querySelector(".change-button");
        let deleteButton = taskContainer.querySelector(".delete-button");
        let taskTitle = taskContainer.querySelector(".task-name");
        let checkbox = taskContainer.querySelector(".checkbox");

        changeButton.setAttribute("disabled", null);
        deleteButton.setAttribute("disabled", null);
        taskTitle.style.textDecoration = "line-through";
        checkbox.checked = "true";
    }

    addEvents(taskContainer);
    return taskContainer;

}

/**
 * Навешиваем обработчики событий на элементы задачи;
 * @param task
 */

function addEvents(task) {
    let checkbox = task.querySelector(".checkbox");
    let changeButton = task.querySelector(".change-button");
    let cancelButton = task.querySelector(".cancel-button");
    let deleteButton = task.querySelector(".delete-button");

    checkbox.addEventListener("click",checkboxEvent);
    changeButton.addEventListener("click",changeButtonEvent);
    cancelButton.addEventListener("click",cancelButtonEvent);
    deleteButton.addEventListener("click",deleteButtonEvent);
};




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

function changeButtonEvent () {
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
        changeTextInArray(tasksItem.taskq.call(this).id , tasksItem.changeTaskTitleq.call(this).value);
    }



}

function cancelButtonEvent(){
    tasksItem.checkboxq.call(this).classList.toggle("disactive");
    tasksItem.taskTitleq.call(this).classList.toggle("disactive");
    tasksItem.deleteButtonq.call(this).classList.toggle("disactive");
    tasksItem.cancelButtonq.call(this).classList.toggle("disactive");
    tasksItem.changeTaskTitleq.call(this).classList.toggle("disactive");
    tasksItem.changeTaskTitleq.call(this).value = "";

}

function deleteButtonEvent(){
    let task = tasksItem.taskq.call(this);
    deleteTaskInArray(task.id);
    Tasks.removeChild(task);

}

/**
 * Добавляем объект задачи в массив tasksArray
 *
 * @param text
 * @param id
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

/**
 * Удаляем объект задачи из массива tasksArray
 *
 * @param id
 */

function deleteTaskInArray(id) {
    tasksArray.forEach(function (item, index) {
        if (item.id === id){
            tasksArray.splice(index, 1)
        }
    });
    addToLocalStorage();
}

/**
 * Изменение статуса задачи в массиве tasksArray
 *
 * @param id
 */

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

/**
 *
 * Изменяем текст задачи
 *
 * @param id
 * @param newText
 */

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
}


/**
 * Добавление массива с задачами в Local Storage
 */

function addToLocalStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

/**
 * Загрузка масива с задачами из Local Storage
 */

function loadFromLocalStorage(){
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    tasksArray.forEach(function (item) {
        let task = addTask(item.text,item.id, item.status);
        Tasks.appendChild(task);
    })
}

/**
 * Проверка есть ли в LocalStorage данные, если есть добавляем оттуда
 */

(function init (){
    if (localStorage.getItem('tasksArray')){
        loadFromLocalStorage();
    }
})();

Add.addEventListener("click",addNewTask);






