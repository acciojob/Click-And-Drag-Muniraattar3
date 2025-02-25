// Get the container (defined area) and all cube elements.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

// Initialize each cube's position so they can be moved individually.
cubes.forEach(cube => {
  // Save each cube's current position as inline styles.
  cube.style.position = 'absolute';
  cube.style.left = cube.offsetLeft + 'px';
  cube.style.top = cube.offsetTop + 'px';
  
  // Add mousedown event to start dragging this cube.
  cube.addEventListener('mousedown', dragStart);
});

// Variables to keep track of the currently dragged cube and mouse offset.
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

// Called when the user starts dragging a cube.
function dragStart(e) {
  currentCube = this; // 'this' refers to the cube being dragged.
  
  // Get the cube's current bounding rectangle.
  const rect = currentCube.getBoundingClientRect();
  // Calculate the offset between the mouse position and the cube's top-left corner.
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  
  // Attach mousemove and mouseup listeners to the document.
  document.addEventListener('mousemove', dragging);
  document.addEventListener('mouseup', dragEnd);
  
  // Prevent default behavior (e.g., text selection).
  e.preventDefault();
}

// Called continuously as the user moves the mouse with the cube selected.
function dragging(e) {
  if (!currentCube) return;
  
  // Get the container's bounding rectangle.
  const containerRect = container.getBoundingClientRect();
  
  // Calculate the new left and top positions relative to the container.
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;
  
  // Determine cube and container dimensions.
  const cubeWidth = currentCube.offsetWidth;
  const cubeHeight = currentCube.offsetHeight;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  // Constrain the new position so the cube doesn't leave the container.
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeWidth > containerWidth) newLeft = containerWidth - cubeWidth;
  if (newTop + cubeHeight > containerHeight) newTop = containerHeight - cubeHeight;
  
  // Update the cube's position.
  currentCube.style.left = newLeft + 'px';
  currentCube.style.top = newTop + 'px';
}

// Called when the user releases the mouse button.
function dragEnd(e) {
  // Remove the temporary event listeners.
  document.removeEventListener('mousemove', dragging);
  document.removeEventListener('mouseup', dragEnd);
  currentCube = null;
}
