const quizContainer = document.getElementById('quiz-container');
const questionsPerPage = 10;
let currentPage = 1;
let questionsData;
let questionContainers = [];

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        questionsData = data;
        createQuestionContainers(questionsData);
        startQuiz();
    })
    .catch(error => console.error('Error fetching data:', error));

function createQuestionContainers(questions) {
    shuffleArray(questions);

    for (let i = 0; i < questions.length; i++) {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');
        displayQuestion(questions[i], i + 1, questionContainer);
        questionContainers.push(questionContainer);
    }
}

function startQuiz() {
    displayQuestionsOnPage(currentPage);

    const nextButton = createNavigationButton('Next Page', () => {
        if (currentPage !== Math.ceil(questionContainers.length / questionsPerPage)) {
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

    const showAllButton = createNavigationButton('Show All Questions', () => {
        showAllQuestions();
    });

    const navigationContainer = document.getElementById('navigation-container');
    navigationContainer.innerHTML = '';

    navigationContainer.appendChild(backButton);
    navigationContainer.appendChild(showAllButton);
    navigationContainer.appendChild(nextButton);
}

function displayQuestionsOnPage(page) {
    const startIndex = (page - 1) * questionsPerPage;
    let endIndex = startIndex + questionsPerPage;

    if (endIndex > questionContainers.length) {
        endIndex = questionContainers.length;
    }

    quizContainer.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        quizContainer.appendChild(questionContainers[i]);
    }
}

function displayQuestion(question, questionNumber, container) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = questionNumber + '. ' + question.question;
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

function showAllQuestions() {
    for (let i = 0; i < questionContainers.length; i++) {
        const questionContainer = questionContainers[i];
        const answers = questionContainer.querySelectorAll('.answer');

        answers.forEach(answerItem => {
            const isCorrect = questionsData[i].answers[answerItem.dataset.index].isCorrect;

            if (isCorrect) {
                answerItem.classList.add('correct-answer');
            } else {
                answerItem.classList.add('incorrect-answer');
            }
            answerItem.style.pointerEvents = 'none';
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createNavigationButton(text, clickHandler) {
    console.log("Creating button: " + text)
    const button = document.createElement('button');
    button.textContent = text;
    button.id = text.toLowerCase().replace(/\s+/g, '-') + '-button';
    button.addEventListener('click', clickHandler);
    return button;
}
