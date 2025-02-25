// Select the container and all cube elements.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

// Set initial positions for each cube, and attach a mousedown listener for dragging.
cubes.forEach(cube => {
  // Position each cube absolutely based on its initial offset.
  cube.style.position = 'absolute';
  cube.style.left = cube.offsetLeft + 'px';
  cube.style.top = cube.offsetTop + 'px';
  cube.style.cursor = 'grab';
  
  // When the cube is pressed, start dragging.
  cube.addEventListener('mousedown', dragStart);
});

// Variables to track the currently dragged cube and the mouse offset within it.
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

// Called when a cube is pressed.
function dragStart(e) {
  currentCube = this; // 'this' is the cube being dragged.
  
  // Bring the cube to the front and change the cursor.
  currentCube.style.zIndex = 1000;
  currentCube.style.cursor = 'grabbing';
  
  // Get the cube's bounding rectangle.
  const rect = currentCube.getBoundingClientRect();
  
  // Calculate the offset between the mouse click position and the cube's top-left corner.
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  
  // Add mousemove and mouseup listeners to the document.
  document.addEventListener('mousemove', dragging);
  document.addEventListener('mouseup', dragEnd);
  
  // Prevent default behavior (such as text selection).
  e.preventDefault();
}

// Called continuously as the mouse moves.
function dragging(e) {
  if (!currentCube) return;
  
  // Get the container's bounding rectangle and its scrollLeft (in case the container is scrolled).
  const containerRect = container.getBoundingClientRect();
  
  // Calculate the new left and top positions relative to the container.
  let newLeft = e.clientX - containerRect.left + container.scrollLeft - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;
  
  // Get dimensions for boundary checks.
  const cubeWidth = currentCube.offsetWidth;
  const cubeHeight = currentCube.offsetHeight;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  // Constrain the cube within the container.
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeWidth > containerWidth) newLeft = containerWidth - cubeWidth;
  if (newTop + cubeHeight > containerHeight) newTop = containerHeight - cubeHeight;
  
  // Update the cube's position.
  currentCube.style.left = newLeft + 'px';
  currentCube.style.top = newTop + 'px';
}

// Called when the mouse is released.
function dragEnd(e) {
  if (currentCube) {
    // Reset z-index and cursor.
    currentCube.style.zIndex = '';
    currentCube.style.cursor = 'grab';
  }
  
  // Remove the event listeners.
  document.removeEventListener('mousemove', dragging);
  document.removeEventListener('mouseup', dragEnd);
  currentCube = null;
}
