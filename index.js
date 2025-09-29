const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");

    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("checked");

      ///toggleに何か足すときはCSSで定義をつける。
    }

    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", function () {
      li.classList.add("checked");
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  /*queryselectorは指定したセレクタに一致する最初のHTML要素を取得する*/
  const lists = document.querySelectorAll("li");
  const todos = [];

  lists.forEach((li) => {
    todos.push({
      text: li.innerText,
      completed: li.classList.contains("checked"),
    });
  });

  /*↑要復習 */

  localStorage.setItem("todos", JSON.stringify(todos));
}
