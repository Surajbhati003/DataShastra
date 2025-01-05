// Select DOM elements
const inputNumber = document.getElementById("inputNumber");
const hashFunctionSelect = document.getElementById("hashFunction");
const hashTableSizeInput = document.getElementById("hashTableSize");
const hashExplanation = document.getElementById("hashExplanation");
const hashTableContainer = document.querySelector(".hash-table");
const errorMessage = document.querySelector(".error");
const insertButton = document.querySelector(".btn-insert");

// Initialize hash table
let hashTable = [];
let hashTableSize = 10;

// Define hash functions
const hashFunctions = {
  modulo: (num, size) => num % size,
  multiplication: (num, size) => Math.floor(size * ((num * 0.6180339887) % 1)), // Multiplicative method
  simple: (num, size) => (num * 7) % size, // Custom hash function
};

// Initialize hash table visualization
function initializeHashTable() {
  hashTableContainer.innerHTML = ""; // Clear previous table
  hashTable = Array(hashTableSize).fill(null);

  for (let i = 0; i < hashTableSize; i++) {
    const bucket = document.createElement("div");
    bucket.className = "bucket";

    const indexLabel = document.createElement("div");
    indexLabel.className = "bucket-index";
    indexLabel.textContent = `Bucket ${i}`;

    bucket.appendChild(indexLabel);
    hashTableContainer.appendChild(bucket);
  }
}

// Animate number insertion into hash table
function animateNumberToBucket(number, bucketIndex) {
  // Create number element for animation
  const movingNumber = document.createElement("div");
  movingNumber.className = "moving-number";
  movingNumber.textContent = number;
  document.body.appendChild(movingNumber);

  // Get starting position
  const startRect = inputNumber.getBoundingClientRect();
  movingNumber.style.left = `${startRect.left}px`;
  movingNumber.style.top = `${startRect.top}px`;

  // Get target bucket position
  const targetBucket = hashTableContainer.children[bucketIndex];
  const targetRect = targetBucket.getBoundingClientRect();

  // Animate movement
  setTimeout(() => {
    movingNumber.style.left = `${targetRect.left + targetRect.width / 2}px`;
    movingNumber.style.top = `${targetRect.top + targetRect.height / 2}px`;
  }, 50);

  // After animation, place the number in the bucket
  setTimeout(() => {
    addNumberToBucket(number, bucketIndex);
    document.body.removeChild(movingNumber);
  }, 1000);
}

// Add number to bucket
function addNumberToBucket(number, bucketIndex) {
  const bucket = hashTableContainer.children[bucketIndex];
  const numberElement = document.createElement("div");
  numberElement.className = "bucket-item";
  numberElement.textContent = number;

  bucket.appendChild(numberElement);
  hashTable[bucketIndex] = hashTable[bucketIndex] || [];
  hashTable[bucketIndex].push(number);
}

// Handle insert button click
insertButton.addEventListener("click", () => {
  const number = parseInt(inputNumber.value, 10);
  const selectedHashFunction = hashFunctions[hashFunctionSelect.value];

  if (isNaN(number)) {
    showError("Please enter a valid number.");
    return;
  }

  if (!selectedHashFunction) {
    showError("Invalid hash function selected.");
    return;
  }

  const bucketIndex = selectedHashFunction(number, hashTableSize);
  animateNumberToBucket(number, bucketIndex);

  hashExplanation.textContent = `Hashing ${number} using '${hashFunctionSelect.value}' resulted in Bucket ${bucketIndex}.`;
  clearError();
});

// Handle hash table size update
hashTableSizeInput.addEventListener("change", () => {
  const newSize = parseInt(hashTableSizeInput.value, 10);

  if (isNaN(newSize) || newSize <= 0) {
    showError("Please enter a valid hash table size.");
    return;
  }

  hashTableSize = newSize;
  initializeHashTable();
  clearError();
});

// Show error message
function showError(message) {
  errorMessage.style.display = "block";
  errorMessage.textContent = message;
}

// Clear error message
function clearError() {
  errorMessage.style.display = "none";
  errorMessage.textContent = "";
}

// Initialize visualization on page load
initializeHashTable();
