const inputValue = document.getElementById("inputValue");
const mainTodoElem = document.querySelector(".todo-lists-elem");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("myTodoList"));
};

const addTodoListLocalStorage =(localTodoLists)=>{
    return localStorage.setItem("myTodoList",JSON.stringify(localTodoLists));
}


let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  const divElem = document.createElement("div");
  divElem.classList.add("main_todo_div");
  divElem.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElem);
};

const AddTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();

  inputValue.value = "";

  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);
    localStorage.setItem("myTodoList", JSON.stringify(localTodoLists));

    addTodoDynamicElement(todoListValue);
  }
};
const showTodoList = () => {
  console.log(localTodoLists);
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

// remove the data

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem =todoToRemove.parentElement;
  console.log(todoListContent);

  localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorage(localTodoLists); 

  parentElem.remove();
  console.log(localTodoLists);
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.classList.contains("deleteBtn")){
  removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  AddTodoList(e);
});
