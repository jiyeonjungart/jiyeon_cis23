const dragContainer = document.getElementById("drag-container");
let dragItems = document.querySelectorAll(".drag-item");
let dragItem = null;

// Event listeners for drag and drop
dragContainer.addEventListener("dragstart", (event) => {
  dragItem = event.target;
});

dragContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dragContainer.addEventListener("drop", (event) => {
  const dropItem = event.target;

  // Swap the items
  if (dragItem !== dropItem && dragItem !== null && dropItem.classList.contains("drag-item")) {
    const dropIndex = Array.from(dragContainer.children).indexOf(dropItem);
    const dragIndex = Array.from(dragContainer.children).indexOf(dragItem);

    if (dragIndex < dropIndex) {
      dragContainer.insertBefore(dragItem, dropItem.nextSibling);
    } else {
      dragContainer.insertBefore(dragItem, dropItem);
    }
  }

  dragItem = null;
});

// Add event listeners to all drag items
dragItems.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", null);
  });
});
