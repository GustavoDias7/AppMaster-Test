const miniButtons = document.querySelectorAll('.mini-button');
const slider = document.querySelector('#slider');
let widthSlider = slider.clientWidth;
let quantItems = document.querySelectorAll('.client-logo').length;
let quantVisibleItems = getQuantVisibleItems();
let overflowItem = quantItems - quantVisibleItems;
let widthOffset = widthSlider / quantVisibleItems;
let currentOffset = 0;
let interval;

function getQuantVisibleItems() {
    /* update how many items will be visible in carousel */
    let screenWidth = window.document.documentElement.clientWidth;
    return screenWidth > 767 ? 5 : 4; /* adjust for more screen sizes */
}

miniButtons.forEach((item, index) => {
    item.addEventListener('click', () => {
        miniButtons.forEach(item => {
            item.classList.remove('active-mini-button');
        });
        item.classList.add('active-mini-button');
        slider.style.transform = `translateX(${-widthOffset * index}px)`;
        currentOffset = -widthOffset * index;
        clearInterval(interval);
        startAutoSlice();
    })
});

function startAutoSlice() {
    interval = setInterval(() => {
        currentOffset === -widthOffset * overflowItem ? currentOffset = 0 : currentOffset -= widthOffset;
        slider.style.transform = `translateX(${currentOffset}px)`;
        miniButtons.forEach(item => {
            item.classList.remove('active-mini-button');
        });
        miniButtons[currentOffset / -widthOffset].classList.add('active-mini-button');
    }, 3000);
}
startAutoSlice();

/* === resposive carousel === */

/* Update the sizes when the page width is resized */
window.addEventListener('resize', updateCarouselResponsivity);

function updateCarouselResponsivity() {
    /* Stop carousel auto loop */
    clearInterval(interval);

    /* Update the sizes */
    widthSlider = slider.clientWidth;
    quantVisibleItems = getQuantVisibleItems();
    overflowItem = quantItems - quantVisibleItems;
    widthOffset = widthSlider / quantVisibleItems;
    
    /* restart counter of offset */
    currentOffset = 0;

    /* active first mini button */
    miniButtons.forEach(item => {
        item.classList.remove('active-mini-button');
    });
    miniButtons[0].classList.add('active-mini-button');

    /* reset position of slider (begin) */
    slider.style.transform = `translateX(${currentOffset}px)`;

    /* restart loop */
    startAutoSlice();
}