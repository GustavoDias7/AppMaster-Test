const client_carousel = document.querySelector('#client-carousel-container');
const slider = document.querySelector('#slider');
const mini_buttons = document.querySelectorAll('.mini-button');
const width_logo = document.querySelector('.logo-container').clientWidth + 20;
let counter = 0;
let interval;

mini_buttons.forEach((item, index) => {
    item.addEventListener('click', () => {
        mini_buttons.forEach(item => {
            item.classList.remove('active-mini-button');
        });
        item.classList.add('active-mini-button');
        slider.style.transform = `translateX(${-width_logo * index}px)`;
        counter = -width_logo * index;
        clearInterval(interval);
        startAutoSlice();
    })
});

function startAutoSlice() {
    interval = setInterval(() => {
        counter === -width_logo * 3 ? counter = 0 : counter -= width_logo;
        slider.style.transform = `translateX(${counter}px)`;
        mini_buttons.forEach(item => {
            item.classList.remove('active-mini-button');
        });
        mini_buttons[counter / -width_logo].classList.add('active-mini-button');
    }, 3000);
}
startAutoSlice();