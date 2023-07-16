var listItems = document.querySelector(".list-div");
var list = document.querySelector("#list");
var form = document.getElementById("new-task-form");
var input = document.querySelector("#new-task-title");
var clear = document.getElementById("clearTodo");
var tasks = loadTasks();
tasks.forEach(addListItem);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null) {
        alert("Empty field?");
        return;
    }
    var newTask = {
        id: Math.random().toString(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    saveTasks();
    addListItem(newTask);
    input.value = "";
});
clear === null || clear === void 0 ? void 0 : clear.addEventListener("click", function () {
    clearTodo();
});
function addListItem(task) {
    var item = document.createElement("li");
    var label = document.createElement("label");
    var btn = document.createElement("button");
    label.classList.add("flex-box", "label-div");
    btn.append("X");
    btn.classList.add("btn-remove");
    btn.addEventListener("click", function (e) {
        list === null || list === void 0 ? void 0 : list.removeChild(item);
        removeTask(task.id);
    });
    var checkbox = document.createElement("input");
    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        saveTasks();
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    var parentDiv = document.createElement("div");
    var title = document.createElement("p");
    parentDiv.classList.add("flex-box");
    title.append(task.title);
    parentDiv.append(checkbox, title);
    label.append(parentDiv, btn);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    var taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
function removeTask(id) {
    // ----------Method 1------
    var result = tasks.filter(function (val) { return val.id === id; });
    tasks.splice(tasks.indexOf(result[0]), 1);
    // ----------Method 2------
    // for (var i = tasks.length - 1; i >= 0; i--) {
    //   if (tasks[i].id === id) {
    //     tasks.splice(i, 1);
    //   }
    // }
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function clearTodo() {
    localStorage.clear();
    listItems === null || listItems === void 0 ? void 0 : listItems.removeChild(list);
}
