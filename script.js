const quizContainer = document.getElementById('quiz-container');
const navigationContainer = document.getElementById('navigation-container');
const questionsPerPage = 10;
let currentPage = 1;
let questionsData;
let questionContainers = [];
let isLearningMode = false;

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        questionsData = data;
        shuffleArray(questionsData);
        createQuestionContainers(questionsData);
        startQuiz();
    })
    .catch(error => console.error('Error fetching data:', error));

function createQuestionContainers(questions) {
    questionContainers = questions.map((question, i) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');
        displayQuestion(question, i + 1, questionContainer);
        return questionContainer;
    });
}

function startQuiz() {
    displayQuestionsOnPage(currentPage);
    const nextButton = createNavigationButton('Next Page', () => {
        if (currentPage < Math.ceil(questionsData.length / questionsPerPage)) {
            currentPage++;
            displayQuestionsOnPage(currentPage);
            scrollToTop();
        }
    });

    const backButton = createNavigationButton('Back', () => {
        if (currentPage > 1) {
            currentPage--;
            displayQuestionsOnPage(currentPage);
            scrollToTop();
        }
    });

    const quizModeButton = createNavigationButton('Learning Quiz', toggleQuizMode);
    navigationContainer.innerHTML = '';
    navigationContainer.appendChild(backButton);
    navigationContainer.appendChild(quizModeButton);
    navigationContainer.appendChild(nextButton);
}

function displayQuestionsOnPage(page) {
    const startIndex = (page - 1) * questionsPerPage;
    let endIndex = startIndex + questionsPerPage;
    endIndex = Math.min(endIndex, questionsData.length);

    quizContainer.innerHTML = '';
    for (let i = startIndex; i < endIndex; i++) {
        quizContainer.appendChild(questionContainers[i]);
    }
}

function displayQuestion(question, questionNumber, container) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.innerHTML = questionNumber + '. ' + question.question.replace(/\n/g, '<br>');
    questionDiv.appendChild(questionText);

    if (question.image) {
        const image = document.createElement('img');
        image.src = question.image;
        questionDiv.appendChild(image);
    }

    shuffleArray(question.answers);
    const answersList = document.createElement('ul');
    answersList.classList.add('answers');

    answersList.addEventListener('click', (event) => {
        const clickedAnswer = event.target.closest('.answer');
        if (clickedAnswer) {
            checkAnswer(clickedAnswer, question);
        }
    });

    question.answers.forEach((answer, index) => {
        const answerItem = document.createElement('li');
        answerItem.classList.add('answer');
        answerItem.textContent = String.fromCharCode(97 + index) + ') ' + answer.text;
        answerItem.dataset.index = index;

        answersList.appendChild(answerItem);
    });

    container.appendChild(questionDiv);
    container.appendChild(answersList);
}

function checkAnswer(clickedAnswer, question) {
    const container = clickedAnswer.closest('.question-container');
    const answers = container.querySelectorAll('.answer');

    answers.forEach(answerItem => {
        if (answerItem === clickedAnswer) {
            if (question.answers[clickedAnswer.dataset.index].isCorrect) {
                answerItem.classList.add('correct-answer');
            } else {
                answerItem.classList.add('incorrect-answer');
            }
            answerItem.style.pointerEvents = 'none';
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createNavigationButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = text.toLowerCase().replace(/\s+/g, '-') + '-button';
    button.addEventListener('click', clickHandler);
    return button;
}

function sortQuestionsById(questions) {
    return questions.sort((a, b) => a.id - b.id);
}

function toggleQuizMode() {
    if (isLearningMode) {
        shuffleArray(questionsData);
        document.getElementById('learning-quiz-button').textContent = 'Learning Quiz';
    } else {
        sortQuestionsById(questionsData);
        document.getElementById('learning-quiz-button').textContent = 'Shuffle Quiz';
    }
    isLearningMode = !isLearningMode;
    createQuestionContainers(questionsData);
    restartQuiz();
}

function restartQuiz() {
    currentPage = 1;
    displayQuestionsOnPage(currentPage);
    scrollToTop();
}
