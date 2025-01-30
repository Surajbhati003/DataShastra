document.addEventListener('DOMContentLoaded', () => {
    const hashTable = document.getElementById('hashTable');
    const fallingContainer = document.getElementById('fallingContainer');
    const scoreDisplay = document.getElementById('score');
    const missedCountDisplay = document.getElementById('missedCount');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const startButton = document.getElementById('startGame');
    
    let score = 0;
    let missedCount = 0;
    let timeLeft = 60;
    let gameInterval, timerInterval;
    let currentNumber = null;
    let currentElement = null;
    const MAX_MISSED = 5;
    let isGameActive = false;
  
    function startGame() {
      score = 0;
      missedCount = 0;
      timeLeft = 60;
      isGameActive = true;
      currentNumber = null;
      currentElement = null;
      
      // Clear all buckets
      document.querySelectorAll('.bucket-content').forEach(bucket => {
        bucket.innerHTML = '';
      });
      
      scoreDisplay.textContent = score;
      missedCountDisplay.textContent = missedCount;
      timeLeftDisplay.textContent = timeLeft;
      startButton.disabled = true;
      fallingContainer.innerHTML = '';
      
      gameInterval = setInterval(spawnNumber, 3000);
      timerInterval = setInterval(updateTimer, 1000);
    }
  
    function spawnNumber() {
      if (currentNumber !== null) {
        // Previous number wasn't handled - count as miss
        handleMiss();
      }
  
      const randomNum = Math.floor(Math.random() * 100);
      currentNumber = randomNum;
      
      const fallingElement = document.createElement('div');
      fallingElement.className = 'falling-number';
      fallingElement.textContent = randomNum;
      
      // Center the falling number
      const containerWidth = gameContainer.offsetWidth;
      fallingElement.style.left = `${(containerWidth / 2) - 20}px`;
      fallingElement.style.top = '-50px';
      fallingContainer.appendChild(fallingElement);
      currentElement = fallingElement;
  
      // Animate falling
      let currentTop = -50;
      const fallInterval = setInterval(() => {
        if (!isGameActive || currentNumber !== randomNum) {
          clearInterval(fallInterval);
          return;
        }
  
        currentTop += 1;
        fallingElement.style.top = `${currentTop}px`;
  
        if (currentTop >= window.innerHeight - 150) {
          clearInterval(fallInterval);
          handleMiss();
        }
      }, 20);
    }
  
    function handleNumberKey(keyNum) {
      if (!isGameActive || currentNumber === null) return;
  
      const correctBucket = currentNumber % 10;
      if (keyNum === correctBucket) {
        // Correct placement
        handleCorrectPlacement(currentNumber, keyNum);
      } else {
        // Wrong placement
        handleWrongPlacement(currentNumber, keyNum);
      }
    }
  
    function handleCorrectPlacement(number, bucketIndex) {
      score += 10;
      scoreDisplay.textContent = score;
      
      // Add number to bucket
      const bucket = document.querySelector(`.bucket[data-index="${bucketIndex}"] .bucket-content`);
      const numberElement = document.createElement('div');
      numberElement.className = 'bucket-number';
      numberElement.textContent = number;
      bucket.appendChild(numberElement);
      
      // Animate current element to bucket
      const bucketRect = bucket.getBoundingClientRect();
      currentElement.style.transition = 'all 0.3s ease-out';
      currentElement.style.top = `${bucketRect.top}px`;
      currentElement.style.left = `${bucketRect.left + bucketRect.width/2 - 20}px`;
      currentElement.style.transform = 'scale(0)';
      
      setTimeout(() => {
        currentElement.remove();
      }, 300);
  
      currentNumber = null;
      currentElement = null;
    }
  
    function handleWrongPlacement(number, bucketIndex) {
      // Wrong bucket animation
      currentElement.classList.add('destruction');
      setTimeout(() => {
        currentElement.remove();
      }, 500);
  
      handleMiss();
    }
  
    function handleMiss() {
      missedCount++;
      missedCountDisplay.textContent = missedCount;
      if (missedCount >= MAX_MISSED) {
        endGame("Game Over! You've missed too many numbers.");
      }
      currentNumber = null;
      if (currentElement) {
        currentElement.remove();
        currentElement = null;
      }
    }
  
    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
      if (!isGameActive) return;
      
      const key = e.key;
      if (key >= '0' && key <= '9') {
        handleNumberKey(parseInt(key));
      }
    });
  
    function updateTimer() {
      timeLeft--;
      timeLeftDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame(`Time's up! Your final score is ${score}.`);
      }
    }
  
    function endGame(message) {
      isGameActive = false;
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      startButton.disabled = false;
      currentNumber = null;
      if (currentElement) {
        currentElement.remove();
        currentElement = null;
      }
      alert(message);
    }
  
    startButton.addEventListener('click', startGame);
  });