const buffer = document.getElementById("buffer");
const statusMessage = document.getElementById("statusMessage");
const maxBufferSize = 6; // Max queue size
let queue = [];

const products = ["🍎", "🍌", "🍕", "🍩 ", "🍫 ", "🥤", "🍔", "🍇"];

let producerRunning = false;
let consumerRunning = false;

const bufferLock = {
    queueNotFull: Promise.resolve(),
    queueNotEmpty: Promise.resolve(),
    resolveNotFull: null,
    resolveNotEmpty: null,
};

// Function to update buffer status
function updateStatusMessage() {
    if (queue.length === 0) {
        statusMessage.textContent = "OUT OF STOCK";
        statusMessage.style.color = "#e74c3c"; // Red
    } else if (queue.length === maxBufferSize) {
        statusMessage.textContent = "STOCK IS FULL";
        statusMessage.style.color = "#f1c40f"; // Yellow
    } else {
        statusMessage.textContent = `ITEMS AVAILABLE: ${queue.length}`;
        statusMessage.style.color = "#27ae60"; // Green
    }
}

async function produceItem() {
    while (producerRunning) {
        if (queue.length >= maxBufferSize) {
            await new Promise(resolve => bufferLock.resolveNotFull = resolve);
        }
        
        let product = products[Math.floor(Math.random() * products.length)];
        let item = document.createElement("div");
        item.classList.add("item");
        item.innerText = product;
        buffer.appendChild(item);
        queue.push(item);
        updateStatusMessage();
        
        if (bufferLock.resolveNotEmpty) {
            bufferLock.resolveNotEmpty();
            bufferLock.queueNotEmpty = new Promise(resolve => bufferLock.resolveNotEmpty = resolve);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function consumeItem() {
    while (consumerRunning) {
        if (queue.length === 0) {
            await new Promise(resolve => bufferLock.resolveNotEmpty = resolve);
        }
        
        let item = queue.shift();
        buffer.removeChild(item);
        updateStatusMessage();
        
        if (bufferLock.resolveNotFull) {
            bufferLock.resolveNotFull();
            bufferLock.queueNotFull = new Promise(resolve => bufferLock.resolveNotFull = resolve);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
}

function startProducer() {
    if (!producerRunning) {
        producerRunning = true;
        produceItem();
    }
}

function stopProducer() {
    producerRunning = false;
}

function startConsumer() {
    if (!consumerRunning) {
        consumerRunning = true;
        consumeItem();
    }
}

function stopConsumer() {
    consumerRunning = false;
}

function stopSimulation() {
    stopProducer();
    stopConsumer();
    console.log("Simulation stopped");
}

updateStatusMessage();
