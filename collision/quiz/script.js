const questions = [
    {
        question: "What happens when two different keys hash to the same index in a hash table?",
        options: [
            "A collision occurs",
            "The second key is discarded",
            "The hash table expands automatically",
            "The first key is replaced"
        ],
        correct: 0,
        explanation: "A collision occurs when two different keys generate the same hash value.",
        concept: "Basic Collision Concept"
    },
    {
        question: "In linear probing, if index 5 is occupied, what would be the next position to check?",
        options: [
            "Index 10",
            "Index 25",
            "Index 6",
            "Index 0"
        ],
        correct: 2,
        explanation: "Linear probing checks the next sequential position, so it would check index 6.",
        concept: "Linear Probing"
    },
    {
        question: "What is the probe sequence for quadratic probing starting at position 3?",
        options: [
            "3, 4, 5, 6",
            "3, 4, 6, 9",
            "3, 6, 9, 12",
            "3, 4, 7, 12"
        ],
        correct: 1,
        explanation: "Quadratic probing follows h(k) + 1², h(k) + 2², etc., so it checks 3, 4, 6, 9.",
        concept: "Quadratic Probing"
    },
    {
        question: "What is the main advantage of chaining over open addressing?",
        options: [
            "It's faster to implement",
            "It uses less memory",
            "It handles clustering better",
            "It never needs resizing"
        ],
        correct: 2,
        explanation: "Chaining avoids clustering by using linked lists to store multiple keys in one slot.",
        concept: "Chaining vs Open Addressing"
    },
    {
        question: "What is the load factor in a hash table?",
        options: [
            "The number of collisions",
            "The ratio of filled slots to total slots",
            "The size of the hash table",
            "The number of empty slots"
        ],
        correct: 1,
        explanation: "The load factor is the ratio of filled slots to total slots, used to determine resizing.",
        concept: "Load Factor"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const questionTopic = document.getElementById("question-topic");
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const finalScoreText = document.getElementById("final-score");
const performanceFeedbackText = document.getElementById("performance-feedback");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    questionTopic.textContent = question.concept;
    optionsContainer.innerHTML = "";
    feedbackContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });

    nextButton.classList.add("hidden");
}

function handleAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const correctIndex = question.correct;
    
    if (selectedIndex === correctIndex) {
        score++;
        feedbackContainer.innerHTML = `<p class="correct">Correct! 🎉</p><p>${question.explanation}</p>`;
    } else {
        feedbackContainer.innerHTML = `<p class="incorrect">Incorrect! ❌</p><p>${question.explanation}</p>`;
    }

    document.querySelectorAll(".option-btn").forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctIndex) btn.classList.add("correct");
        else if (index === selectedIndex) btn.classList.add("incorrect");
    });

    nextButton.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz").classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScoreText.textContent = `Your score: ${score} out of ${questions.length}`;
    
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
        performanceFeedbackText.textContent = "Excellent! You have a strong understanding of collision handling concepts!";
    } else if (percentage >= 60) {
        performanceFeedbackText.textContent = "Good job! Review the concepts you missed to improve your understanding.";
    } else {
        performanceFeedbackText.textContent = "Keep practicing! Focus on understanding the core concepts of collision handling.";
    }
}

restartButton.onclick = () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
};

nextButton.onclick = nextQuestion;
loadQuestion();
