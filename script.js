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

    answersList.addEventListener('click', (event) => {
        const clickedAnswer = event.target.closest('.answer');
        if (clickedAnswer) {
            selectedAnswer = question.answers[clickedAnswer.dataset.index];
            console.log(selectedAnswer);
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
        },
        {
            "question": "You want to select and configure a cost-effective solution for relational data on Google Cloud Platform. You are working with a small set of operational data in one geographic location. You need to support point-in-time recovery. What should you do?",
            "answers": [
                { "text": "Select Cloud SQL (MySQL). Verify that the enable binary logging option is selected.", "isCorrect": true },
                { "text": "Select Cloud SQL (MySQL). Select the create failover replicas option.", "isCorrect": false },
                { "text": "Select Cloud Spanner. Set up your instance with 2 nodes.", "isCorrect": false },
                { "text": "Select Cloud Spanner. Set up your instance as multi-regional", "isCorrect": false }
            ]
        },
        {
            "question": "You want to configure autohealing for network load balancing for a group of Compute Engine instances that run in multiple zones, using the fewest possible steps. You need to configure re-creation of VMs if they are unresponsive after 3 attempts of 10 seconds each. What should you do?",
            "answers": [
                { "text": "Create a managed instance group. Set the Autohealing health check to healthy (HTTP)", "isCorrect": true },
                { "text": "Create an HTTP load balancer with a backend configuration that references an existing instance group. Set the health check to healthy (HTTP)", "isCorrect": false },
                { "text": "Create an HTTP load balancer with a backend configuration that references an existing instance group. Define a balancing mode and set the maximum RPS to 10.", "isCorrect": false },
                { "text": "Create a managed instance group. Verify that the autoscaling setting is on.", "isCorrect": false }
            ]
        },
        {
            "question": "You are using multiple configurations for gcloud. You want to review the configured Kubernetes Engine cluster of an inactive configuration using the fewest possible steps. What should you do?",
            "answers": [
                { "text": "Use kubectl config use-context and kubectl config view to review the output.", "isCorrect": true },
                { "text": "Use gcloud config configurations describe to review the output.", "isCorrect": false },
                { "text": "Use gcloud config configurations activate and gcloud config list to review the output.", "isCorrect": false },
                { "text": "Use kubectl config get-contexts to review the output.", "isCorrect": false }
            ]
        },
        {
            "question": "Your company uses Cloud Storage to store application backup files for disaster recovery purposes. You want to follow Google's recommended practices. Which storage option should you use?",
            "answers": [
                { "text": "Multi-Regional Storage", "isCorrect": false },
                { "text": "Regional Storage", "isCorrect": false },
                { "text": "Nearline Storage", "isCorrect": false },
                { "text": "Coldline Storage", "isCorrect": true }
            ]
        },
        {
            "question": "Several employees at your company have been creating projects with Cloud Platform and paying for it with their personal credit cards, which the company reimburses. The company wants to centralize all these projects under a single, new billing account. What should you do?",
            "answers": [
                { "text": "Contact cloud-billing@google.com with your bank account details and request a corporate billing account for your company.", "isCorrect": false },
                { "text": "Create a ticket with Google Support and wait for their call to share your credit card details over the phone.", "isCorrect": false },
                { "text": "In the Google Platform Console, go to the Resource Manage and move all projects to the root Organization.", "isCorrect": false },
                { "text": "In the Google Cloud Platform Console, create a new billing account and set up a payment method.", "isCorrect": true }
            ]
        },
        {
            "question": "You have an application that looks for its licensing server on the IP 10.0.3.21. You need to deploy the licensing server on Compute Engine. You do not want to change the configuration of the application and want the application to be able to reach the licensing server. What should you do?",
            "answers": [
                { "text": "Reserve the IP 10.0.3.21 as a static internal IP address using gcloud and assign it to the licensing server.", "isCorrect": true },
                { "text": "Reserve the IP 10.0.3.21 as a static public IP address using gcloud and assign it to the licensing server.", "isCorrect": false },
                { "text": "Use the IP 10.0.3.21 as a custom ephemeral IP address and assign it to the licensing server.", "isCorrect": false },
                { "text": "Start the licensing server with an automatic ephemeral IP address, and then promote it to a static internal IP address.", "isCorrect": false }
            ]
        },
        {
            "question": "You are deploying an application to App Engine. You want the number of instances to scale based on request rate. You need at least 3 unoccupied instances at all times. Which scaling type should you use?",
            "answers": [
                { "text": "Manual Scaling with 3 instances.", "isCorrect": false },
                { "text": "Basic Scaling with min_instances set to 3.", "isCorrect": false },
                { "text": "Basic Scaling with max_instances set to 3.", "isCorrect": false },
                { "text": "Automatic Scaling with min_idle_instances set to 3.", "isCorrect": true }
            ]
        },
        {
            "question": "You have a development project with appropriate IAM roles defined. You are creating a production project and want to have the same IAM roles on the new project, using the fewest possible steps. What should you do?",
            "answers": [
                { "text": "Use gcloud iam roles copy and specify the production project as the destination project.", "isCorrect": true },
                { "text": "Use gcloud iam roles copy and specify your organization as the destination organization.", "isCorrect": false },
                { "text": "In the Google Cloud Platform Console, use the 'create role from role' functionality.", "isCorrect": false },
                { "text": "In the Google Cloud Platform Console, use the 'create role' functionality and select all applicable permissions.", "isCorrect": false }
            ]
        },
        {
            "question": "You need a dynamic way of provisioning VMs on Compute Engine. The exact specifications will be in a dedicated configuration file. You want to follow Google's recommended practices. Which method should you use?",
            "answers": [
                { "text": "Deployment Manager", "isCorrect": true },
                { "text": "Cloud Composer", "isCorrect": false },
                { "text": "Managed Instance Group", "isCorrect": false },
                { "text": "Unmanaged Instance Group", "isCorrect": false }
            ]
        },
        {
            "question": "You have a Dockerfile that you need to deploy on Kubernetes Engine. What should you do?",
            "answers": [
                { "text": "Use kubectl app deploy <dockerfilename>.", "isCorrect": false },
                { "text": "Use gcloud app deploy <dockerfilename>.", "isCorrect": false },
                { "text": "Create a docker image from the Dockerfile and upload it to Container Registry. Create a Deployment YAML file to point to that image. Use kubectl to create the deployment with that file.", "isCorrect": true },
                { "text": "Create a docker image from the Dockerfile and upload it to Cloud Storage. Create a Deployment YAML file to point to that image. Use kubectl to create the deployment with that file.", "isCorrect": false }
            ]
        },
        {
            "question": "Your development team needs a new Jenkins server for their project. You need to deploy the server using the fewest steps possible. What should you do?",
            "answers": [
                { "text": "Download and deploy the Jenkins Java WAR to App Engine Standard.", "isCorrect": false },
                { "text": "Create a new Compute Engine instance and install Jenkins through the command line interface.", "isCorrect": false },
                { "text": "Create a Kubernetes cluster on Compute Engine and create a deployment with the Jenkins Docker image.", "isCorrect": false },
                { "text": "Use GCP Marketplace to launch the Jenkins solution.", "isCorrect": true }
            ]
        },
        {
            "question": "You need to update a deployment in Deployment Manager without any resource downtime in the deployment. Which command should you use?",
            "answers": [
                { "text": "gcloud deployment-manager deployments create --config <deployment-config-path>", "isCorrect": false },
                { "text": "gcloud deployment-manager deployments update --config <deployment-config-path>", "isCorrect": true },
                { "text": "gcloud deployment-manager resources create --config <deployment-config-path>", "isCorrect": false },
                { "text": "gcloud deployment-manager resources update --config <deployment-config-path>", "isCorrect": false }
            ]
        },
        {
            "question": "You need to run an important query in BigQuery but expect it to return a lot of records. You want to find out how much it will cost to run the query. You are using on-demand pricing. What should you do?",
            "answers": [
                { "text": "Arrange to switch to Flat-Rate pricing for this query, then move back to on-demand.", "isCorrect": false },
                { "text": "Use the command line to run a dry run query to estimate the number of bytes read. Then convert that bytes estimate to dollars using the Pricing Calculator.", "isCorrect": true },
                { "text": "Use the command line to run a dry run query to estimate the number of bytes returned. Then convert that bytes estimate to dollars using the Pricing Calculator.", "isCorrect": false },
                { "text": "Run a select count (*) to get an idea of how many records your query will look through. Then convert that number of rows to dollars using the Pricing Calculator.", "isCorrect": false }
            ]
        },
        {
            "question": "You have a single binary application that you want to run on Google Cloud Platform. You decided to automatically scale the application based on underlying infrastructure CPU usage. Your organizational policies require you to use virtual machines directly. You need to ensure that the application scaling is operationally efficient and completed as quickly as possible. What should you do?",
            "answers": [
                { "text": "Create a Google Kubernetes Engine cluster, and use horizontal pod autoscaling to scale the application.", "isCorrect": false },
                { "text": "Create an instance template, and use the template in a managed instance group with autoscaling configured.", "isCorrect": true },
                { "text": "Create an instance template, and use the template in a managed instance group that scales up and down based on the time of day.", "isCorrect": false },
                { "text": "Use a set of third-party tools to build automation around scaling the application up and down, based on Stackdriver CPU usage monitoring.", "isCorrect": false }
            ]
        },
        {
            "question": "You are analyzing Google Cloud Platform service costs from three separate projects. You want to use this information to create service cost estimates by service type, daily and monthly, for the next six months using standard query syntax. What should you do?",
            "answers": [
                { "text": "Export your bill to a Cloud Storage bucket, and then import into Cloud Bigtable for analysis.", "isCorrect": false },
                { "text": "Export your bill to a Cloud Storage bucket, and then import into Google Sheets for analysis.", "isCorrect": false },
                { "text": "Export your transactions to a local file, and perform analysis with a desktop tool.", "isCorrect": false },
                { "text": "Export your bill to a BigQuery dataset, and then write time window-based SQL queries for analysis.", "isCorrect": true }
            ]
        },
        {
            "question": "You need to set up a policy so that videos stored in a specific Cloud Storage Regional bucket are moved to Coldline after 90 days, and then deleted after one year from their creation. How should you set up the policy?",
            "answers": [
                { "text": "Use Cloud Storage Object Lifecycle Management using Age conditions with SetStorageClass and Delete actions. Set the SetStorageClass action to 90 days and the Delete action to 275 days (365 - 90)", "isCorrect": true },
                { "text": "Use Cloud Storage Object Lifecycle Management using Age conditions with SetStorageClass and Delete actions. Set the SetStorageClass action to 90 days and the Delete action to 365 days.", "isCorrect": false },
                { "text": "Use gsutil rewrite and set the Delete action to 275 days (365-90).", "isCorrect": false },
                { "text": "Use gsutil rewrite and set the Delete action to 365 days.", "isCorrect": false }
            ]
        },
        {
            "question": "You have a Linux VM that must connect to Cloud SQL. You created a service account with the appropriate access rights. You want to make sure that the VM uses this service account instead of the default Compute Engine service account. What should you do?",
            "answers": [
                { "text": "When creating the VM via the web console, specify the service account under the 'Identity and API Access' section.", "isCorrect": true },
                { "text": "Download a JSON Private Key for the service account. On the Project Metadata, add that JSON as the value for the key compute-engine-service-account.", "isCorrect": false },
                { "text": "Download a JSON Private Key for the service account. On the Custom Metadata of the VM, add that JSON as the value for the key compute-engine-service-account.", "isCorrect": false },
                { "text": "Download a JSON Private Key for the service account. After creating the VM, ssh into the VM and save the JSON under ~/.gcloud/compute-engine-service-account.json.", "isCorrect": false }
            ]
        }
    ];
}