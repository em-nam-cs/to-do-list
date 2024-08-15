/**
@filename script.js
@project to-do-list 
@brief 

@author Em Nam
@date Aug 15, 2024

 */

console.log("RUNING Running");

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

class ListItem {
    /**
     * Assume that the task is initially incomplete
     * @param {string} task text the describes the task
     */
    constructor(task) {
        this.task = task;
        this.complete = false;
    }
}

const newItem = document.getElementById("new-item-input");
const newItemForm = document.getElementById("new-item-form");
const checkbox = document.getElementsByClassName("checkbox");
const listContainerEl = document.getElementById("list-container");

newItemForm.addEventListener("submit", addNewItem);
addCheckboxEventListeners();
populateAllListItems();

/**
 * populate existing items in the listItems to the DOM
 */
function populateAllListItems() {
    console.log(listItems.length);
    for (let i = 0; i < listItems.length; i++) {
        createNewListItemDOM(i);
    }
}

/**
 * Creates and adds new listItem from user input form into the global list
 * and displays it
 *
 * @param {event} e event that triggered event listener
 */
function addNewItem(e) {
    e.preventDefault();
    console.log("submit");
    console.log(newItem.value);

    addNewItemToList(newItem.value); //add new item to list
    createNewListItemDOM(listItems.length - 1); //add most recent item to display on DOM
}


/**
 * Creates a new ListItem object with the given task. Then adds this new item
 * to the global array of all the list items at the end of the list
 * @param {string} task text that descibes the task for the list item
 */
function addNewItemToList(task) {
    const newListItem = new ListItem(task);
    listItems.push(newListItem);
}

/**
 * creates all the DOM elements for a new list item and appends the html
 * elements to the list container so the user can see the new item added
 * Adds the event listeners to all the buttons so style and functionality to
 * these buttons
 *
 * Assumes that the new list item is pushed to the back of the global listItems
 * array and creates the new list item from this last element
 */
function createNewListItemDOM(index) {
    const itemToAdd = listItems[index];
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

/**
 * adds event listeners to the checkbox so the styles and marks are displayed
 * when a user interacts with checkboxes (needed each time page is loaded
 * or for a new list item created)
 */
function addCheckboxEventListeners() {
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("click", toggleCheckbox);
        checkbox[i].addEventListener("mouseleave", function () {
            this.classList.remove("clicked");
        });
    }
}

/**
 * when the checkbox is clicked, add appropriate styles and toggle the state
 */
function toggleCheckbox() {
    this.classList.toggle("checked");
    this.classList.add("clicked");
}
