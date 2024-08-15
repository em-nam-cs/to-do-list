/**
@filename script.js
@project to-do-list 
@brief 

@author Em Nam
@date Aug 15, 2024

 */

console.log("RUNING Running");

const populate = [
    {
        task: "TEST task 1",
        complete: false,
    },
    {
        task: "Test task 2 super long text input here Test task 1 super long text input here Test task 1 super long text input here text input here Test task 1 super long text input here Test",
        complete: true,
    },
];

const listItems = [];

class ListItem {
    static numListItems = 0;
    static numCompleted = 0;

    /**
     * Assume that the task is initially incomplete
     * @param {string} task text the describes the task
     */
    constructor(task, complete) {
        this.task = task;
        this.complete = complete;
        if (complete) {
            ListItem.numCompleted++;
        }
        ListItem.numListItems++;
    }

    test() {
        console.log("class method");
    }
}

const newItem = document.getElementById("new-item-input");
const newItemForm = document.getElementById("new-item-form");

const listContainerEl = document.getElementById("list-container");

const checkbox = document.getElementsByClassName("checkbox");
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");

populateAllListItems();

//TODO: ISSUE WITH ADDING EVENT LISTENERS IF LIST ITEMS DON'T EXIST YET (WITHOUT PLACEHOLDER ONES
//  TROUBLE ADDING EVENT LISTENER ON POPULATED ONES - NEED ASYNC?)
newItemForm.addEventListener("submit", addNewItem);
deleteBtn.addEventListener("click", deleteItem);
addListItemEventListeners();

function deleteItem() {
    //for delete pop up, should use modal so can style
}

/**
 * populate existing items in the listItems to the global list and DOM
 */
function populateAllListItems() {
    console.log("populating list items");
    for (let i = 0; i < populate.length; i++) {
        addNewItemToList(populate[i].task, populate[i].complete);
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

    addNewItemToList(newItem.value, false); //add new item to list
}

/**
 * Creates a new ListItem object with the given task. Then adds this new item
 * to the global array of all the list items at the end of the list
 * and creates the DOM elements to display the new list item
 *
 * @param {string} task text that descibes the task for the list item
 */
function addNewItemToList(task, complete) {
    const newListItem = new ListItem(task, complete);
    listItems.push(newListItem);
    createNewListItemDOM(listItems.length - 1); //add most recent item to display on DOM
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

    addListItemEventListeners();
}

/**
 * adds event listeners to the checkbox so the styles and marks are displayed
 * when a user interacts with checkboxes (needed each time page is loaded
 * or for a new list item created)
 */
function addListItemEventListeners() {
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("click", toggleCheckbox);
        checkbox[i].addEventListener("mouseleave", function () {
            this.classList.remove("clicked");
        });
    }
}

/**
 * when the checkbox is clicked, add appropriate styles and toggle the state
 * Update the ListItem class variables to reflect count of number of tasks
 * completed. Check if all tasks are completed
 */
function toggleCheckbox() {
    this.classList.toggle("checked");
    this.classList.add("clicked");

    if (this.classList.contains("checked")) {
        ListItem.numCompleted++;
        checkAllComplete();
    } else {
        ListItem.numCompleted--;
        // checkAllComplete();
    }
}

/**
 * checks if all list items are completed
 * @returns true if the number of complete tasks matches the num of list items
 */
function checkAllComplete() {
    console.log("checking");
    return ListItem.numCompleted == ListItem.numListItems;
}
