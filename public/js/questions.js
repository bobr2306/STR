let anonBtn = document.querySelector(`#anon`);
let inputName = document.querySelector(`#studentName`);
anonBtn.addEventListener(`input`, function() {
    if (anonBtn.checked) {
        inputName.disabled = true;
        inputName.value = ``;
        inputName.placeholder = `Теперь вы анонимный котеночек (`;
    }
    else {
        inputName.disabled = false;
        inputName.placeholder = `Ваше прекрасное имя...`;
    }
})/*
let btnClose = document.querySelector(`#btnClose`);
let questionBlock = document.querySelector(`.questionUpdate`);
btnClose.addEventListener(`click`, function() {
    questionBlock.classList.toggle(`hidden`);
    questionBlock.classList.toggle(`m-0`)
})*/
let btnClear = document.querySelector(`.btnClear`);
let inputSearch = document.querySelector(`.inputSearch`);
let btnSearch = document.querySelector(`.btnSearch`)
btnClear.addEventListener(`click`, function() {
    inputSearch.value = ``;
    btnSearch.click();
})