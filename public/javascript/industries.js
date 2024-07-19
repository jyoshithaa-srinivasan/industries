
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

// Expand controls
let expandButtons = document.querySelectorAll(".expand");
console.log(expandButtons);

// Add event listeners to each expand button
expandButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        showMore(index); // Pass the index of the button clicked
    });
});

function showMore(index) {
    // Get the current active slide
    let activeSlide = document.getElementsByClassName("mySlides")[slideIndex - 1];
    
    // Get the slider within the active slide
    let slider = activeSlide.querySelector(".slider");
    
    // Toggle the hidden class on the slider
    slider.classList.toggle('hidden');

    // Get the expand text and icon within the button
    let expandText = expandButtons[index].querySelector(".expand-text");
    let expandIcon = expandButtons[index].querySelector(".expand-img");

    if (!slider.classList.contains('hidden')) {
        expandText.innerText = "Show Less"; // Update the text to "Show Less"
        expandIcon.setAttribute("src", "images/up-arrow.png"); // Update the icon to up arrow
    } else {
        expandText.innerText = "Show More"; // Update the text to "Show More"
        expandIcon.setAttribute("src", "images/down-arrow.png"); // Update the icon to down arrow
    }
}


