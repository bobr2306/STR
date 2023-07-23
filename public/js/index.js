/*Стартовая страница*/ 
let inputPassword = document.querySelector(`#inputPassword`)
let checkPassword = document.querySelector(`.checkPassword`);
let mainLink = document.querySelector(`.linkToHome`);
let passwordBtn = document.querySelector(`#passwordBtn`);
let isStudent = document.querySelector(`.isStudent`);
let inputName = document.querySelector(`.inputName`);

inputPassword.addEventListener(`input`, function() {
    let value = inputPassword.value;
    if (!value) {
        passwordBtn.classList.add(`btn-danger`);
        passwordBtn.disabled = true;
    }
    else {
        passwordBtn.classList.remove(`btn-danger`);
        passwordBtn.disabled = false;
    }
});
isStudent.addEventListener(`input`, function() {
    let value = isStudent.checked;
    if (value == true) {
        inputPassword.disabled = true;
        passwordBtn.classList.remove(`btn-danger`);
        passwordBtn.disabled = false;
    }
    else {
        inputPassword.disabled = false;
        passwordBtn.classList.add(`btn-danger`);
        passwordBtn.disabled = true;
    }
});
inputName.addEventListener(`input`, function() {
    let value = inputName.value;
    if (!value) {
        inputName.classList.remove(`is-valid`);
        inputName.classList.add(`is-invalid`);
    }
    else {
        
        inputName.classList.remove(`is-invalid`);
        inputName.classList.add(`is-valid`);
    }
})
