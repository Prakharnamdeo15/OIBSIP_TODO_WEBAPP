const inputText = document.querySelector(".input input");
const addvalue = document.querySelector(".input button");
const todoList = document.querySelector(".todoList");

inputText.onkeyup = () => {
  let userData = inputText.value;

  if (userData.trim() != 0) {
    addvalue.classList.add("active");
  } else {
    addvalue.classList.remove("active");
  }
};

showTask();

addvalue.onclick = () => {
  let userData = inputText.value;

  if (userData != "") {
    let getLocalStorage = localStorage.getItem("New Todo");

    if (getLocalStorage === null) {
      todoArr = [];
    } else {
      todoArr = JSON.parse(getLocalStorage);
    }

    todoArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(todoArr));
    showTask();
  } else {
    alert("Error: Your todo text is empty!");
  }
};

function showTask() {
  let getLocalStorage = localStorage.getItem("New Todo");

  if (getLocalStorage == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(getLocalStorage);
  }

  let newLiTag = "";
  todoArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="Done" onclick="Done(${index})"><i class="fa-solid fa-circle-check"></i></span> <span onclick="Delete(${index})"><i class="fa-solid fa-trash-can"></i></span></li>`;
  });

  todoList.innerHTML = newLiTag;
  inputText.value = "";
}

function Delete(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  todoArr = JSON.parse(getLocalStorage);

  todoArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(todoArr));
  showTask();
}

function Done(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  todoArr = JSON.parse(getLocalStorage);

  todoArr[index] = todoArr[index].strike();
  localStorage.setItem("New Todo", JSON.stringify(todoArr));
  showTask();
}