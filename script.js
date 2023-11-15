const quizContainer = document.getElementById('quiz-container');
const questionsData = getData();
const questionsPerPage = 10;
let currentPage = 1;

startQuiz(questionsData);

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
    const endIndex = startIndex + questionsPerPage;
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

    question.answers.forEach((answer, index) => {
        const answerItem = document.createElement('li');
        answerItem.classList.add('answer');
        answerItem.textContent = String.fromCharCode(97 + index) + ') ' + answer.text;

        answerItem.addEventListener('click', () => {
            selectedAnswer = answer;
            checkAnswer(selectedAnswer, questionNumber - 1);
        });

        answersList.appendChild(answerItem);
    });

    questionContainer.appendChild(questionDiv);
    questionContainer.appendChild(answersList);
    quizContainer.appendChild(questionContainer);
}


function checkAnswer(selectedAnswer, questionIndex) {
    const answers = document.querySelectorAll('.answer');

    answers.forEach((item, index) => {
        const questionNumber = Math.floor(index / questionsData[questionIndex].answers.length);
        const currentAnswer = questionsData[questionIndex].answers[index % questionsData[questionIndex].answers.length];

        if (questionNumber === questionIndex) {
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

        item.removeEventListener('click', () => checkAnswer(item, questionIndex));
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


function getData() {
   return [
        {
            "question": "Every employee of your company has a Google account. Your operational team needs to manage a large number of instances on Compute Engine. Each member of this team needs only administrative access to the servers. Your security team wants to ensure that the deployment of credentials is operationally efficient and must be able to determine who accessed a given instance. What should you do?",
            "answers": [
                { "text": "Ask each member of the team to generate a new SSH key pair and to add the public key to their Google account. Grant the ג€compute.osAdminLoginג€ role to the Google group corresponding to this team.", "isCorrect": true },
                { "text": "Generate a new SSH key pair. Give the private key to each member of your team. Configure the public key in the metadata of each instance.", "isCorrect": false },
                { "text": "Ask each member of the team to generate a new SSH key pair and to send you their public key. Use a configuration management tool to deploy those keys on each instance.", "isCorrect": false },
                { "text": "Generate a new SSH key pair. Give the private key to each member of your team. Configure the public key as a project-wide public SSH key in your Cloud Platform project and allow project-wide public SSH keys on each instance.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to create a custom VPC with a single subnet. The subnet's range must be as large as possible. Which range should you use?",
            "answers": [
                { "text": "0.0.0.0/0", "isCorrect": false },
                { "text": "10.0.0.0/8", "isCorrect": true },
                { "text": "172.16.0.0/12", "isCorrect": false },
                { "text": "192.168.0.0/16", "isCorrect": false }
            ]
        },
        {
            "question": "You want to select and configure a cost-effective solution for relational data on Google Cloud Platform. You are working with a small set of operational data in one geographic location. You need to support point-in-time recovery. What should you do?",
            "answers": [
                { "text": "Select Cloud SQL (MySQL). Verify that the enable binary logging option is selected.", "isCorrect": true },
                { "text": "Select Cloud SQL (MySQL). Select the create failover replicas option.", "isCorrect": false },
                { "text": "Select Cloud Spanner. Set up your instance with 2 nodes.", "isCorrect": false },
                { "text": "Select Cloud Spanner. Set up your instance as multi-regional", "isCorrect": false }
            ]
        }
    ];
}