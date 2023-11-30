const myForm = document.getElementById("myForm");
const textInput = document.getElementById("input");
const todoList = document.getElementById("to-do-list");
const checkAllBtn = document.getElementById("arrow-down");
const textQuantity = document.getElementById("text-quantity");

let itemLeft = 0;
let tab = "all";

myForm.addEventListener("submit", (e) => {
  ////////////////////////Create new to do item////
  e.preventDefault();
  const newItem = document.createElement("div");
  newItem.className = "to-do-item";
  newItem.dataset.completed = false;
  newItem.innerHTML = `<div class="check-box-container">
</div>
<form  action="">
  <input id="edit-input" type="text" onchange="this.readOnly='true';" readonly="true" ondblclick="this.readOnly='';"
  value="${textInput.value}" required />
</form>
<i id="delete-icon" onclick="deleteBtn(this)" class="bi bi-x"></i>`;
  itemLeft++;
  updateItemLeft();

  ////////////////////////Prevent reload on new create form////
  const formNewItem = newItem.querySelector("form");
  formNewItem.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(formNewItem.querySelector("input").value);
  });

  ////////////////////////Check box toggle////
  const checkBox = newItem.querySelector(".check-box-container");
  checkBox.addEventListener("click", function () {
    const isChecked = newItem.dataset.completed === "true";
    if (isChecked === true) {
      checkBox.innerHTML = "";
      itemLeft++;
      if (tab === "completed") {
        newItem.style.display = "none";
      }
      if (tab === "active") {
        newItem.style.display = "block";
      }
    } else {
      checkBox.innerHTML = `<i class="bi bi-check2"></i>`;
      itemLeft--;
      if (tab === "active") {
        newItem.style.display = "none";
      }
      if (tab === "completed") {
        newItem.style.display = "block";
      }
    }
    updateItemLeft();
    newItem.dataset.completed = String(!isChecked);
  });

  todoList.appendChild(newItem);
  myForm.reset();
});

////////////////////////Check all boxes toggle////
checkAllBtn.addEventListener("click", function () {
  const allItems = todoList.getElementsByClassName("to-do-item");
  console.log([...allItems]);

  if (itemLeft === 0) {
    return [...allItems].forEach((item) => {
      const checkBox = item.querySelector(".check-box-container");
      checkBox.click();
    });
  }

  [...allItems].forEach((item) => {
    const checkBox = item.querySelector(".check-box-container");
    if (item.dataset.completed === "false") {
      checkBox.click();
    }
  });
});

function updateItemLeft() {
  if (itemLeft > 1) {
    textQuantity.innerHTML = itemLeft + " items left";
  } else {
    textQuantity.innerHTML = itemLeft + " item left";
  }
}

function deleteBtn(e) {
  if (itemLeft === 0) {
    let row = e.parentNode;
    row.remove();
  } else {
    let row = e.parentNode;
    if (row.dataset.completed === "false") {
      itemLeft--;
    }
    updateItemLeft();
    row.remove();
  }
}

////////////////////////Active button////
const activeBtn = document.getElementById("active-btn");
activeBtn.addEventListener("click", function () {
  tab = "active";

  const allItems = todoList.querySelectorAll(".to-do-item");
  allItems.forEach((item) => {
    const isChecked = item.dataset.completed === "true";
    if (isChecked === true) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
});

////////////////////////All button////
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function () {
  tab = "all";

  const allItems = todoList.querySelectorAll(".to-do-item");
  allItems.forEach((item) => {
    item.style.display = "block";
  });
});

////////////////////////Completed button////
const completeBtn = document.getElementById("completed-btn");
completeBtn.addEventListener("click", function () {
  tab = "completed";

  const allItems = todoList.querySelectorAll(".to-do-item");
  allItems.forEach((item) => {
    const isChecked = item.dataset.completed === "true";
    if (isChecked === true) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

////////////////////////Clear button////
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
  const allItems = todoList.querySelectorAll(".to-do-item");
  allItems.forEach((item) => {
    const isChecked = item.dataset.completed === "true";
    if (isChecked === true) {
      deleteBtn(item.querySelector(".bi-x"));
      console.log("before " + itemLeft);

      console.log("after " + itemLeft);
    }
  });

  updateItemLeft();
});
