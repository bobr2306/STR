let btnClear = document.querySelector(`.btnClear`);
let inputSearch = document.querySelector(`.inputSearch`);
let btnSearch = document.querySelector(`.btnSearch`)
btnClear.addEventListener(`click`, function() {
    inputSearch.value = ``;
    btnSearch.click();
})