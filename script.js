const quizContainer = document.getElementById('quiz-container');
const questionsPerPage = 10;
let currentPage = 1;

let questionsData;

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        questionsData = data;
        startQuiz(questionsData);
    })
    .catch(error => console.error('Error fetching data:', error));

function startQuiz(questions) {
    shuffleArray(questions);
    displayQuestionsOnPage(questions, currentPage);

    const nextButton = createNavigationButton('Next Page', () => {
        currentPage++;
        displayQuestionsOnPage(questions, currentPage);
    });

    const backButton = createNavigationButton('Back', () => {
        if (currentPage > 1) {
            currentPage--;
            displayQuestionsOnPage(questions, currentPage);
        }
    });

    const navigationContainer = document.getElementById('navigation-container');
    navigationContainer.appendChild(backButton);
    navigationContainer.appendChild(nextButton);
}

function displayQuestionsOnPage(questions, page) {
    const startIndex = (page - 1) * questionsPerPage;
    let endIndex = startIndex + questionsPerPage;

    if (endIndex > questions.length) {
        endIndex = questions.length;
    }

    const questionsOnPage = questions.slice(startIndex, endIndex);

    quizContainer.innerHTML = '';

    questionsOnPage.forEach((question, index) => {
        const questionNumber = startIndex + index + 1;
        displayQuestion(question, questionNumber);
    });
}

function displayQuestion(question, questionNumber) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = questionNumber + '. ' + question.question;
    questionDiv.appendChild(questionText);

    let selectedAnswer = null;

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
            selectedAnswer = question.answers[clickedAnswer.dataset.index];
            checkAnswer(selectedAnswer, questionNumber - 1);
        }
    });

    question.answers.forEach((answer, index) => {
        const answerItem = document.createElement('li');
        answerItem.classList.add('answer');
        answerItem.textContent = String.fromCharCode(97 + index) + ') ' + answer.text;
        answerItem.dataset.index = index;

        answersList.appendChild(answerItem);
    });

    questionContainer.appendChild(questionDiv);
    questionContainer.appendChild(answersList);
    quizContainer.appendChild(questionContainer);
}


function checkAnswer(selectedAnswer, questionIndex) {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const answers = document.querySelectorAll('.answer');

    answers.forEach((item, index) => {
        const questionNumber = startIndex + Math.floor(index / questionsData[questionIndex].answers.length);

        if (questionNumber === questionIndex) {
            const currentAnswer = questionsData[questionIndex].answers[index % questionsData[questionIndex].answers.length];

            if (currentAnswer.isCorrect) {
                item.classList.add('correct-answer');
            } else {
                item.classList.add('incorrect-answer');
            }

            if (currentAnswer.text === selectedAnswer.text) {
                if (currentAnswer.isCorrect) {
                    item.classList.add('selected-correct-answer');
                } else {
                    item.classList.add('selected-incorrect-answer');
                }
            }
        }
    });
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
    button.addEventListener('click', clickHandler);
    return button;
}
