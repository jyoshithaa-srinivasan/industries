var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    // slidesPerGroup:3,
    spaceBetween: 20,
    centeredSlides: false,
    // slidesPerGroupSkip: 1,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      990: {
        slidesPerView: 3, // Maintain 3 slides for larger screens
    },
    640: {
        slidesPerView: 2, // Adjust for smaller screens
    },
    320: {
        slidesPerView: 1, // One slide for mobile
    },
    },
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
   
  });