/**
@filename script.js
@project to-do-list 
@brief 

@author Em Nam
@date Aug 15, 2024

 */

console.log("RUNING Running");

// const submitBtn = document.getElementById("submit-item-btn");
const newItem = document.getElementById("new-item-input");
const newItemForm = document.getElementById("new-item-form");
const checkbox = document.getElementsByClassName("checkbox");
const listContainerEl = document.getElementById("list-container");

newItemForm.addEventListener("submit", addNewItem);
addCheckboxEventListeners();

function addNewItem(e) {
    e.preventDefault();
    console.log("submit");
    console.log(newItem.value);

    createNewListItem(newItem.value);
}

function createNewListItem(newItem) {
    const newListItem = document.createElement("div");
    newListItem.classList.add("list-item");

    const newCheckbox = document.createElement("button");
    newCheckbox.classList.add("checkbox");

    const newText = document.createElement("span");
    newText.classList.add("list-item-text");
    const newContent = document.createTextNode(newItem);
    newText.appendChild(newContent);

    const newEditBtn = document.createElement("button");
    newEditBtn.classList.add("edit-btn");

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add("delete-btn");

    newListItem.appendChild(newCheckbox);
    newListItem.appendChild(newText);
    newListItem.appendChild(newEditBtn);
    newListItem.appendChild(newDeleteBtn);

    listContainerEl.appendChild(newListItem);

    addCheckboxEventListeners();
}

function addCheckboxEventListeners() {
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("click", toggleCheckbox);
        checkbox[i].addEventListener("mouseleave", leaveCheckbox);
    }
}

function toggleCheckbox() {
    this.classList.toggle("checked");
    this.classList.add("clicked");
}

function leaveCheckbox() {
    this.classList.remove("clicked");
}
