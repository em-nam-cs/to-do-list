/**
@filename script.js
@project to-do-list 
@brief 

@author Em Nam
@date Aug 15, 2024

 */

//RECALL: when CRUD, need to update STORAGE AND DOM

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
const HTML_INDEX_OF_TASK = 1;
const listItems = new Map();

class ListItem {
    static numListItems = 0;
    static numCompleted = 0;
    static idCounter = 0;

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
        ListItem.idCounter++;

        //ISSUE IF delete item, then create it can have duplicate id (because
        //at time of creation the numItems is the same)

        this.id = ListItem.idCounter;
    }

    deleteItem() {
        ListItem.numListItems--;
        if (this.complete) {
            ListItem.numCompleted--;
        }
        listItems.delete(this.id);
    }

    test() {
        console.log("class method");
        return true;
    }
}

const newItemInput = document.getElementById("new-item-input");
const newItemForm = document.getElementById("new-item-form");
const listContainerEl = document.getElementById("list-container");

const deleteModalContainerEl = document.getElementById("delete-container");
const deleteModalEl = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

const checkboxes = document.getElementsByClassName("checkbox");
const tasks = document.getElementsByClassName("task");
const editBtns = document.getElementsByClassName("edit-btn");
const deleteBtns = document.getElementsByClassName("delete-btn");
const deleteModalTaskText = document.getElementById("delete-modal-task-text");

newItemForm.addEventListener("submit", addNewItem);
confirmDeleteBtn.addEventListener("click", deleteItem);
cancelDeleteBtn.addEventListener("click", closeDeleteModal);
deleteModalContainerEl.addEventListener("click", (e) => {
    if (!deleteModalEl.contains(e.target)) {
        closeDeleteModal();
    }
});

//close edit textarea if click outside textarea
//something like this, but issue textarea dyno generated

// document.body.addEventListener("click", (e) => {
//     if (!taskTextareaEl.contains(e.target)){
//         finalizeEdit();
//     }
// });

deleteModalContainerEl.addEventListener("mousemove", removeDeleteBtnFocus);

//opens edit mode
function openEditItem(listItem) {
    console.log("edit");
    // console.log(e.target.parentElement.id);
    const listItemEl = listItem;
    const taskEl = listItemEl.children[HTML_INDEX_OF_TASK];
    const itemId = Number(listItemEl.id);
    const task = listItems.get(itemId).task;

    //create textarea element on DOM, auto populate, replace span
    const taskEditEl = document.createElement("textarea");
    taskEditEl.value = task;
    taskEditEl.classList.add("task");

    listItemEl.insertBefore(taskEditEl, taskEl);

    //remove event handlers from task span, remove span
    let clone = taskEl.cloneNode(false);
    taskEl.replaceWith(clone);
    clone.remove();

    autoSizeEdit(taskEditEl);
    taskEditEl.focus();

    //add class to mark edit is open
    listItemEl.classList.add("edit-open");

    //add event listeners to textarea to resize and entering final edit
    taskEditEl.addEventListener("input", (e) => {
        autoSizeEdit(e.target);
    });
    taskEditEl.addEventListener("keypress", (e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            finalizeEdit(e.target, itemId);
        }
    });
}

//update task in storage and DOM
//don't need entire event, just need the right DOM element to edit
function finalizeEdit(taskEl, itemId) {
    console.log("finalize edit");

    console.log(taskEl);
    // console.log(e.target);
    console.log(itemId);

    const listItemEl = taskEl.parentElement;
    listItemEl.classList.remove("edit-open");

    const updatedTask = taskEl.value;

    //update in storage
    const itemToUpdate = listItems.get(Number(itemId));
    itemToUpdate.task = updatedTask;

    //switch back to span, update task in DOM
    const updatedTaskEl = document.createElement("span");
    updatedTaskEl.innerText = updatedTask;
    updatedTaskEl.classList.add("task");
    listItemEl.insertBefore(updatedTaskEl, taskEl);

    //remove event handlers from textarea, remove textarea
    let clone = taskEl.cloneNode(false);
    taskEl.replaceWith(clone);
    clone.remove();

    //add event listener to new task span element
    updatedTaskEl.addEventListener("click", (e) => {
        openEditItem(e.target.parentElement);
    });
}

function autoSizeEdit(element) {
    // console.log(element);
    element.style.height = "auto";
    let currPadding = getComputedStyle(element).getPropertyValue("padding");
    currPadding = Number(currPadding.replace(/\D/g, ""));
    element.style.height = element.scrollHeight + currPadding + "px";
}

/**
 * clears the focus off the confirm delete button that it is initially set to
 * when opening the delete modal
 */
function removeDeleteBtnFocus() {
    console.log("moving focus");
    setTimeout(() => {
        confirmDeleteBtn.blur();
    }, 0);
}

/**
 * closes the delete modal display
 */
function closeDeleteModal() {
    console.log("canceled delete");
    deleteModalContainerEl.classList.add("hidden");
}

/**
 * opens the delete modal display automatically focuses on the confirm delete btn,
 * stores which item triggered the delete and stores this data in html data attribute
 * @param {*} e event that triggered the delete (can extract item id to delete)
 */
