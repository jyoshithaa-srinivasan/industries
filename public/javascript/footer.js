import * as utils from './common.js';

document.addEventListener('DOMContentLoaded', () => {

    let form = document.querySelector('.subscribe-form');
    let emailInput = document.querySelector('.subscribe-form input');
    const loaderContainer = document.querySelector('.loader-container');


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value;

        if (!utils.emailValidator(email)) {

            utils.ValidationMsg("Error!", "Please enter a valid email.");
            return;

        }

        loaderContainer.style.display = 'flex';

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/subscribe', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


        xhr.onload = function () {
            loaderContainer.style.display = 'none';

            let response = xhr.responseText;

            if (response === 'pending') {
                utils.ValidationMsg("Thank You!", 'Please check your email to confirm your subscription.')

            }
            else if (response === 'email fail') {
                utils.ValidationMsg('Error!', 'Please enter a valid email');
            }

            else if (response === 'already-subscribed') {
                window.location.href = '/already-subscribed.html'
            }

            else {

                utils.ValidationMsg("Oops!", "Something went wrong. Please Try again");

            }

        }

        xhr.onerror = function () {
            loaderContainer.style.display = 'none';

            utils.ValidationMsg("Oops!", "Something went wrong. Please Try again");

        };

        xhr.send(`email=${encodeURIComponent(email)}`);


    });

});
