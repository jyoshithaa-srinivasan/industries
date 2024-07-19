import * as utils from './common.js';

//frontend validation
function emptyValidator(id, value) {
    let targetField = document.getElementById(`${id}-error`);
    targetField.textContent = '';

    if (value.trim() === '') {
        targetField.textContent = `${id.charAt(0).toUpperCase() + id.slice(1)} cannot be empty!`;
        return false;
    }

    switch (id) {
        case 'name':
            if (value.trim().length < 3) {
                targetField.textContent = `${id.charAt(0).toUpperCase() + id.slice(1)} must contain at least 3 characters`;
                return false;
            }
            break;
        case 'email':
            if (!utils.emailValidator(value.trim())) {
                targetField.textContent = 'Please enter a valid email address';
                return false;
            }
            break;
        case 'subject':
            if (value.trim().length < 5) {
                targetField.textContent = `${id.charAt(0).toUpperCase() + id.slice(1)} must contain at least 5 characters`;
                return false;
            }
            break;
        case 'message':
            if (value.trim().length < 10) {
                targetField.textContent = `${id.charAt(0).toUpperCase() + id.slice(1)} must contain at least 10 characters`;
                return false;
            }
            break;
        default:
            break;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let subject = document.getElementById('subject');
    let message = document.getElementById('message');
    const loaderContainer = document.querySelector('.loader-container');


    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const captchaValue = document.querySelector('#g-recaptcha-response').value;

        // Sanitize form data
        let formData = {
            name: DOMPurify.sanitize(name.value),
            email: DOMPurify.sanitize(email.value),
            subject: DOMPurify.sanitize(subject.value),
            message: DOMPurify.sanitize(message.value),
            captcha: DOMPurify.sanitize(captchaValue)
        };

        // Validate all fields
        const fields = ['name', 'email', 'subject', 'message'];
        let isFormValid = true;

        fields.forEach((field) => {
            if (!emptyValidator(field, formData[field])) {
                isFormValid = false;
            }
        });

        // Validate captcha separately
        const captchaError = document.getElementById('captcha-error');
        captchaError.textContent = '';
        if (formData.captcha.trim() === '') {
            captchaError.textContent = 'Please complete the captcha';
            isFormValid = false;
        }

        if (!isFormValid) {
            return;
        }

        // Proceed with sending data to backend via AJAX
        loaderContainer.style.display = 'flex';
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');

        xhr.onload = function () {
            console.log(xhr.responseText);
            loaderContainer.style.display = 'none';

            if (xhr.responseText === 'success' ) {

                utils.ValidationMsg("Thank You!","Your message has been sent sucessfully");
                //resetting the form
                name.value = '';
                email.value = '';
                subject.value = '';
                message.value = '';
            } else {
                utils.ValidationMsg("Oops!","Something went wrong. Please Try again");
            

                if(xhr.responseText.errors){
                    xhr.responseText.errors.forEach(error=>{
                        const targetField=document.getElementById(`${error.param}-error`);
                        if(targetField){
                            targetField.textContent=error.msg;
                        }
                    });
                }
            }

            grecaptcha.reset();
        };

        xhr.send(JSON.stringify(formData));
    });
});
