const btnAdd = document.querySelector('.btn_add');
const todoInput = document.querySelector('.todoInput');

let data = [];

btnAdd.addEventListener("click", () => {
  addTodo();
});

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter"){
    addTodo();
  }
});

const addTodo = () => {
  if (todoInput.value.trim() == ""){
    return;
  }
  
  let todo = {
    text: todoInput.value,
    id: new Date().getTime(),
    checked: "",
  };
  
  todoInput.value = "";
  data.unshift(todo);
  updateList();
}


const list = document.querySelector('.list');

list.addEventListener("click", (e) => {
  let id = e.target.closest("li").dataset.id;
  let index = data.findIndex((item) => item.id == id);
  
  if (e.target.classList.contains("delete") == true){
    e.preventDefault();
    data.splice(index, 1);
  } else {
    if (data[index].checked == ""){
      data[index].checked = "checked";
    } else{
      data[index].checked = "";
    }
  };
  updateList();
});

const tabList = document.querySelector('.tab');
let tabStatus = "all"

const updateList = () => {
  let visibleData = [];
  
  if (tabStatus == "all"){
    visibleData = data;
  } else if (tabStatus == "unDone"){
    visibleData = data.filter((item) => item.checked === "");
  } else {
    visibleData = data.filter((item) => item.checked === "checked");
  }
  
  const unDoneNum = document.querySelector(".unDoneNum");
  let dataLength = data.filter((item) => item.checked === "");
  unDoneNum.textContent = dataLength.length + " ";
  
  render(visibleData);
};

tabList.addEventListener("click", (e) => {
  let tab = document.querySelectorAll('.tab li');
  tab.forEach(item => {
    item.classList.remove("active");
  });
  tabStatus = e.target.dataset.tab;
  e.target.classList.add("active");
  updateList();
});

const clearDone = document.querySelector('.clearDone');

clearDone.addEventListener("click", (e) => {
  e.preventDefault();
  data = data.filter((item) => item.checked !== "checked");
  updateList();
});

const render = (data) => {
  let str = ""
  data.forEach(item => {
    let {text, id, checked} = item;
    str += `<li data-id="${id}">
          <label class="checkbox" for="">
            <input type="checkbox" ${checked}/>
            <span>${text}</span>
          </label>
          <a href="#" class="delete"></a>
        </li>`;
  });
  list.innerHTML = str;
}


updateList();