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

// const listItems = [];

const listItems = [
    {
        task: "TEST task 0",
        complete: false,
    },
    {
        task: "TEST task 10",
        complete: true,
    },
];

class listItem {
    constructor(task) {
        this.task = task;
        this.complete = false;
    }
}

function addNewItem(e) {
    e.preventDefault();
    console.log("submit");
    console.log(newItem.value);

    addNewItemToList(newItem.value); //add new item to list
    createNewListItemDOM(); //add most recent item to display on DOM
}

function addNewItemToList(task) {
    const newListItem = new listItem(task);
    listItems.push(newListItem);
}

function createNewListItemDOM() {
    const itemToAdd = listItems[listItems.length - 1];
    console.log(itemToAdd);

    const newListItem = document.createElement("div");
    newListItem.classList.add("list-item");

    const newCheckbox = document.createElement("button");
    newCheckbox.classList.add("checkbox");
    if (itemToAdd.complete) {
        newCheckbox.classList.add("checked");
    }

    const newTask = document.createElement("span");
    newTask.classList.add("task");
    const newContent = document.createTextNode(itemToAdd.task);
    newTask.appendChild(newContent);

    const newEditBtn = document.createElement("button");
    newEditBtn.classList.add("edit-btn");

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add("delete-btn");

    newListItem.appendChild(newCheckbox);
    newListItem.appendChild(newTask);
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

/**
 * consolidate this function with ()=>
 */
function leaveCheckbox() {
    this.classList.remove("clicked");
}