function openDeleteModal(e) {
    console.log("open del modal");
    deleteModalContainerEl.classList.remove("hidden");
    setTimeout(() => {
        confirmDeleteBtn.focus({ focusVisible: true }); //set focus automatically on confirm delete
    }, 0);

    const itemId = Number(e.target.parentElement.id); //id of which list item opened delete popup
    deleteModalTaskText.innerText = listItems.get(itemId).task; //set delete modal text prompt
    deleteModalContainerEl.setAttribute("data-id", itemId); //store the id
}

/**
 * delete a list item from the Map storage and remove its corresponding HTML
 * display from the DOM. Also close the delete modal popup
 */
function deleteItem() {
    console.log("item deleting");
    // console.log("list items map before:");
    // console.log(listItems);

    deleteModalContainerEl.classList.add("hidden");
    // console.log(deleteModalContainerEl.getAttribute("data-id"));
    const itemId = Number(deleteModalContainerEl.getAttribute("data-id"));
    // console.log(listItems.get(itemId));

    //need to remove from listItems map
    listItems.get(itemId).deleteItem();

    //need to remove from DOM
    deleteListItemDOM(itemId);
}

function deleteListItemDOM(id) {
    console.log("delete from DOM");
    const itemToDelete = document.getElementById(id);

    // itemToDelete.outerHTML = itemToDelete.outerHTML;
    itemToDelete.outerHTML = null; //remove event handlers (does this even safely remove handlers??)
    itemToDelete.remove();
}

populateAllListItems(); //populate items (WRAP IN ON LOAD???)

/**
 * populate existing items in the listItems to the global list and DOM
 */
function populateAllListItems() {
    console.log("populating list items");
    for (let i = 0; i < populate.length; i++) {
        const newListItem = addNewItemToList(
            populate[i].task,
            populate[i].complete
        );
        createNewListItemDOM(listItems.size - 1, newListItem.id); //add most recent item to display on DOM
    }
}

/**
 * Creates and adds new listItem from user input form into the global list
 * and displays it, and creates the DOM elements to display the new list item
 *  
 * Assumes that the new list item is always added to the bottom of the list
 * (need this assumption in order to addEventListeners to correct buttons and
 *  to scroll to newest added item)

 *
 * @param {event} e event that triggered event listener
 */
function addNewItem(e) {
    e.preventDefault();
    console.log("submit");
    console.log(e);
    console.log(newItemInput.value);

    const newListItem = addNewItemToList(newItemInput.value, false); //add new item to list
    createNewListItemDOM(listItems.size - 1, newListItem.id); //add most recent item to display on DOM

    newItemInput.value = "";
    listContainerEl.scroll(0, 500); //500 just big enough to always be bottom
}

/**
 * Creates a new ListItem object with the given task. Then adds this new item
 * to the global array of all the list items at the end of the list
 *
 * @param {string} task text that descibes the task for the list item
 * @param {boolean} complete boolean that is true if task is complete, false otherwise
 * @return {ListItem} ListItem object of the new item added to the storage list
 */
function addNewItemToList(task, complete) {
    const newListItem = new ListItem(task, complete);
    listItems.set(newListItem.id, newListItem);
    return newListItem;
}

/**
 * creates all the DOM elements for a new list item and appends the html
 * elements to the list container so the user can see the new item added
 * Adds the event listeners to all the buttons so style and functionality to
 * these buttons
 */
function createNewListItemDOM(index, id) {
    const itemToAdd = listItems.get(id);

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

    newListItem.setAttribute("id", id);

    listContainerEl.appendChild(newListItem);

    addListItemEventListeners(index);
}

/**
 * adds event listeners to the checkbox so the styles and marks are displayed
 * when a user interacts with checkboxes (needed each time page is loaded
 * or for a new list item created)
 */
function addListItemEventListeners(index) {
    console.log("adding event listener:");

    checkboxes[index].addEventListener("click", toggleCheckbox);
    checkboxes[index].addEventListener("mouseleave", function () {
        this.classList.remove("clicked");
    });

    tasks[index].addEventListener("click", (e) => {
        openEditItem(e.target.parentElement);
    });

    editBtns[index].addEventListener("click", (e) => {
        // editBtns[index].classList.contains("edit-open")
        const listItemEl = e.target.parentElement;
        // console.log(listItemEl.classList.contains("edit-open"));
        if (listItemEl.classList.contains("edit-open")) {
            const taskEl = listItemEl.children[HTML_INDEX_OF_TASK];
            finalizeEdit(taskEl, listItemEl.id);
        } else {
            // console.log("NOT OPEN SO OPEN");
            openEditItem(e.target.parentElement);
        }
    });

    deleteBtns[index].addEventListener("click", (e) => {
        openDeleteModal(e);
    });
}

// function addTaskEventListeners()

/**
 * when the checkbox is clicked, add appropriate styles and toggle the state
 * Update the ListItem class and instance variables to reflect count of number of tasks
 * completed. Check if all tasks are completed
 */
function toggleCheckbox() {
    this.classList.toggle("checked");
    this.classList.add("clicked");
    const itemId = Number(this.parentElement.id);
    const completed = this.classList.contains("checked");
    listItems.get(itemId).complete = completed;

    if (completed) {
        ListItem.numCompleted++;
        checkAllComplete();
    } else {
        ListItem.numCompleted--;
    }
}

/**
 * checks if all list items are completed
 * @returns true if the number of complete tasks matches the num of list items
 */
function checkAllComplete() {
    console.log("checking if all complete");
    return ListItem.numCompleted == ListItem.numListItems;
}
