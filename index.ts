type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const listItems = document.querySelector<HTMLBodyElement>(".list-div");
const list = document.querySelector("#list") as HTMLUListElement;
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const clear = document.getElementById("clearTodo");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) {
    alert("Empty field?");
    return;
  }

  const newTask: Task = {
    id: Math.random().toString(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = "";
});

clear?.addEventListener("click", () => {
  clearTodo();
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const btn = document.createElement("button");
  label.classList.add("flex-box", "label-div");
  btn.append("X");
  btn.classList.add("btn-remove");
  btn.addEventListener("click", (e) => {
    list?.removeChild(item);
    removeTask(task.id);
  });
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  const parentDiv = document.createElement("div");
  const title = document.createElement("p");
  parentDiv.classList.add("flex-box");
  title.append(task.title);
  parentDiv.append(checkbox, title);
  label.append(parentDiv, btn);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

function removeTask(id: string) {
  // ----------Method 1------
  const result = tasks.filter((val) => val.id === id);
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
  listItems?.removeChild(list);
}
