const hashTable = new Array(10).fill(null); // For open addressing
const separateChaining = new Array(10).fill(null).map(() => []); // For separate chaining
const buckets = new Array(10).fill(null).map(() => []); // For buckets

function updateVisualization() {
    const method = document.getElementById("method").value;
    const openAddressingOptions = document.getElementById("open-addressing-options");
    const hashTableBody = document.getElementById("hash-table").getElementsByTagName("tbody")[0];
    const separateChainingDiv = document.getElementById("separate-chaining");
    const bucketDiv = document.getElementById("buckets");
    const visualizationTitle = document.getElementById("visualization-title");
    const formulaDiv = document.getElementById("formula");
    const separateChainingFormula = document.getElementById("separate-chaining-formula");
    const bucketFormula = document.getElementById("bucket-formula");

    // Clear existing content
    hashTableBody.innerHTML = '';
    separateChainingDiv.style.display = "none";
    bucketDiv.style.display = "none";
    openAddressingOptions.style.display = "none";
    formulaDiv.innerHTML = ""; // Clear previous formula
    separateChainingFormula.innerHTML = ""; // Clear previous formula for separate chaining
    bucketFormula.innerHTML = ""; // Clear previous formula for buckets

    if (method === "open-addressing") {
        openAddressingOptions.style.display = "block";
        visualizationTitle.innerText = "Open Addressing Visualization";
        displayHashTable(hashTable);
    } else if (method === "separate-chaining") {
        visualizationTitle.innerText = "Separate Chaining Representation";
        separateChainingDiv.style.display = "block";
        displaySeparateChaining(separateChaining);
        separateChainingFormula.innerHTML = "Formula: h(k) = k mod m";
    } else if (method === "buckets") {
        visualizationTitle.innerText = "Bucket Representation";
        bucketDiv.style.display = "block";
        displayBuckets(buckets);
        bucketFormula.innerHTML = "Formula: h(k) = k mod m";
    }
}

// Display hash table for open addressing
function displayHashTable(table) {
    const hashTableBody = document.getElementById("hash-table").getElementsByTagName("tbody")[0];
    table.forEach((value, index) => {
        const row = hashTableBody.insertRow();
        row.insertCell(0).innerText = index;
        row.insertCell(1).innerText = value !== null ? value : "";
    });

    // Show formula based on the open addressing method
    const openMethod = document.getElementById("open-method").value;
    let formula;
    if (openMethod === "linear") {
        formula = "Formula: h(k) = (k + i) mod m, where i = 0, 1, 2...";
    } else if (openMethod === "quadratic") {
        formula = "Formula: h(k) = (k + i²) mod m, where i = 0, 1, 2...";
    } else if (openMethod === "double") {
        formula = "Formula: h(k) = (h1(k) + i * h2(k)) mod m, where i = 0, 1, 2...";
    }
    document.getElementById("formula").innerText = formula;
}

// Display separate chaining
function displaySeparateChaining(chains) {
    const linkedListContent = document.getElementById("linked-list-content");
    linkedListContent.innerHTML = ''; // Clear existing list items
    chains.forEach((chain, index) => {
        const li = document.createElement('li');
        li.innerText = `Index ${index}: ${chain.join(", ")}`;
        linkedListContent.appendChild(li);
    });
}

// Display bucket representation
function displayBuckets(buckets) {
    const bucketContent = document.getElementById("bucket-content");
    bucketContent.innerHTML = ''; // Clear existing list items
    buckets.forEach((bucket, index) => {
        const li = document.createElement('li');
        li.innerText = `Bucket ${index}: ${bucket.join(", ")}`;
        bucketContent.appendChild(li);
    });
}

// Add value based on the selected method
function addValue() {
    const method = document.getElementById("method").value;
    const openMethod = document.getElementById("open-method").value;
    const inputValue = document.getElementById("input-value").value;

    if (!inputValue) return; // Prevent adding empty values

    const number = parseInt(inputValue);
    let collisionOccurred = false;

    if (method === "open-addressing") {
        if (openMethod === "linear") {
            collisionOccurred = addToHashTable(number, "linear");
        } else if (openMethod === "quadratic") {
            collisionOccurred = addToHashTable(number, "quadratic");
        } else if (openMethod === "double") {
            collisionOccurred = addToHashTable(number, "double");
        }
    } else if (method === "separate-chaining") {
        addToSeparateChaining(number);
    } else if (method === "buckets") {
        addToBuckets(number);
    }

    updateVisualization(collisionOccurred); // Refresh the visualization
}

// Open addressing insertion logic
function addToHashTable(value, method) {
    const size = hashTable.length;
    let index = value % size; // Basic hash function
    let i = 0;

    if (hashTable[index] !== null) {
        let collisionMessage = `Collision detected at index ${index} for value ${value}.`;
        document.getElementById("collision-info").innerText = collisionMessage;
        document.getElementById("collision-info").style.display = "block"; // Show collision info
    }

    if (method === "linear") {
        while (hashTable[index] !== null && i < size) {
            i++;
            index = (value + i) % size; // Linear probing
        }
    } else if (method === "quadratic") {
        while (hashTable[index] !== null && i < size) {
            i++;
            index = (value + i * i) % size; // Quadratic probing
        }
    } else if (method === "double") {
        const stepSize = 1 + (value % (size - 1));
        while (hashTable[index] !== null && i < size) {
            index = (index + stepSize) % size; // Double hashing
            i++;
        }
    }

    if (i < size) {
        hashTable[index] = value; // Insert value
        return false; // No collision
    } else {
        alert("Hash table is full!");
        return true; // Collision occurred
    }
}

// Separate chaining insertion logic
function addToSeparateChaining(value) {
    const index = value % separateChaining.length;
    separateChaining[index].push(value);
}

// Buckets insertion logic
function addToBuckets(value) {
    const index = value % buckets.length;
    buckets[index].push(value);
}

// Initial visualization setup
document.addEventListener("DOMContentLoaded", updateVisualization);



