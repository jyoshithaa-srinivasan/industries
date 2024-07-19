//popup
export const popup = document.getElementById("popup");

export function openPopup() {
    popup.classList.add("open-popup");
}

export function closePopup() {
    popup.classList.remove("open-popup");
}

const h2InsidePopup = document.querySelector('.popup-content h2');
const pInsidePopup = document.querySelector('.popup-content p');

export function ValidationMsg(h2msg, pmsg) {
    h2InsidePopup.textContent = h2msg;
    pInsidePopup.textContent = pmsg;
    openPopup();

}


const popButton = document.getElementById('pop-button');

popButton.addEventListener('click', () => {
    closePopup();
});

//email validator
export function emailValidator(fieldValue) {

    var regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\.-]+)\.([a-z]{2,20})(\.[a-z]{2,8})?$/;
    return regx.test(fieldValue.trim());

}


