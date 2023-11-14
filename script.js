const quizContainer = document.getElementById('quiz-container');

const questionsData = getData();

startQuiz(questionsData);

function startQuiz(questions) {
    shuffleArray(questions);

    questions.forEach((question, index) => {
        displayQuestion(question, index);
    });
}

function displayQuestion(question, index) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    if (question.image) {
        const image = document.createElement('img');
        image.src = question.image;
        questionDiv.appendChild(image);
    }

    shuffleArray(question.answers);

    const answersList = document.createElement('ul');
    answersList.classList.add('answers');

    question.answers.forEach(answer => {
        const answerItem = document.createElement('li');
        answerItem.classList.add('answer');
        answerItem.textContent = answer.text;

        answerItem.addEventListener('click', () => checkAnswer(answer, index));

        answersList.appendChild(answerItem);
    });

    questionDiv.appendChild(answersList);
    quizContainer.appendChild(questionDiv);
}

function checkAnswer(selectedAnswer, questionIndex) {
    const answers = document.querySelectorAll('.answer');

    answers.forEach((item, index) => {
        if (Math.floor(index / 3) === questionIndex) {
            if (item.textContent === questionsData[questionIndex].answers.find(a => a.isCorrect).text) {
                item.classList.add('correct-answer');
            } else {
                item.classList.add('incorrect-answer');
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

function getData() {
   return [
        {
            "question": "Test pitanje?",
            "answers": [
                { "text": "Crvena", "isCorrect": false },
                { "text": "Plava", "isCorrect": true },
                { "text": "Zelena", "isCorrect": false }
            ]
        },
        {
            "question": "Koja boja je nebo?",
            "image": "slike.jpg",
            "answers": [
                { "text": "Crvena", "isCorrect": false },
                { "text": "Plava", "isCorrect": true },
                { "text": "Zelena", "isCorrect": false }
            ]
        }
    ];
}
