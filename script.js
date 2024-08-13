console.log("RUNING Running");

const checkbox = document.getElementsByClassName("checkbox");

addCheckboxEventListeners();

function addCheckboxEventListeners() {
    for (let i = 0; i < checkbox.length; i++) {
        console.log(checkbox[i]);
        checkbox[i].addEventListener("click", toggleCheckbox);
    }
}

function toggleCheckbox() {
    this.classList.toggle("checked");
}
