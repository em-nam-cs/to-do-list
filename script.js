/**
@filename script.js
@project to-do-list 
@brief 

@author Em Nam
@date Aug 15, 2024

 */

console.log("RUNING Running");

const checkbox = document.getElementsByClassName("checkbox");

addCheckboxEventListeners();

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
