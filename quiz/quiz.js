export class DSQuiz {
  constructor(container) {
    this.container = container;
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = [
      {
        question: "What is the minimum degree of a B-tree?",
        options: [
          "Must be at least 2",
          "Must be at least 1",
          "Can be any positive number",
          "Must be at least 3"
        ],
        correct: 0,
        explanation: "The minimum degree (t) of a B-tree must be at least 2, which means each node (except root) must have at least t-1 keys."
      },
      {
        question: "Which of the following is NOT a collision resolution technique in hash tables?",
        options: [
          "Linear Probing",
          "Quadratic Probing",
          "Binary Search",
          "Separate Chaining"
        ],
        correct: 2,
        explanation: "Binary Search is not a collision resolution technique. The main collision resolution techniques are Linear Probing, Quadratic Probing, Double Hashing, and Separate Chaining."
      },
      {
        question: "What is the maximum number of children a B-tree node can have with 'n' keys?",
        options: [
          "n",
          "n + 1",
          "2n",
          "2n + 1"
        ],
        correct: 1,
        explanation: "In a B-tree, a node with 'n' keys can have at most 'n + 1' children."
      },
      {
        question: "What is the load factor in a hash table?",
        options: [
          "Number of buckets",
          "Number of elements",
          "Number of elements / Number of buckets",
          "Number of buckets / Number of elements"
        ],
        correct: 2,
        explanation: "Load factor = n/m, where n is the number of elements and m is the number of buckets. It measures how full the hash table is."
      },
      {
        question: "Which property must a B-tree maintain?",
        options: [
          "All leaves must be at different levels",
          "All leaves must be at the same level",
          "Leaves can be at any level",
          "Only left leaves must be at the same level"
        ],
        correct: 1,
        explanation: "All leaves in a B-tree must be at the same level, which helps maintain balance and guarantees O(log n) operations."
      },
      {
        question: "What happens when using linear probing and the hash table becomes nearly full?",
        options: [
          "Primary clustering",
          "Secondary clustering",
          "Perfect hashing",
          "Dynamic resizing"
        ],
        correct: 0,
        explanation: "Primary clustering occurs in linear probing when the hash table becomes nearly full, causing groups of consecutive slots to be occupied, which increases search times."
      },
      {
        question: "In a B-tree of order m, what is the maximum number of keys each node can contain?",
        options: [
          "m - 1",
          "m",
          "2m",
          "2m - 1"
        ],
        correct: 3,
        explanation: "In a B-tree of order m, each node can contain at most 2m - 1 keys. This property helps maintain the tree's balance and efficient operations."
      },
      {
        question: "What is Double Hashing in hash tables?",
        options: [
          "Using two hash tables",
          "Using two hash functions for collision resolution",
          "Hashing a value twice with the same function",
          "Creating backup of hash table"
        ],
        correct: 1,
        explanation: "Double Hashing uses two hash functions: one for the initial hash, and another for calculating the probe sequence when collisions occur."
      },
      {
        question: "What is the minimum number of keys in a B-tree node (except root)?",
        options: [
          "1",
          "t-1",
          "t",
          "2t"
        ],
        correct: 1,
        explanation: "In a B-tree with minimum degree t, each node except the root must have at least t-1 keys to maintain the tree's properties."
      },
      {
        question: "Which collision resolution technique might lead to secondary clustering?",
        options: [
          "Linear Probing",
          "Quadratic Probing",
          "Separate Chaining",
          "Perfect Hashing"
        ],
        correct: 1,
        explanation: "Quadratic probing can lead to secondary clustering, where sequences of probes follow the same pattern for different initial hash values."
      }
    ];
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h2>Data Structures Quiz</h2>
          <p class="quiz-progress">Question ${this.currentQuestion + 1}/${this.questions.length}</p>
        </div>
        <div class="quiz-content">
          <p class="question">${this.questions[this.currentQuestion].question}</p>
          <div class="options">
            ${this.questions[this.currentQuestion].options.map((option, index) => `
              <button class="option" data-index="${index}">${option}</button>
            `).join('')}
          </div>
          <div class="feedback" style="display: none;"></div>
        </div>
        <div class="quiz-footer">
          <button class="next-btn" style="display: none;">Next Question</button>
          <div class="score" style="display: none;">
            <h3>Quiz Complete!</h3>
            <p>Your score: <span class="score-value"></span></p>
            <button class="restart-btn">Restart Quiz</button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const options = this.container.querySelectorAll('.option');
    const nextBtn = this.container.querySelector('.next-btn');
    const restartBtn = this.container.querySelector('.restart-btn');

    options.forEach(option => {
      option.addEventListener('click', () => this.handleAnswer(parseInt(option.dataset.index)));
    });

    nextBtn.addEventListener('click', () => this.nextQuestion());
    restartBtn?.addEventListener('click', () => this.restartQuiz());
  }

  handleAnswer(selectedIndex) {
    const currentQ = this.questions[this.currentQuestion];
    const options = this.container.querySelectorAll('.option');
    const feedback = this.container.querySelector('.feedback');
    const nextBtn = this.container.querySelector('.next-btn');

    options.forEach(option => option.disabled = true);
    
    if (selectedIndex === currentQ.correct) {
      options[selectedIndex].classList.add('correct');
      this.score++;
    } else {
      options[selectedIndex].classList.add('wrong');
      options[currentQ.correct].classList.add('correct');
    }

    feedback.style.display = 'block';
    feedback.innerHTML = `<p>${currentQ.explanation}</p>`;
    nextBtn.style.display = 'block';
  }

  nextQuestion() {
    this.currentQuestion++;
    
    if (this.currentQuestion < this.questions.length) {
      this.render();
      this.attachEventListeners();
    } else {
      this.showResults();
    }
  }

  showResults() {
    const scorePercentage = (this.score / this.questions.length) * 100;
    this.container.querySelector('.quiz-content').style.display = 'none';
    this.container.querySelector('.next-btn').style.display = 'none';
    this.container.querySelector('.score').style.display = 'block';
    this.container.querySelector('.score-value').textContent = 
      `${this.score}/${this.questions.length} (${scorePercentage}%)`;
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.render();
    this.attachEventListeners();
  }
}