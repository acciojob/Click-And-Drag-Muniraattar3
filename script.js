// Your code here.
const items = document.querySelector('.items');
let isDown = false; // Tracks if the mouse button is being held down
let startX; // Stores the starting X position of the mouse
let scrollLeft; // Stores the initial scroll position of the container

// Event listener for when the mouse button is pressed
items.addEventListener('mousedown', (e) => {
    isDown = true; // User is holding down the mouse button
    items.classList.add('active'); // Adds the active class for a visual effect
    startX = e.pageX - items.offsetLeft; // Calculates the mouse position relative to the container
    scrollLeft = items.scrollLeft; // Records the current scroll position of the container
});

// Event listener for when the mouse leaves the container
items.addEventListener('mouseleave', () => {
    isDown = false; // User stops holding the mouse button
    items.classList.remove('active'); // Removes the active class
});

// Event listener for when the mouse button is released
items.addEventListener('mouseup', () => {
    isDown = false; // User stops holding the mouse button
    items.classList.remove('active'); // Removes the active class
});

// Event listener for mouse movement
items.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Exit if the user isn't holding the mouse button
    e.preventDefault(); // Prevents default behavior like text selection
    const x = e.pageX - items.offsetLeft; // Calculates the current mouse position
    const walk = (x - startX) * 2; // Determines how far the mouse has moved (multiplied for faster scrolling)
    items.scrollLeft = scrollLeft - walk; // Updates the scroll position of the container
});
