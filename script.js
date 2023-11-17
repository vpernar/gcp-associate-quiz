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
            "question": "1.Every employee of your company has a Google account. Your operational team needs to manage a large number of instances on Compute Engine. Each member of this team needs only administrative access to the servers. Your security team wants to ensure that the deployment of credentials is operationally efficient and must be able to determine who accessed a given instance. What should you do?",
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
                { "text": "10.0.0.0/8", "isCorrect": true },
                { "text": "0.0.0.0/0", "isCorrect": false },
                { "text": "c.172.16.0.0/12", "isCorrect": false },
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
            "question": "You want to configure autohealing for network load balancing for a group of Compute Engine instances that run in multiple zones, using the fewest possible steps. You need to configure re-creation of VMs if they are unresponsive after 3 attempts of 10 seconds each. What should you do?",
            "answers": [
                { "text": "Create an HTTP load balancer with a backend configuration that references an existing instance group. Set the health check to healthy (HTTP)", "isCorrect": false },
                { "text": "Create an HTTP load balancer with a backend configuration that references an existing instance group. Define a balancing mode and set the maximum RPS to 10.", "isCorrect": false },
                { "text": "Create a managed instance group. Set the Autohealing health check to healthy (HTTP)", "isCorrect": true },
                { "text": "Create a managed instance group. Verify that the autoscaling setting is on.", "isCorrect": false }

            ]
        },
        {
            "question": "You are using multiple configurations for gcloud. You want to review the configured Kubernetes Engine cluster of an inactive configuration using the fewest possible steps. What should you do?",
            "answers": [
                { "text": "Use kubectl config use-context and kubectl config view to review the output.", "isCorrect": true },
                { "text": "Use gcloud config configurations describe to review the output.", "isCorrect": false },
                { "text": "Use gcloud config configurations activate and gcloud config list to review the output.", "isCorrect": false },
                { "text": "Use gcloud config configurations describe to review the output.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company uses Cloud Storage to store application backup files for disaster recovery purposes. You want to follow Google's recommended practices. Which storage option should you use?",
            "answers": [
                { "text": "Coldline Storage", "isCorrect": true },
                { "text": "Nearline Storage", "isCorrect": false },
                { "text": "Regional Storage", "isCorrect": false },
                { "text": "Multi-Regional Storage", "isCorrect": false }

            ]
        },
        {
            "question": "Several employees at your company have been creating projects with Cloud Platform and paying for it with their personal credit cards, which the company reimburses. The company wants to centralize all these projects under a single, new billing account. What should you do?",
            "answers": [
                { "text": "In the Google Cloud Platform Console, create a new billing account and set up a payment method.", "isCorrect": true },
                { "text": "Contact cloud-billing@google.com with your bank account details and request a corporate billing account for your company", "isCorrect": false },
                { "text": "Create a ticket with Google Support and wait for their call to share your credit card details over the phone.", "isCorrect": false },
                { "text": "In the Google Platform Console, go to the Resource Manage and move all projects to the root Organization.", "isCorrect": false }

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
                { "text": "Automatic Scaling with min_idle_instances set to 3.", "isCorrect": true },
                { "text": "Basic Scaling with max_instances set to 3.", "isCorrect": false },
                { "text": "Basic Scaling with min_instances set to 3.", "isCorrect": false },
                { "text": "Manual Scaling with 3 instances.", "isCorrect": false }

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
                { "text": "Create a docker image from the Dockerfile and upload it to Container Registry. Create a Deployment YAML file to point to that image. Use kubectl to create the deployment with that file.", "isCorrect": true },
                { "text": "Use kubectl app deploy <dockerfilename>.", "isCorrect": false },
                { "text": "Use gcloud app deploy <dockerfilename>.", "isCorrect": false },
                { "text": "Create a docker image from the Dockerfile and upload it to Cloud Storage. Create a Deployment YAML file to point to that image. Use kubectl to create the deployment with that file.", "isCorrect": false }

            ]
        },
        {
            "question": "Your development team needs a new Jenkins server for their project. You need to deploy the server using the fewest steps possible. What should you do?",
            "answers": [
                { "text": "Use GCP Marketplace to launch the Jenkins solution.", "isCorrect": true },
                { "text": "Create a Kubernetes cluster on Compute Engine and create a deployment with the Jenkins Docker image.", "isCorrect": false },
                { "text": "Create a new Compute Engine instance and install Jenkins through the command line interface.", "isCorrect": false },
                { "text": "Download and deploy the Jenkins Java WAR to App Engine Standard.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to update a deployment in Deployment Manager without any resource downtime in the deployment. Which command should you use?",
            "answers": [
                { "text": "gcloud deployment-manager deployments update --config <deployment-config-path>", "isCorrect": true },
                { "text": "gcloud deployment-manager deployments create --config <deployment-config-path>", "isCorrect": false },
                { "text": "gcloud deployment-manager resources create --config <deployment-config-path>", "isCorrect": false },
                { "text": "gcloud deployment-manager resources update --config <deployment-config-path>", "isCorrect": false }

            ]
        },
        {
            "question": "You need to run an important query in BigQuery but expect it to return a lot of records. You want to find out how much it will cost to run the query. You are using on-demand pricing. What should you do?",
            "answers": [
                { "text": "Use the command line to run a dry run query to estimate the number of bytes read. Then convert that bytes estimate to dollars using the Pricing Calculator.", "isCorrect": true },
                { "text": "Arrange to switch to Flat-Rate pricing for this query, then move back to on-demand.", "isCorrect": false },
                { "text": "Use the command line to run a dry run query to estimate the number of bytes returned. Then convert that bytes estimate to dollars using the Pricing Calculator.", "isCorrect": false },
                { "text": "Run a select count (*) to get an idea of how many records your query will look through. Then convert that number of rows to dollars using the Pricing Calculator.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a single binary application that you want to run on Google Cloud Platform. You decided to automatically scale the application based on underlying infrastructure CPU usage. Your organizational policies require you to use virtual machines directly. You need to ensure that the application scaling is operationally efficient and completed as quickly as possible. What should you do?",
            "answers": [
                { "text": "Create an instance template, and use the template in a managed instance group with autoscaling configured.", "isCorrect": true },
                { "text": "Create a Google Kubernetes Engine cluster, and use horizontal pod autoscaling to scale the application.", "isCorrect": false },
                { "text": "Create an instance template, and use the template in a managed instance group that scales up and down based on the time of day.", "isCorrect": false },
                { "text": "Use a set of third-party tools to build automation around scaling the application up and down, based on Stackdriver CPU usage monitoring.", "isCorrect": false }

            ]
        },
        {
            "question": "You are analyzing Google Cloud Platform service costs from three separate projects. You want to use this information to create service cost estimates by service type, daily and monthly, for the next six months using standard query syntax. What should you do?",
            "answers": [
                { "text": "Export your bill to a BigQuery dataset, and then write time window-based SQL queries for analysis.", "isCorrect": true },
                { "text": "Export your bill to a Cloud Storage bucket, and then import into Cloud Bigtable for analysis.", "isCorrect": false },
                { "text": "Export your bill to a Cloud Storage bucket, and then import into Google Sheets for analysis.", "isCorrect": false },
                { "text": "Export your transactions to a local file, and perform analysis with a desktop tool.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to set up a policy so that videos stored in a specific Cloud Storage Regional bucket are moved to Coldline after 90 days, and then deleted after one year from their creation. How should you set up the policy?",
            "answers": [
                { "text": "Use Cloud Storage Object Lifecycle Management using Age conditions with SetStorageClass and Delete actions. Set the SetStorageClass action to 90 days and the Delete action to 365 days.", "isCorrect": true },
                { "text": "Use Cloud Storage Object Lifecycle Management using Age conditions with SetStorageClass and Delete actions. Set the SetStorageClass action to 90 days and the Delete action to 275 days (365 ג€\" 90)", "isCorrect": false },
                { "text": "Use gsutil rewrite and set the Delete action to 275 days (365-90).", "isCorrect": false },
                { "text": "Use gsutil rewrite and set the Delete action to 365 days.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a Linux VM that must connect to Cloud SQL. You created a service account with the appropriate access rights. You want to make sure that the VM uses this service account instead of the default Compute Engine service account. What should you do?",
            "answers": [
                { "text": "When creating the VM via the web console, specify the service account under the 'Identity and API Access' section.", "isCorrect": true },
                { "text": "Download a JSON Private Key for the service account. On the Project Metadata, add that JSON as the value for the key compute-engine-service- account.", "isCorrect": false },
                { "text": "Download a JSON Private Key for the service account. On the Custom Metadata of the VM, add that JSON as the value for the key compute-engine- service-account.", "isCorrect": false },
                { "text": "Download a JSON Private Key for the service account. After creating the VM, ssh into the VM and save the JSON under ~/.gcloud/compute-engine-service- account.json.", "isCorrect": false }

            ]
        },
        {
            "question": "You created an instance of SQL Server 2017 on Compute Engine to test features in the new version. You want to connect to this instance using the fewest number of steps. What should you do?",
            "answers": [
                { "text": "Install a RDP client in your desktop. Set a Windows username and password in the GCP Console. Use the credentials to log in to the instance.", "isCorrect": true },
                { "text": "Install a RDP client on your desktop. Verify that a firewall rule for port 3389 exists.", "isCorrect": false },
                { "text": "Set a Windows password in the GCP Console. Verify that a firewall rule for port 22 exists. Click the RDP button in the GCP Console and supply the credentials to log in.", "isCorrect": false },
                { "text": "Set a Windows username and password in the GCP Console. Verify that a firewall rule for port 3389 exists. Click the RDP button in the GCP Console, and supply the credentials to log in.", "isCorrect": false }

            ]
        },
        {
            "question": "You have one GCP account running in your default region and zone and another account running in a non-default region and zone. You want to start a new Compute Engine instance in these two Google Cloud Platform accounts using the command line interface. What should you do?",
            "answers": [
                { "text": "Create two configurations using gcloud config configurations create [NAME]. Run gcloud config configurations activate [NAME] to switch between accounts when running the commands to start the Compute Engine instances.", "isCorrect": true },
                { "text": "Create two configurations using gcloud config configurations create [NAME]. Run gcloud configurations list to start the Compute Engine instances.", "isCorrect": false },
                { "text": "Activate two configurations using gcloud configurations activate [NAME]. Run gcloud config list to start the Compute Engine instances.", "isCorrect": false },
                { "text": "Activate two configurations using gcloud configurations activate [NAME]. Run gcloud configurations list to start the Compute Engine instances.", "isCorrect": false }

            ]
        },
        {
            "question": "You significantly changed a complex Deployment Manager template and want to confirm that the dependencies of all defined resources are properly met before committing it to the project. You want the most rapid feedback on your changes. What should you do?",
            "answers": [
                { "text": "Execute the Deployment Manager template using the ג€\"-preview option in the same project, and observe the state of interdependent resources.", "isCorrect": true },
                { "text": "Use granular logging statements within a Deployment Manager template authored in Python.", "isCorrect": false },
                { "text": "Monitor activity of the Deployment Manager execution on the Stackdriver Logging page of the GCP Console.", "isCorrect": false },
                { "text": "Execute the Deployment Manager template against a separate project with the same configuration, and monitor for failures.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building a pipeline to process time-series data. Which Google Cloud Platform services should you put in boxes 1,2,3, and 4?",
            "image": "./images/1.png",
            "answers": [
                { "text": "Cloud Pub/Sub, Cloud Dataflow, Cloud Bigtable, BigQuery", "isCorrect": true },
                { "text": "Cloud Pub/Sub, Cloud Storage, BigQuery, Cloud Bigtable", "isCorrect": false },
                { "text": "Firebase Messages, Cloud Pub/Sub, Cloud Spanner, BigQuery", "isCorrect": false },
                { "text": "Cloud Pub/Sub, Cloud Dataflow, Cloud Datastore, BigQuery", "isCorrect": false }

            ]
        },
        {
            "question": "You have a project for your App Engine application that serves a development environment. The required testing has succeeded and you want to create a new project to serve as your production environment. What should you do?",
            "answers": [
                { "text": "Use gcloud to create the new project, and then deploy your application to the new project.", "isCorrect": true },
                { "text": "Use gcloud to create the new project and to copy the deployed application to the new project.", "isCorrect": false },
                { "text": "Create a Deployment Manager configuration file that copies the current App Engine deployment into a new project.", "isCorrect": false },
                { "text": "Deploy your application again using gcloud and specify the project parameter with the new project name to create the new project.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to configure IAM access audit logging in BigQuery for external auditors. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Add the auditors group to the 'logging.viewer' and 'bigQuery.dataViewer' predefined IAM roles.", "isCorrect": true },
                { "text": "Add the auditors group to two new custom IAM roles.", "isCorrect": false },
                { "text": "Add the auditor user accounts to the 'logging.viewer' and 'bigQuery.dataViewer' predefined IAM roles.", "isCorrect": false },
                { "text": "Add the auditor user accounts to two new custom IAM roles.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to set up permissions for a set of Compute Engine instances to enable them to write data into a particular Cloud Storage bucket. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Create a service account with an access scope. Use the access scope 'https://www.googleapis.com/auth/devstorage.write_only'.", "isCorrect": false },
                { "text": "Create a service account with an access scope. Use the access scope 'https://www.googleapis.com/auth/cloud-platform'.", "isCorrect": false },
                { "text": "Create a service account and add it to the IAM role 'storage.objectCreator' for that bucket.", "isCorrect": true },
                { "text": "Create a service account and add it to the IAM role 'storage.objectAdmin' for that bucket.", "isCorrect": false }

            ]
        },
        {
            "question": "You have sensitive data stored in three Cloud Storage buckets and have enabled data access logging. You want to verify activities for a particular user for these buckets, using the fewest possible steps. You need to verify the addition of metadata labels and which files have been viewed from those buckets. What should you do?",
            "answers": [
                { "text": "Using the GCP Console, filter the Stackdriver log to view the information.", "isCorrect": true },
                { "text": "Using the GCP Console, filter the Activity log to view the information.", "isCorrect": false },
                { "text": "View the bucket in the Storage section of the GCP Console.", "isCorrect": false },
                { "text": "Create a trace in Stackdriver to view the information.", "isCorrect": false }

            ]
        },
        {
            "question": "You are the project owner of a GCP project and want to delegate control to colleagues to manage buckets and files in Cloud Storage. You want to follow Google- recommended practices. Which IAM roles should you grant your colleagues?",
            "answers": [
                { "text": "Storage Admin", "isCorrect": true },
                { "text": "Project Editor", "isCorrect": false },
                { "text": "Storage Object Admin", "isCorrect": false },
                { "text": "Storage Object Creator", "isCorrect": false }

            ]
        },
        {
            "question": "You have an object in a Cloud Storage bucket that you want to share with an external company. The object contains sensitive data. You want access to the content to be removed after four hours. The external company does not have a Google account to which you can grant specific user-based access privileges. You want to use the most secure method that requires the fewest steps. What should you do?",
            "answers": [
                { "text": "Create a signed URL with a four-hour expiration and share the URL with the company.", "isCorrect": true },
                { "text": "Set object access to 'public' and use object lifecycle management to remove the object after four hours.", "isCorrect": false },
                { "text": "Configure the storage bucket as a static website and furnish the object's URL to the company. Delete the object from the storage bucket after four hours.", "isCorrect": false },
                { "text": "Create a new Cloud Storage bucket specifically for the external company to access. Copy the object to that bucket. Delete the bucket after four hours have passed.", "isCorrect": false }

            ]
        },
        {
            "question": "You are creating a Google Kubernetes Engine (GKE) cluster with a cluster autoscaler feature enabled. You need to make sure that each node of the cluster will run a monitoring pod that sends container metrics to a third-party monitoring solution. What should you do?",
            "answers": [
                { "text": "Deploy the monitoring pod in a DaemonSet object.", "isCorrect": true },
                { "text": "Deploy the monitoring pod in a StatefulSet object.", "isCorrect": false },
                { "text": "Reference the monitoring pod in a Deployment object.", "isCorrect": false },
                { "text": "Reference the monitoring pod in a cluster initializer at the GKE cluster creation time.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to send and consume Cloud Pub/Sub messages from your App Engine application. The Cloud Pub/Sub API is currently disabled. You will use a service account to authenticate your application to the API. You want to make sure your application can use Cloud Pub/Sub. What should you do?",
            "answers": [
                { "text": "Enable the Cloud Pub/Sub API in the API Library on the GCP Console.", "isCorrect": true },
                { "text": "Rely on the automatic enablement of the Cloud Pub/Sub API when the Service Account accesses it.", "isCorrect": false },
                { "text": "Use Deployment Manager to deploy your application. Rely on the automatic enablement of all APIs used by the application being deployed.", "isCorrect": false },
                { "text": "Grant the App Engine Default service account the role of Cloud Pub/Sub Admin. Have your application enable the API on the first connection to Cloud Pub/ Sub.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to monitor resources that are distributed over different projects in Google Cloud Platform. You want to consolidate reporting under the same Stackdriver Monitoring dashboard. What should you do?",
            "answers": [
                { "text": "Configure a single Stackdriver account, and link all projects to the same account.", "isCorrect": true },
                { "text": "Use Shared VPC to connect all projects, and link Stackdriver to one of the projects.", "isCorrect": false },
                { "text": "For each project, create a Stackdriver account. In each project, create a service account for that project and grant it the role of Stackdriver Account Editor in all other projects.", "isCorrect": false },
                { "text": "Configure a single Stackdriver account for one of the projects. In Stackdriver, create a Group and add the other project names as criteria for that Group.", "isCorrect": false }

            ]
        },
        {
            "question": "You are deploying an application to a Compute Engine VM in a managed instance group. The application must be running at all times, but only a single instance of the VM should run per GCP project. How should you configure the instance group?",
            "answers": [
                { "text": "Set autoscaling to On, set the minimum number of instances to 1, and then set the maximum number of instances to 1.", "isCorrect": true },
                { "text": "Set autoscaling to Off, set the minimum number of instances to 1, and then set the maximum number of instances to 1.", "isCorrect": false },
                { "text": "Set autoscaling to On, set the minimum number of instances to 1, and then set the maximum number of instances to 2.", "isCorrect": false },
                { "text": "Set autoscaling to Off, set the minimum number of instances to 1, and then set the maximum number of instances to 2.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to verify the IAM users and roles assigned within a GCP project named my-project. What should you do?",
            "answers": [
                { "text": "Navigate to the project and then to the IAM section in the GCP Console. Review the members and roles.", "isCorrect": true },
                { "text": "Run gcloud iam roles list. Review the output section.", "isCorrect": false },
                { "text": "Run gcloud iam service-accounts list. Review the output section.", "isCorrect": false },
                { "text": "Navigate to the project and then to the Roles section in the GCP Console. Review the roles and status.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to create a new billing account and then link it with an existing Google Cloud Platform project. What should you do?",
            "answers": [
                { "text": "Verify that you are Project Billing Manager for the GCP project. Create a new billing account and link the new billing account to the existing project.", "isCorrect": true },
                { "text": "Verify that you are Project Billing Manager for the GCP project. Update the existing project to link it to the existing billing account.", "isCorrect": false },
                { "text": "Verify that you are Billing Administrator for the billing account. Create a new project and link the new project to the existing billing account.", "isCorrect": false },
                { "text": "Verify that you are Billing Administrator for the billing account. Update the existing project to link it to the existing billing account.", "isCorrect": false }

            ]
        },
        {
            "question": "You have one project called proj-sa where you manage all your service accounts. You want to be able to use a service account from this project to take snapshots of VMs running in another project called proj-vm. What should you do?",
            "answers": [
                { "text": "Grant the service account the IAM Role of Compute Storage Admin in the project called proj-vm.", "isCorrect": true },
                { "text": "Download the private key from the service account, and add it to each VMs custom metadata.", "isCorrect": false },
                { "text": "Download the private key from the service account, and add the private key to each VM's SSH keys.", "isCorrect": false },
                { "text": "When creating the VMs, set the service account's API scope for Compute Engine to read/write.", "isCorrect": false }

            ]
        },
        {
            "question": "You created a Google Cloud Platform project with an App Engine application inside the project. You initially configured the application to be served from the us- central region. Now you want the application to be served from the asia-northeast1 region. What should you do?",
            "answers": [
                { "text": "Create a new GCP project and create an App Engine application inside this new project. Specify asia-northeast1 as the region to serve your application.", "isCorrect": true },
                { "text": "Change the default region property setting in the existing GCP project to asia-northeast1.", "isCorrect": false },
                { "text": "Change the region property setting in the existing App Engine application from us-central to asia-northeast1.", "isCorrect": false },
                { "text": "Create a second App Engine application in the existing GCP project and specify asia-northeast1 as the region to serve your application.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to grant access for three users so that they can view and edit table data on a Cloud Spanner instance. What should you do?",
            "answers": [
                { "text": "Run gcloud iam roles describe roles/spanner.databaseUser. Add the users to a new group. Add the group to the role.", "isCorrect": true },
                { "text": "Run gcloud iam roles describe roles/spanner.databaseUser. Add the users to the role.", "isCorrect": false },
                { "text": "Run gcloud iam roles describe roles/spanner.viewer - -project my-project. Add the users to the role.", "isCorrect": false },
                { "text": "Run gcloud iam roles describe roles/spanner.viewer - -project my-project. Add the users to a new group. Add the group to the role.", "isCorrect": false }

            ]
        },
        {
            "question": "You create a new Google Kubernetes Engine (GKE) cluster and want to make sure that it always runs a supported and stable version of Kubernetes. What should you do?",
            "answers": [
                { "text": "Enable the Node Auto-Upgrades feature for your GKE cluster.", "isCorrect": true },
                { "text": "Enable the Node Auto-Repair feature for your GKE cluster.", "isCorrect": false },
                { "text": "Select the latest available cluster version for your GKE cluster.", "isCorrect": false },
                { "text": "Select ג€Container-Optimized OS (cos)ג€ as a node image for your GKE cluster.", "isCorrect": false }

            ]
        },
        {
            "question": "You have an instance group that you want to load balance. You want the load balancer to terminate the client SSL session. The instance group is used to serve a public web application over HTTPS. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Configure an HTTP(S) load balancer.", "isCorrect": true },
                { "text": "Configure an internal TCP load balancer.", "isCorrect": false },
                { "text": "Configure an external SSL proxy load balancer.", "isCorrect": false },
                { "text": "Configure an external TCP proxy load balancer.", "isCorrect": false }

            ]
        },
        {
            "question": "You have 32 GB of data in a single file that you need to upload to a Nearline Storage bucket. The WAN connection you are using is rated at 1 Gbps, and you are the only one on the connection. You want to use as much of the rated 1 Gbps as possible to transfer the file rapidly. How should you upload the file?",
            "answers": [
                { "text": "Enable parallel composite uploads using gsutil on the file transfer.", "isCorrect": true },
                { "text": "Use the GCP Console to transfer the file instead of gsutil.", "isCorrect": false },
                { "text": "Decrease the TCP window size on the machine initiating the transfer.", "isCorrect": false },
                { "text": "Change the storage class of the bucket from Nearline to Multi-Regional.", "isCorrect": false }

            ]
        },
        {
            "question": "You've deployed a microservice called myapp1 to a Google Kubernetes Engine cluster using the YAML file specified below.You need to refactor this configuration so that the database password is not stored in plain text. You want to follow Google-recommended practices. What should you do?SZA4/edit",
            "image": "./images/2.png",
            "answers": [
                { "text": "Store the database password inside a Secret object. Modify the YAML file to populate the DB_PASSWORD environment variable from the Secret.", "isCorrect": true },
                { "text": "Store the database password inside the Docker image of the container, not in the YAML file.", "isCorrect": false },
                { "text": "Store the database password inside a ConfigMap object. Modify the YAML file to populate the DB_PASSWORD environment variable from the ConfigMap.", "isCorrect": false },
                { "text": "Store the database password in a file inside a Kubernetes persistent volume, and use a persistent volume claim to mount the volume to the container.", "isCorrect": false }

            ]
        },
        {
            "question": "You are running an application on multiple virtual machines within a managed instance group and have auto scaling enabled. The autoscaling policy is configured so that additional instances are added to the group if the CPU utilization of instances goes above 80%. VMs are added until the instance group reaches its maximum limit of five VMs or until CPU utilization of instances lowers to 80%. The initial delay for HTTP health checks against the instances is set to 30 seconds. The virtual machine instances take around three minutes to become available for users. You observe that when the instance group autoscales, it adds more instances then necessary to support the levels of end-user traffic. You want to properly maintain instance group sizes when autoscaling. What should you do?",
            "answers": [
                { "text": "Increase the initial delay of the HTTP health check to 200 seconds.", "isCorrect": true },
                { "text": "Use a TCP health check instead of an HTTP health check.", "isCorrect": false },
                { "text": "Decrease the maximum number of instances to 3.", "isCorrect": false },
                { "text": "Set the maximum number of instances to 1.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to select and configure compute resources for a set of batch processing jobs. These jobs take around 2 hours to complete and are run nightly. You want to minimize service costs. What should you do?",
            "answers": [
                { "text": "Select Compute Engine. Use preemptible VM instances of the appropriate standard machine type.", "isCorrect": true },
                { "text": "Select Google Kubernetes Engine. Use a single-node cluster with a small instance type.", "isCorrect": false },
                { "text": "Select Google Kubernetes Engine. Use a three-node cluster with micro instance types.", "isCorrect": false },
                { "text": "Select Compute Engine. Use VM instance types that support micro bursting.", "isCorrect": false }

            ]
        },
        {
            "question": "You recently deployed a new version of an application to App Engine and then discovered a bug in the release. You need to immediately revert to the prior version of the application. What should you do?",
            "answers": [
                { "text": "On the App Engine Versions page of the GCP Console, route 100% of the traffic to the previous version.", "isCorrect": true },
                { "text": "Run gcloud app restore.", "isCorrect": false },
                { "text": "On the App Engine page of the GCP Console, select the application that needs to be reverted and click Revert.", "isCorrect": false },
                { "text": "Deploy the original version as a separate application. Then go to App Engine settings and split traffic between applications so that the original version serves 100% of the requests.", "isCorrect": false }

            ]
        },
        {
            "question": "You deployed an App Engine application using gcloud app deploy, but it did not deploy to the intended project. You want to find out why this happened and where the application deployed. What should you do?",
            "answers": [
                { "text": "Go to Cloud Shell and run gcloud config list to review the Google Cloud configuration used for deployment", "isCorrect": true },
                { "text": "Check the app.yaml file for your application and check project settings.", "isCorrect": false },
                { "text": "Check the web-application.xml file for your application and check project settings.", "isCorrect": false },
                { "text": "Go to Deployment Manager and review settings for deployment of applications.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to configure 10 Compute Engine instances for availability when maintenance occurs. Your requirements state that these instances should attempt to automatically restart if they crash. Also, the instances should be highly available including during system maintenance. What should you do?",
            "answers": [
                { "text": "Create an instance template for the instances. Set the 'Automatic Restart' to on. Set the 'On-host maintenance' to Migrate VM instance. Add the instance template to an instance group.", "isCorrect": true },
                { "text": "Create an instance template for the instances. Set 'Automatic Restart' to off. Set 'On-host maintenance' to Terminate VM instances. Add the instance template to an instance group.", "isCorrect": false },
                { "text": "Create an instance group for the instances. Set the 'Autohealing' health check to healthy (HTTP).", "isCorrect": false },
                { "text": "Create an instance group for the instance. Verify that the 'Advanced creation options' setting for 'do not retry machine creation' is set to off.", "isCorrect": false }

            ]
        },
        {
            "question": "You host a static website on Cloud Storage. Recently, you began to include links to PDF files on this site. Currently, when users click on the links to these PDF files, their browsers prompt them to save the file onto their local system. Instead, you want the clicked PDF files to be displayed within the browser window directly, without prompting the user to save the file locally. What should you do?",
            "answers": [
                { "text": "Set Content-Type metadata to application/pdf on the PDF file objects.", "isCorrect": true },
                { "text": "Enable 'Share publicly' on the PDF file objects.", "isCorrect": false },
                { "text": "Add a label to the storage bucket with a key of Content-Type and value of application/pdf.", "isCorrect": false },
                { "text": "Enable Cloud CDN on the website frontend.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a virtual machine that is currently configured with 2 vCPUs and 4 GB of memory. It is running out of memory. You want to upgrade the virtual machine to have 8 GB of memory. What should you do?",
            "answers": [
                { "text": "Stop the VM, increase the memory to 8 GB, and start the VM.", "isCorrect": true },
                { "text": "Stop the VM, change the machine type to n1-standard-8, and start the VM.", "isCorrect": false },
                { "text": "Use gcloud to add metadata to the VM. Set the key to required-memory-size and the value to 8 GB.", "isCorrect": false },
                { "text": "Rely on live migration to move the workload to a machine with more memory.", "isCorrect": false }

            ]
        },
        {
            "question": "You have production and test workloads that you want to deploy on Compute Engine. Production VMs need to be in a different subnet than the test VMs. All the VMs must be able to reach each other over Internal IP without creating additional routes. You need to set up VPC and the 2 subnets. Which configuration meets these requirements?",
            "answers": [
                { "text": "Create a single custom VPC with 2 subnets. Create each subnet in a different region and with a different CIDR range.", "isCorrect": true },
                { "text": "Create a single custom VPC with 2 subnets. Create each subnet in the same region and with the same CIDR range.", "isCorrect": false },
                { "text": "Create 2 custom VPCs, each with a single subnet. Create each subnet in a different region and with a different CIDR range.", "isCorrect": false },
                { "text": "Create 2 custom VPCs, each with a single subnet. Create each subnet in the same region and with the same CIDR range.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to create an autoscaling managed instance group for an HTTPS web application. You want to make sure that unhealthy VMs are recreated. What should you do?",
            "answers": [
                { "text": "Create a health check on port 443 and use that when creating the Managed Instance Group.", "isCorrect": true },
                { "text": "Select Multi-Zone instead of Single-Zone when creating the Managed Instance Group.", "isCorrect": false },
                { "text": "In the Instance Template, add the label 'health-check'.", "isCorrect": false },
                { "text": "In the Instance Template, add a startup script that sends a heartbeat to the metadata server.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has a Google Cloud Platform project that uses BigQuery for data warehousing. Your data science team changes frequently and has few members. You need to allow members of this team to perform queries. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "1. Create a dedicated Google group in Cloud Identity. 2. Add each data scientist's user account to the group. 3. Assign the BigQuery jobUser role to the group.", "isCorrect": true },
                { "text": "1. Create an IAM entry for each data scientist's user account. 2. Assign the BigQuery jobUser role to the group.", "isCorrect": false },
                { "text": "1. Create an IAM entry for each data scientist's user account. 2. Assign the BigQuery dataViewer user role to the group.", "isCorrect": false },
                { "text": "1. Create a dedicated Google group in Cloud Identity. 2. Add each data scientist's user account to the group. 3. Assign the BigQuery dataViewer user role to the group.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has a 3-tier solution running on Compute Engine. The configuration of the current infrastructure is shown below. Each tier has a service account that is associated with all instances within it. You need to enable communication on TCP port 8080 between tiers as follows:\n* Instances in tier #1 must communicate with tier #2.\n* Instances in tier #2 must communicate with tier #3.\nWhat should you do?",
            "image": "./images/3.png",
            "answers": [
                { "text": "1. Create an ingress firewall rule with the following settings: ג€¢ Targets: all instances with tier #2 service account ג€¢ Source filter: all instances with tier #1 service account ג€¢ Protocols: allow TCP:8080 2. Create an ingress firewall rule with the following settings: ג€¢ Targets: all instances with tier #3 service account ג€¢ Source filter: all instances with tier #2 service account ג€¢ Protocols: allow TCP: 8080", "isCorrect": true },
                { "text": "1. Create an ingress firewall rule with the following settings: ג€¢ Targets: all instances with tier #2 service account ג€¢ Source filter: all instances with tier #1 service account ג€¢ Protocols: allow all 2. Create an ingress firewall rule with the following settings: ג€¢ Targets: all instances with tier #3 service account ג€¢ Source filter: all instances with tier #2 service account ג€¢ Protocols: allow all", "isCorrect": false },
                { "text": "1. Create an egress firewall rule with the following settings: ג€¢ Targets: all instances ג€¢ Source filter: IP ranges (with the range set to 10.0.2.0/24) ג€¢ Protocols: allow TCP: 8080 2. Create an egress firewall rule with the following settings: ג€¢ Targets: all instances ג€¢ Source filter: IP ranges (with the range set to 10.0.1.0/24) ג€¢ Protocols: allow TCP: 8080", "isCorrect": false },
                { "text": "1. Create an ingress firewall rule with the following settings: ג€¢ Targets: all instances ג€¢ Source filter: IP ranges (with the range set to 10.0.2.0/24) ג€¢ Protocols: allow all 2. Create an ingress firewall rule with the following settings: ג€¢ Targets: all instances ג€¢ Source filter: IP ranges (with the range set to 10.0.1.0/24) ג€¢ Protocols: allow all", "isCorrect": false }

            ]
        },
        {
            "question": "You are given a project with a single Virtual Private Cloud (VPC) and a single subnetwork in the us-central1 region. There is a Compute Engine instance hosting an application in this subnetwork. You need to deploy a new instance in the same project in the europe-west1 region. This new instance needs access to the application. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "1. Create a subnetwork in the same VPC, in europe-west1. 2. Create the new instance in the new subnetwork and use the first instance's private address as the endpoint.", "isCorrect": true },
                { "text": "1. Create a VPC and a subnetwork in europe-west1. 2. Expose the application with an internal load balancer. 3. Create the new instance in the new subnetwork and use the load balancer's address as the endpoint.", "isCorrect": false },
                { "text": "1. Create a subnetwork in the same VPC, in europe-west1. 2. Use Cloud VPN to connect the two subnetworks. 3. Create the new instance in the new subnetwork and use the first instance's private address as the endpoint.", "isCorrect": false },
                { "text": "1. Create a VPC and a subnetwork in europe-west1. 2. Peer the 2 VPCs. 3. Create the new instance in the new subnetwork and use the first instance's private address as the endpoint.", "isCorrect": false }

            ]
        },
        {
            "question": "Your projects incurred more costs than you expected last month. Your research reveals that a development GKE container emitted a huge number of logs, which resulted in higher costs. You want to disable the logs quickly using the minimum number of steps. What should you do?",
            "answers": [
                { "text": "1. Go to the Logs ingestion window in Stackdriver Logging, and disable the log source for the GKE container resource.", "isCorrect": true },
                { "text": "1. Go to the Logs ingestion window in Stackdriver Logging, and disable the log source for the GKE Cluster Operations resource.", "isCorrect": false },
                { "text": "1. Go to the GKE console, and delete existing clusters. 2. Recreate a new cluster. 3. Clear the option to enable legacy Stackdriver Logging.", "isCorrect": false },
                { "text": "1. Go to the GKE console, and delete existing clusters. 2. Recreate a new cluster. 3. Clear the option to enable legacy Stackdriver Monitoring.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a website hosted on App Engine standard environment. You want 1% of your users to see a new test version of the website. You want to minimize complexity. What should you do?",
            "answers": [
                { "text": "Deploy the new version in the same application and use the --splits option to give a weight of 99 to the current version and a weight of 1 to the new version.", "isCorrect": true },
                { "text": "Deploy the new version in the same application and use the --migrate option.", "isCorrect": false },
                { "text": "Create a new App Engine application in the same project. Deploy the new version in that application. Use the App Engine library to proxy 1% of the requests to the new version.", "isCorrect": false },
                { "text": "Create a new App Engine application in the same project. Deploy the new version in that application. Configure your network load balancer to send 1% of the traffic to that new application.", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "You have a web application deployed as a managed instance group. You have a new version of the application to gradually deploy. Your web application is currently receiving live web traffic. You want to ensure that the available capacity does not decrease during the deployment. What should you do?",
            "answers": [
                { "text": "Perform a rolling-action start-update with maxSurge set to 1 and maxUnavailable set to 0.", "isCorrect": true },
                { "text": "Perform a rolling-action start-update with maxSurge set to 0 and maxUnavailable set to 1.", "isCorrect": false },
                { "text": "Create a new managed instance group with an updated instance template. Add the group to the backend service for the load balancer. When all instances in the new managed instance group are healthy, delete the old managed instance group.", "isCorrect": false },
                { "text": "Create a new instance template with the new application version. Update the existing managed instance group with the new instance template. Delete the instances in the managed instance group to allow the managed instance group to recreate the instance using the new instance template.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building an application that stores relational data from users. Users across the globe will use this application. Your CTO is concerned about the scaling requirements because the size of the user base is unknown. You need to implement a database solution that can scale with your user growth with minimum configuration changes. Which storage solution should you use?",
            "answers": [
                { "text": "Cloud Spanner", "isCorrect": true },
                { "text": "Cloud SQL", "isCorrect": false },
                { "text": "Cloud Firestore", "isCorrect": false },
                { "text": "Cloud Datastore", "isCorrect": false }

            ]
        },
        {
            "question": "You are the organization and billing administrator for your company. The engineering team has the Project Creator role on the organization. You do not want the engineering team to be able to link projects to the billing account. Only the finance team should be able to link a project to a billing account, but they should not be able to make any other changes to projects. What should you do?",
            "answers": [
                { "text": "Assign the finance team the Billing Account User role on the billing account and the Project Billing Manager role on the organization.", "isCorrect": true },
                { "text": "Assign the finance team only the Billing Account User role on the billing account.", "isCorrect": true },
                { "text": "Assign the engineering team only the Billing Account User role on the billing account.", "isCorrect": false },
                { "text": "Assign the engineering team the Billing Account User role on the billing account and the Project Billing Manager role on the organization.", "isCorrect": false }

            ]
        },
        {
            "question": "You have an application running in Google Kubernetes Engine (GKE) with cluster auto scaling enabled. The application exposes a TCP endpoint. There are several replicas of this application. You have a Compute Engine instance in the same region, but in another Virtual Private Cloud (VPC), called gce-network, that has no overlapping IP ranges with the first VPC. This instance needs to connect to the application on GKE. You want to minimize effort. What should you do?",
            "answers": [
                { "text": "1. In GKE, create a Service of type LoadBalancer that uses the application's Pods as backend. 2. Add an annotation to this service: cloud.google.com/load-balancer-type: Internal 3. Peer the two VPCs together. 4. Configure the Compute Engine instance to use the address of the load balancer that has been created.", "isCorrect": true },
                { "text": "1. In GKE, create a Service of type LoadBalancer that uses the application's Pods as backend. 2. Set the service's externalTrafficPolicy to Cluster. 3. Configure the Compute Engine instance to use the address of the load balancer that has been created.", "isCorrect": false },
                { "text": "1. In GKE, create a Service of type NodePort that uses the application's Pods as backend. 2. Create a Compute Engine instance called proxy with 2 network interfaces, one in each VPC. 3. Use iptables on this instance to forward traffic from gce-network to the GKE nodes. 4. Configure the Compute Engine instance to use the address of proxy in gce-network as endpoint.", "isCorrect": false },
                { "text": "1. In GKE, create a Service of type LoadBalancer that uses the application's Pods as backend. 2. Add a Cloud Armor Security Policy to the load balancer that whitelists the internal IPs of the MIG's instances. 3. Configure the Compute Engine instance to use the address of the load balancer that has been created.", "isCorrect": false }

            ]
        },
        {
            "question": "Your organization is a financial company that needs to store audit log files for 3 years. Your organization has hundreds of Google Cloud projects. You need to implement a cost-effective approach for log file retention. What should you do?",
            "answers": [
                { "text": "Create an export to the sink that saves logs from Cloud Audit to a Coldline Storage bucket.", "isCorrect": true },
                { "text": "Create an export to the sink that saves logs from Cloud Audit to BigQuery.", "isCorrect": false },
                { "text": "Write a custom script that uses logging API to copy the logs from Stackdriver logs to BigQuery.", "isCorrect": false },
                { "text": "Export these logs to Cloud Pub/Sub and write a Cloud Dataflow pipeline to store logs to Cloud SQL.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to run a single caching HTTP reverse proxy on GCP for a latency-sensitive website. This specific reverse proxy consumes almost no CPU. You want to have a 30-GB in-memory cache, and need an additional 2 GB of memory for the rest of the processes. You want to minimize cost. How should you run this reverse proxy?",
            "answers": [
                { "text": "Create a Cloud Memorystore for Redis instance with 32-GB capacity.", "isCorrect": true },
                { "text": "Run it on Compute Engine, and choose a custom instance type with 6 vCPUs and 32 GB of memory.", "isCorrect": false },
                { "text": "Package it in a container image, and run it on Kubernetes Engine, using n1-standard-32 instances as nodes.", "isCorrect": false },
                { "text": "Run it on Compute Engine, choose the instance type n1-standard-1, and add an SSD persistent disk of 32 GB.", "isCorrect": false }

            ]
        },
        {
            "question": "You are hosting an application on bare-metal servers in your own data center. The application needs access to Cloud Storage. However, security policies prevent the servers hosting the application from having public IP addresses or access to the internet. You want to follow Google-recommended practices to provide the application with access to Cloud Storage. What should you do?",
            "answers": [
                { "text": "1. Using Cloud VPN or Interconnect, create a tunnel to a VPC in Google Cloud. 2. Use Cloud Router to create a custom route advertisement for 199.36.153.4/30. Announce that network to your on-premises network through the VPN tunnel. 3. In your on-premises network, configure your DNS server to resolve *.googleapis.com as a CNAME to restricted.googleapis.com.", "isCorrect": true },
                { "text": "1. Use nslookup to get the IP address for storage.googleapis.com. 2. Negotiate with the security team to be able to give a public IP address to the servers. 3. Only allow egress traffic from those servers to the IP addresses for storage.googleapis.com.", "isCorrect": false },
                { "text": "1. Using Cloud VPN, create a VPN tunnel to a Virtual Private Cloud (VPC) in Google Cloud. 2. In this VPC, create a Compute Engine instance and install the Squid proxy server on this instance. 3. Configure your servers to use that instance as a proxy to access Cloud Storage.", "isCorrect": false },
                { "text": "1. Use Migrate for Compute Engine (formerly known as Velostrata) to migrate those servers to Compute Engine. 2. Create an internal load balancer (ILB) that uses storage.googleapis.com as backend. 3. Configure your new instances to use this ILB as proxy.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to deploy an application on Cloud Run that processes messages from a Cloud Pub/Sub topic. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "1. Create a service account. 2. Give the Cloud Run Invoker role to that service account for your Cloud Run application. 3. Create a Cloud Pub/Sub subscription that uses that service account and uses your Cloud Run application as the push endpoint.", "isCorrect": true },
                { "text": "1. Create a Cloud Function that uses a Cloud Pub/Sub trigger on that topic. 2. Call your application on Cloud Run from the Cloud Function for every message.", "isCorrect": false },
                { "text": "1. Grant the Pub/Sub Subscriber role to the service account used by Cloud Run. 2. Create a Cloud Pub/Sub subscription for that topic. 3. Make your application pull messages from that subscription.", "isCorrect": false },
                { "text": "1. Deploy your application on Cloud Run on GKE with the connectivity set to Internal. 2. Create a Cloud Pub/Sub subscription for that topic. 3. In the same Google Kubernetes Engine cluster as your application, deploy a container that takes the messages and sends them to your application.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to deploy an application, which is packaged in a container image, in a new project. The application exposes an HTTP endpoint and receives very few requests per day. You want to minimize costs. What should you do?",
            "answers": [
                { "text": "Deploy the container on Cloud Run.", "isCorrect": true },
                { "text": "Deploy the container on Cloud Run on GKE.", "isCorrect": false },
                { "text": "Deploy the container on App Engine Flexible.", "isCorrect": false },
                { "text": "Deploy the container on GKE with cluster autoscaling and horizontal pod autoscaling enabled.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has an existing GCP organization with hundreds of projects and a billing account. Your company recently acquired another company that also has hundreds of projects and its own billing account. You would like to consolidate all GCP costs of both GCP organizations onto a single invoice. You would like to consolidate all costs as of tomorrow. What should you do?",
            "answers": [
                { "text": "Link the acquired company's projects to your company's billing account.", "isCorrect": true },
                { "text": "Configure the acquired company's billing account and your company's billing account to export the billing data into the same BigQuery dataset.", "isCorrect": false },
                { "text": "Migrate the acquired company's projects into your company's GCP organization. Link the migrated projects to your company's billing account.", "isCorrect": false },
                { "text": "Create a new GCP organization and a new billing account. Migrate the acquired company's projects and your company's projects into the new GCP organization and link the projects to the new billing account.", "isCorrect": false }

            ]
        },
        {
            "question": "You built an application on Google Cloud that uses Cloud Spanner. Your support team needs to monitor the environment but should not have access to table data. You need a streamlined solution to grant the correct permissions to your support team, and you want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Add the support team group to the roles/monitoring.viewer role.", "isCorrect": true },
                { "text": "Add the support team group to the roles/spanner.databaseUser role.", "isCorrect": false },
                { "text": "Add the support team group to the roles/spanner.databaseReader role.", "isCorrect": false },
                { "text": "Add the support team group to the roles/stackdriver.accounts.viewer role.", "isCorrect": false }

            ]
        },
        {
            "question": "For analysis purposes, you need to send all the logs from all of your Compute Engine instances to a BigQuery dataset called platform-logs. You have already installed the Cloud Logging agent on all the instances. You want to minimize cost. What should you do?",
            "answers": [
                { "text": "1. In Cloud Logging, create a filter to view only Compute Engine logs. 2. Click Create Export. 3. Choose BigQuery as Sink Service, and the platform-logs dataset as Sink Destination.", "isCorrect": true },
                { "text": "1. Give the BigQuery Data Editor role on the platform-logs dataset to the service accounts used by your instances. 2. Update your instances' metadata to add the following value: logs-destination: bq://platform-logs.", "isCorrect": false },
                { "text": "1. In Cloud Logging, create a logs export with a Cloud Pub/Sub topic called logs as a sink. 2. Create a Cloud Function that is triggered by messages in the logs topic. 3. Configure that Cloud Function to drop logs that are not from Compute Engine and to insert Compute Engine logs in the platform-logs dataset", "isCorrect": false },
                { "text": "1. Create a Cloud Function that has the BigQuery User role on the platform-logs dataset. 2. Configure this Cloud Function to create a BigQuery Job that executes this query: INSERT INTO dataset.platform-logs (timestamp, log) SELECT timestamp, log FROM compute.logs WHERE timestamp > DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) 3. Use Cloud Scheduler to trigger this Cloud Function once a day.", "isCorrect": false }

            ]
        },
        {
            "question": "You are using Deployment Manager to create a Google Kubernetes Engine cluster. Using the same Deployment Manager deployment, you also want to create a DaemonSet in the kube-system namespace of the cluster. You want a solution that uses the fewest possible services. What should you do?",
            "answers": [
                { "text": "Add the cluster's API as a new Type Provider in Deployment Manager, and use the new type to create the DaemonSet.", "isCorrect": true },
                { "text": "Use the Deployment Manager Runtime Configurator to create a new Config resource that contains the DaemonSet definition", "isCorrect": false },
                { "text": "With Deployment Manager, create a Compute Engine instance with a startup script that uses kubectl to create the DaemonSet.", "isCorrect": false },
                { "text": "In the cluster's definition in Deployment Manager, add a metadata that has kube-system as key and the DaemonSet manifest as value.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building an application that will run in your data center. The application will use Google Cloud Platform (GCP) services like AutoML. You created a service account that has appropriate access to AutoML. You need to enable authentication to the APIs from your on-premises environment. What should you do?",
            "answers": [
                { "text": "Use gcloud to create a key file for the service account that has appropriate permissions.", "isCorrect": true },
                { "text": "Use service account credentials in your on-premises application.", "isCorrect": false },
                { "text": "Set up direct interconnect between your data center and Google Cloud Platform to enable authentication for your on-premises applications.", "isCorrect": false },
                { "text": "Go to the IAM & admin console, grant a user account permissions similar to the service account permissions, and use this user account for authentication from your data center.", "isCorrect": false }

            ]
        },
        {
            "question": "You are using Container Registry to centrally store your company's container images in a separate project. In another project, you want to create a Google Kubernetes Engine (GKE) cluster. You want to ensure that Kubernetes can download images from the Container Registry. What should you do?",
            "answers": [
                { "text": "In the project where the images are stored, grant the Storage Object Viewer IAM role to the service account used by the Kubernetes nodes.", "isCorrect": true },
                { "text": "When you create the GKE cluster, choose the Allow full access to all Cloud APIs option under 'Access scopes'.", "isCorrect": false },
                { "text": "Create a service account, and give it access to Cloud Storage. Create a P12 key for this service account and use it as an imagePullSecrets in Kubernetes.", "isCorrect": false },
                { "text": "Configure the ACLs on each image in Cloud Storage to give read-only access to the default Compute Engine service account.", "isCorrect": false }

            ]
        },
        {
            "question": "You deployed a new application inside your Google Kubernetes Engine cluster using the YAML file specified below.",
            "image": "./images/4.png",
            "answers": [
                { "text": "Review details of myapp-deployment-58ddbbb995-lp86m Pod and check for warning messages.", "isCorrect": true },
                { "text": "Review details of the myapp-service Service object and check for error messages.", "isCorrect": false },
                { "text": "Review details of the myapp-deployment Deployment object and check for error messages.", "isCorrect": false },
                { "text": "View logs of the container in myapp-deployment-58ddbbb995-lp86m pod and check for warning messages.", "isCorrect": false }

            ]
        },
        {
            "question": "You are setting up a Windows VM on Compute Engine and want to make sure you can log in to the VM via RDP. What should you do?",
            "answers": [
                { "text": "After the VM has been created, use gcloud compute reset-windows-password to retrieve the login credentials for the VM.", "isCorrect": true },
                { "text": "After the VM has been created, use your Google Account credentials to log in into the VM.", "isCorrect": false },
                { "text": "When creating the VM, add metadata to the instance using 'windows-password' as the key and a password as the value.", "isCorrect": false },
                { "text": "After the VM has been created, download the JSON private key for the default Compute Engine service account. Use the credentials in the JSON file to log in to the VM.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to configure an SSH connection to a single Compute Engine instance for users in the dev1 group. This instance is the only resource in this particular Google Cloud Platform project that the dev1 users should be able to connect to. What should you do?",
            "answers": [
                { "text": "Set metadata to enable-oslogin=true for the instance. Grant the dev1 group the compute.osLogin role. Direct them to use the Cloud Shell to ssh to that instance.", "isCorrect": true },
                { "text": "Set metadata to enable-oslogin=true for the instance. Set the service account to no service account for that instance. Direct them to use the Cloud Shell to ssh to that instance.", "isCorrect": false },
                { "text": "Enable block project wide keys for the instance. Generate an SSH key for each user in the dev1 group. Distribute the keys to dev1 users and direct them to use their third-party tools to connect.", "isCorrect": false },
                { "text": "Enable block project wide keys for the instance. Generate an SSH key and associate the key with that instance. Distribute the key to dev1 users and direct them to use their third-party tools to connect.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to produce a list of the enabled Google Cloud Platform APIs for a GCP project using the gcloud command line in the Cloud Shell. The project name is my-project. What should you do?",
            "answers": [
                { "text": "Run gcloud projects list to get the project ID, and then run gcloud services list --project <project ID>.", "isCorrect": true },
                { "text": "Run gcloud init to set the current project to my-project, and then run gcloud services list --available.", "isCorrect": false },
                { "text": "Run gcloud info to view the account value, and then run gcloud services list --account <Account>.", "isCorrect": false },
                { "text": "Run gcloud projects describe <project ID> to verify the project value, and then run gcloud services list --available.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building a new version of an application hosted in an App Engine environment. You want to test the new version with 1% of users before you completely switch your application over to the new version. What should you do?",
            "answers": [
                { "text": "Deploy a new version of your application in App Engine. Then go to App Engine settings in GCP Console and split traffic between the current version and newly deployed versions accordingly.", "isCorrect": true },
                { "text": "Deploy a new version of your application in Google Kubernetes Engine instead of App Engine and then use GCP Console to split traffic.", "isCorrect": false },
                { "text": "Deploy a new version of your application in a Compute Engine instance instead of App Engine and then use GCP Console to split traffic.", "isCorrect": false },
                { "text": "Deploy a new version as a separate app in App Engine. Then configure App Engine using GCP Console to split traffic between the two apps.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to provide a cost estimate for a Kubernetes cluster using the GCP pricing calculator for Kubernetes. Your workload requires high IOPs, and you will also be using disk snapshots. You start by entering the number of nodes, average hours, and average days. What should you do next?",
            "answers": [
                { "text": "Fill in local SSD. Fill in persistent disk storage and snapshot storage.", "isCorrect": true },
                { "text": "Fill in local SSD. Add estimated cost for cluster management.", "isCorrect": false },
                { "text": "Select Add GPUs. Fill in persistent disk storage and snapshot storage.", "isCorrect": false },
                { "text": "Select Add GPUs. Add estimated cost for cluster management.", "isCorrect": false }

            ]
        },
        {
            "question": "You are using Google Kubernetes Engine with autoscaling enabled to host a new application. You want to expose this new application to the public, using HTTPS on a public IP address. What should you do?",
            "answers": [
                { "text": "Create a Kubernetes Service of type NodePort for your application, and a Kubernetes Ingress to expose this Service via a Cloud Load Balancer.", "isCorrect": true },
                { "text": "Create a Kubernetes Service of type ClusterIP for your application. Configure the public DNS name of your application using the IP of this Service.", "isCorrect": false },
                { "text": "Create a Kubernetes Service of type NodePort to expose the application on port 443 of each node of the Kubernetes cluster. Configure the public DNS name of your application with the IP of every node of the cluster to achieve load-balancing.", "isCorrect": false },
                { "text": "Create a HAProxy pod in the cluster to load-balance the traffic to all the pods of the application. Forward the public traffic to HAProxy with an iptable rule. Configure the DNS name of your application using the public IP of the node HAProxy is running on", "isCorrect": false }

            ]
        },
        {
            "question": "You need to enable traffic between multiple groups of Compute Engine instances that are currently running two different GCP projects. Each group of Compute Engine instances are running in its own VPC. What should you do?",
            "answers": [
                { "text": "Verify that both projects are in a GCP Organization. Share the VPC from one project and request that the Compute Engine instances in the other project use this shared VPC.", "isCorrect": true },
                { "text": "Verify that both projects are in a GCP Organization. Create a new VPC and add all instances.", "isCorrect": false },
                { "text": "Verify that you are the Project Administrator of both projects. Create two new VPCs and add all instances.", "isCorrect": false },
                { "text": "Verify that you are the Project Administrator of both projects. Create a new VPC and add all instances.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to add a new auditor to a Google Cloud Platform project. The auditor should be allowed to read, but not modify, all project items. How should you configure the auditor's permissions?",
            "answers": [
                { "text": "Select the built-in IAM project Viewer role. Add the user's account to this role.", "isCorrect": true },
                { "text": "Create a custom role with view-only project permissions. Add the user's account to the custom role.", "isCorrect": false },
                { "text": "Create a custom role with view-only service permissions. Add the user's account to the custom role.", "isCorrect": false },
                { "text": "Select the built-in IAM service Viewer role. Add the user's account to this role.", "isCorrect": false }

            ]
        },
        {
            "question": "You are operating a Google Kubernetes Engine (GKE) cluster for your company where different teams can run non-production workloads. Your Machine Learning (ML) team needs access to Nvidia Tesla P100 GPUs to train their models. You want to minimize effort and cost. What should you do?",
            "answers": [
                { "text": "Add a new, GPU-enabled, node pool to the GKE cluster. Ask your ML team to add the cloud.google.com/gke -accelerator: nvidia-tesla-p100 nodeSelector to their pod specification.", "isCorrect": true },
                { "text": "Ask your ML team to add the ג€accelerator: gpuג€ annotation to their pod specification.", "isCorrect": false },
                { "text": "Recreate all the nodes of the GKE cluster to enable GPUs on all of them.", "isCorrect": false },
                { "text": "Create your own Kubernetes cluster on top of Compute Engine with nodes that have GPUs. Dedicate this cluster to your ML team.", "isCorrect": false }

            ]
        },
        {
            "question": "Your VMs are running in a subnet that has a subnet mask of 255.255.255.240. The current subnet has no more free IP addresses and you require an additional 10 IP addresses for new VMs. The existing and new VMs should all be able to reach each other without additional routes. What should you do?",
            "answers": [
                { "text": "Use gcloud to expand the IP range of the current subnet.", "isCorrect": true },
                { "text": "Delete the subnet, and recreate it using a wider range of IP addresses.", "isCorrect": false },
                { "text": "Create a new project. Use Shared VPC to share the current network with the new project.", "isCorrect": false },
                { "text": "Create a new subnet with the same starting IP but a wider range to overwrite the current subnet.", "isCorrect": false }

            ]
        },
        {
            "question": "Your organization uses G Suite for communication and collaboration. All users in your organization have a G Suite account. You want to grant some G Suite users access to your Cloud Platform project. What should you do?",
            "answers": [
                { "text": "Grant them the required IAM roles using their G Suite email address.", "isCorrect": true },
                { "text": "Enable Cloud Identity in the GCP Console for your domain.", "isCorrect": false },
                { "text": "Create a CSV sheet with all users' email addresses. Use the gcloud command line tool to convert them into Google Cloud Platform accounts.", "isCorrect": false },
                { "text": "In the G Suite console, add the users to a special group called cloud-console-users@yourdomain.com. Rely on the default behavior of the Cloud Platform to grant users access if they are members of this group.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a Google Cloud Platform account with access to both production and development projects. You need to create an automated process to list all compute instances in development and production projects on a daily basis. What should you do?",
            "answers": [
                { "text": "Create two configurations using gcloud config. Write a script that sets configurations as active, individually. For each configuration, use gcloud compute instances list to get a list of compute resources.", "isCorrect": true },
                { "text": "Create two configurations using gsutil config. Write a script that sets configurations as active, individually. For each configuration, use gsutil compute instances list to get a list of compute resources.", "isCorrect": false },
                { "text": "Go to Cloud Shell and export this information to Cloud Storage on a daily basis.", "isCorrect": false },
                { "text": "Go to GCP Console and export this information to Cloud SQL on a daily basis.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a large 5-TB AVRO file stored in a Cloud Storage bucket. Your analysts are proficient only in SQL and need access to the data stored in this file. You want to find a cost-effective way to complete their request as soon as possible. What should you do?",
            "answers": [
                { "text": "Create external tables in BigQuery that point to Cloud Storage buckets and run a SQL query on these external tables to complete your request.", "isCorrect": true },
                { "text": "Load data in Cloud Datastore and run a SQL query against it.", "isCorrect": false },
                { "text": "Create a BigQuery table and load data in BigQuery. Run a SQL query on this table and drop this table after you complete your request.", "isCorrect": false },
                { "text": "Create a Hadoop cluster and copy the AVRO file to NDFS by compressing it. Load the file in a hive table and provide access to your analysts so that they can run SQL queries.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to verify that a Google Cloud Platform service account was created at a particular time. What should you do?",
            "answers": [
                { "text": "Filter the Activity log to view the Configuration category. Filter the Resource type to Service Account.", "isCorrect": true },
                { "text": "Filter the Activity log to view the Configuration category. Filter the Resource type to Google Project.", "isCorrect": false },
                { "text": "Filter the Activity log to view the Data Access category. Filter the Resource type to Service Account.", "isCorrect": false },
                { "text": "Filter the Activity log to view the Data Access category. Filter the Resource type to Google Project.", "isCorrect": false }

            ]
        },
        {
            "question": "You deployed an LDAP server on Compute Engine that is reachable via TLS through port 636 using UDP. You want to make sure it is reachable by clients over that port. What should you do?",
            "answers": [
                { "text": "Add a network tag of your choice to the instance. Create a firewall rule to allow ingress on UDP port 636 for that network tag.", "isCorrect": true },
                { "text": "Add the network tag allow-udp-636 to the VM instance running the LDAP server.", "isCorrect": false },
                { "text": "Create a route called allow-udp-636 and set the next hop to be the VM instance running the LDAP server.", "isCorrect": false },
                { "text": "Add a network tag of your choice to the instance running the LDAP server. Create a firewall rule to allow egress on UDP port 636 for that network tag.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to set a budget alert for use of Compute Engineer services on one of the three Google Cloud Platform projects that you manage. All three projects are linked to a single billing account. What should you do?",
            "answers": [
                { "text": "Verify that you are the project billing administrator. Select the associated billing account and create a budget and alert for the appropriate project.", "isCorrect": true },
                { "text": "Verify that you are the project billing administrator. Select the associated billing account and create a budget and a custom alert.", "isCorrect": false },
                { "text": "Verify that you are the project administrator. Select the associated billing account and create a budget for the appropriate project.", "isCorrect": false },
                { "text": "Verify that you are project administrator. Select the associated billing account and create a budget and a custom alert.", "isCorrect": false }

            ]
        },
        {
            "question": "You are migrating a production-critical on-premises application that requires 96 vCPUs to perform its task. You want to make sure the application runs in a similar environment on GCP. What should you do?",
            "answers": [
                { "text": "When creating the VM, use machine type n1-standard-96.", "isCorrect": true },
                { "text": "When creating the VM, use Intel Skylake as the CPU platform.", "isCorrect": false },
                { "text": "Create the VM using Compute Engine default settings. Use gcloud to modify the running instance to have 96 vCPUs.", "isCorrect": false },
                { "text": "Start the VM using Compute Engine default settings, and adjust as you go based on Rightsizing Recommendations.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to configure a solution for archiving data in a Cloud Storage bucket. The solution must be cost-effective. Data with multiple versions should be archived after 30 days. Previous versions are accessed once a month for reporting. This archive data is also occasionally updated at month-end. What should you do?",
            "answers": [
                { "text": "Add a bucket lifecycle rule that archives data with newer versions after 30 days to Nearline Storage.", "isCorrect": true },
                { "text": "Add a bucket lifecycle rule that archives data with newer versions after 30 days to Coldline Storage.", "isCorrect": false },
                { "text": "Add a bucket lifecycle rule that archives data from regional storage after 30 days to Coldline Storage.", "isCorrect": false },
                { "text": "Add a bucket lifecycle rule that archives data from regional storage after 30 days to Nearline Storage.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company's infrastructure is on-premises, but all machines are running at maximum capacity. You want to burst to Google Cloud. The workloads on Google Cloud must be able to directly communicate to the workloads on-premises using a private IP range. What should you do?",
            "answers": [
                { "text": "Set up Cloud VPN between the infrastructure on-premises and Google Cloud.", "isCorrect": true },
                { "text": "In Google Cloud, configure the VPC as a host for Shared VPC.", "isCorrect": false },
                { "text": "In Google Cloud, configure the VPC for VPC Network Peering.", "isCorrect": false },
                { "text": "Create bastion hosts both in your on-premises environment and on Google Cloud. Configure both as proxy servers using their public IP addresses.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to select and configure a solution for storing and archiving data on Google Cloud Platform. You need to support compliance objectives for data from one geographic location. This data is archived after 30 days and needs to be accessed annually. What should you do?",
            "answers": [
                { "text": "Select Regional Storage. Add a bucket lifecycle rule that archives data after 30 days to Coldline Storage.", "isCorrect": true },
                { "text": "Select Multi-Regional Storage. Add a bucket lifecycle rule that archives data after 30 days to Coldline Storage.", "isCorrect": false },
                { "text": "Select Multi-Regional Storage. Add a bucket lifecycle rule that archives data after 30 days to Nearline Storage.", "isCorrect": false },
                { "text": "Select Regional Storage. Add a bucket lifecycle rule that archives data after 30 days to Nearline Storage.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company uses BigQuery for data warehousing. Over time, many different business units in your company have created 1000+ datasets across hundreds of projects. Your CIO wants you to examine all datasets to find tables that contain an employee_ssn column. You want to minimize effort in performing this task. What should you do?",
            "answers": [
                { "text": "Go to Data Catalog and search for employee_ssn in the search box.", "isCorrect": true },
                { "text": "Write a shell script that uses the bq command line tool to loop through all the projects in your organization.", "isCorrect": false },
                { "text": "Write a script that loops through all the projects in your organization and runs a query on INFORMATION_SCHEMA.COLUMNS view to find the employee_ssn column.", "isCorrect": false },
                { "text": "Write a Cloud Dataflow job that loops through all the projects in your organization and runs a query on INFORMATION_SCHEMA.COLUMNS view to find employee_ssn column.", "isCorrect": false }

            ]
        },
        {
            "question": "You create a Deployment with 2 replicas in a Google Kubernetes Engine cluster that has a single preemptible node pool. After a few minutes, you use kubectl to examine the status of your Pod and observe that one of them is still in Pending status:",
            "images": "./images/5.png",
            "answers": [
                { "text": "Too many Pods are already running in the cluster, and there are not enough resources left to schedule the pending Pod.", "isCorrect": true },
                { "text": "The pending Pod's resource requests are too large to fit on a single node of the cluster.", "isCorrect": false },
                { "text": "The node pool is configured with a service account that does not have permission to pull the container image used by the pending Pod.", "isCorrect": false },
                { "text": "The pending Pod was originally scheduled on a node that has been preempted between the creation of the Deployment and your verification of the Pods' status. It is currently being rescheduled on a new node.", "isCorrect": false }

            ]
        },
        {
            "question": "You want to find out when users were added to Cloud Spanner Identity Access Management (IAM) roles on your Google Cloud Platform (GCP) project. What should you do in the GCP Console?",
            "answers": [
                { "text": "Go to the Stackdriver Logging console, review admin activity logs, and filter them for Cloud Spanner IAM roles.", "isCorrect": true },
                { "text": "Open the Cloud Spanner console to review configurations.", "isCorrect": false },
                { "text": "Open the IAM & admin console to review IAM policies for Cloud Spanner roles.", "isCorrect": false },
                { "text": "Go to the Stackdriver Monitoring console and review information for Cloud Spanner.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company implemented BigQuery as an enterprise data warehouse. Users from multiple business units run queries on this data warehouse. However, you notice that query costs for BigQuery are very high, and you need to control costs. Which two methods should you use? (Choose two.)",
            "answers": [
                { "text": "Apply a user- or project-level custom query quota for BigQuery data warehouse.", "isCorrect": true },
                { "text": "Change your BigQuery query model from on-demand to flat rate. Apply the appropriate number of slots to each Project", "isCorrect": true },
                { "text": "Split the users from business units to multiple projects.", "isCorrect": false },
                { "text": "Create separate copies of your BigQuery data warehouse for each business unit.", "isCorrect": false },
                { "text": "Split your BigQuery data warehouse into multiple data warehouses for each business unit.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building a product on top of Google Kubernetes Engine (GKE). You have a single GKE cluster. For each of your customers, a Pod is running in that cluster, and your customers can run arbitrary code inside their Pod. You want to maximize the isolation between your customers' Pods. What should you do?",
            "answers": [
                { "text": "Create a GKE node pool with a sandbox type configured to gvisor. Add the parameter runtimeClassName: gvisor to the specification of your customers' Pods.", "isCorrect": true },
                { "text": "Use Binary Authorization and whitelist only the container images used by your customers' Pods.", "isCorrect": false },
                { "text": "Use the Container Analysis API to detect vulnerabilities in the containers used by your customers' Pods.", "isCorrect": false },
                { "text": "Use the cos_containerd image for your GKE nodes. Add a nodeSelector with the value cloud.google.com/gke-os-distribution: cos_containerd to the specification of your customers' Pods.", "isCorrect": false }

            ]
        },
        {
            "question": "Your customer has implemented a solution that uses Cloud Spanner and notices some read latency-related performance issues on one table. This table is accessed only by their users using a primary key. The table schema is shown below.",
            "image": "./images/6.png",
            "answers": [
                { "text": "Change the primary key to not have monotonically increasing values.", "isCorrect": true },
                { "text": "Remove the profile_picture field from the table.", "isCorrect": false },
                { "text": "Add a secondary index on the person_id column.", "isCorrect": false },
                { "text": "Create a secondary index using the following Data Definition Language (DDL): CREATE INDEX person_id_ix\nON Persons(\n\tperson_id,\n\tfirst_name\n\tlast_name,\n) PERSON (\n\tprofile_picture\n)", "isCorrect": false }

            ]
        },
        {
            "question": "Your finance team wants to view the billing report for your projects. You want to make sure that the finance team does not get additional permissions to the project. What should you do?",
            "answers": [
                { "text": "Add the group for the finance team to roles/billing viewer role.", "isCorrect": true },
                { "text": "Add the group for the finance team to roles/billing user role.", "isCorrect": false },
                { "text": "Add the group for the finance team to roles/billing admin role.", "isCorrect": false },
                { "text": "Add the group for the finance team to roles/billing project/Manager role.", "isCorrect": false }

            ]
        },
        {
            "question": "Your organization has strict requirements to control access to Google Cloud projects. You need to enable your Site Reliability Engineers (SREs) to approve requests from the Google Cloud support team when an SRE opens a support case. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Add your SREs to a group and then add this group to roles/accessapproval.approver role.", "isCorrect": true },
                { "text": "Add your SREs to roles/iam.roleAdmin role.", "isCorrect": false },
                { "text": "Add your SREs to roles/accessapproval.approver role.", "isCorrect": false },
                { "text": "Add your SREs to a group and then add this group to roles/iam.roleAdmin.role.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to host an application on a Compute Engine instance in a project shared with other teams. You want to prevent the other teams from accidentally causing downtime on that application. Which feature should you use?",
            "answers": [
                { "text": "Use a sole-tenant node.", "isCorrect": true },
                { "text": "Enable deletion protection on the instance.", "isCorrect": false },
                { "text": "Use a Preemptible VM.", "isCorrect": false },
                { "text": "Use a Shielded VM.", "isCorrect": false }

            ]
        },
        ,
        {
            "question": "Your organization needs to grant users access to query datasets in BigQuery but prevent them from accidentally deleting the datasets. You want a solution that follows Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Create a custom role by removing delete permissions. Add users to the group, and then add the group to the custom role.", "isCorrect": true },
                { "text": "Create a custom role by removing delete permissions, and add users to that role only.", "isCorrect": false },
                { "text": "Add users to roles/bigquery dataEditor role only, instead of roles/bigquery dataOwner.", "isCorrect": false },
                { "text": "Add users to roles/bigquery user role only, instead of roles/bigquery dataOwner.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a developer laptop with the Cloud SDK installed on Ubuntu. The Cloud SDK was installed from the Google Cloud Ubuntu package repository. You want to test your application locally on your laptop with Cloud Datastore. What should you do?",
            "answers": [
                { "text": "Install the google-cloud-sdk-datastore-emulator component using the apt get install command.", "isCorrect": true },
                { "text": "Export Cloud Datastore data using gcloud datastore export.", "isCorrect": false },
                { "text": "Create a Cloud Datastore index using gcloud datastore indexes create.", "isCorrect": false },
                { "text": "Install the cloud-datastore-emulator component using the gcloud components install command.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company set up a complex organizational structure on Google Cloud. The structure includes hundreds of folders and projects. Only a few team members should be able to view the hierarchical structure. You need to assign minimum permissions to these team members, and you want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Add the users to a group, and add this group to roles/browser.", "isCorrect": true },
                { "text": "Add the users to a group, and add this group to roles/iam.roleViewer role.", "isCorrect": false },
                { "text": "Add the users to roles/iam.roleViewer role.", "isCorrect": false },
                { "text": "Add the users to roles/browser role.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has a single sign-on (SSO) identity provider that supports Security Assertion Markup Language (SAML) integration with service providers. Your company has users in Cloud Identity. You would like users to authenticate using your company's SSO provider. What should you do?",
            "answers": [
                { "text": "In Cloud Identity, set up SSO with a third-party identity provider with Google as a service provider.", "isCorrect": true },
                { "text": "In Cloud Identity, set up SSO with Google as an identity provider to access custom SAML apps.", "isCorrect": false },
                { "text": "Obtain OAuth 2.0 credentials, configure the user consent screen, and set up OAuth 2.0 for Mobile & Desktop Apps.", "isCorrect": false },
                { "text": "Obtain OAuth 2.0 credentials, configure the user consent screen, and set up OAuth 2.0 for Web Server Applications.", "isCorrect": false }

            ]
        },
        {
            "question": "Your organization has a dedicated person who creates and manages all service accounts for Google Cloud projects. You need to assign this person the minimum role for projects. What should you do?",
            "answers": [
                { "text": "Add the user to roles/iam.serviceAccountAdmin role.", "isCorrect": true },
                { "text": "Add the user to roles/iam.roleAdmin role.", "isCorrect": false },
                { "text": "Add the user to roles/iam.securityAdmin role.", "isCorrect": false },
                { "text": "Add the user to roles/iam.serviceAccountUser role.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building an archival solution for your data warehouse and have selected Cloud Storage to archive your data. Your users need to be able to access this archived data once a quarter for some regulatory requirements. You want to select a cost-efficient option. Which storage option should you use?",
            "answers": [
                { "text": "Cold Storage", "isCorrect": true },
                { "text": "Nearline Storage", "isCorrect": false },
                { "text": "Regional Storage", "isCorrect": false },
                { "text": "Multi-Regional Storage", "isCorrect": false }

            ]
        },
        {
            "question": "A team of data scientists infrequently needs to use a Google Kubernetes Engine (GKE) cluster that you manage. They require GPUs for some long-running, non- restartable jobs. You want to minimize cost. What should you do?",
            "answers": [
                { "text": "Enable node auto-provisioning on the GKE cluster.", "isCorrect": true },
                { "text": "Create a VerticalPodAutscaler for those workloads.", "isCorrect": false },
                { "text": "Create a node pool with preemptible VMs and GPUs attached to those VMs.", "isCorrect": false },
                { "text": "Create a node pool of instances with GPUs, and enable autoscaling on this node pool with a minimum size of 1.", "isCorrect": false }

            ]
        },
        {
            "question": "Your organization has user identities in Active Directory. Your organization wants to use Active Directory as their source of truth for identities. Your organization wants to have full control over the Google accounts used by employees for all Google services, including your Google Cloud Platform (GCP) organization. What should you do?",
            "answers": [
                { "text": "Use Google Cloud Directory Sync (GCDS) to synchronize users into Cloud Identity.", "isCorrect": true },
                { "text": "Use the cloud Identity APIs and write a script to synchronize users to Cloud Identity.", "isCorrect": false },
                { "text": "Export users from Active Directory as a CSV and import them to Cloud Identity via the Admin Console.", "isCorrect": false },
                { "text": "Ask each employee to create a Google account using self signup. Require that each employee use their company email address and password.", "isCorrect": false }

            ]
        },
        {
            "question": "You have successfully created a development environment in a project for an application. This application uses Compute Engine and Cloud SQL. Now you need to create a production environment for this application. The security team has forbidden the existence of network routes between these 2 environments and has asked you to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Create a new project, enable the Compute Engine and Cloud SQL APIs in that project, and replicate the setup you have created in the development environment.", "isCorrect": true },
                { "text": "Create a new production subnet in the existing VPC and a new production Cloud SQL instance in your existing project, and deploy your application using those resources.", "isCorrect": false },
                { "text": "Create a new project, modify your existing VPC to be a Shared VPC, share that VPC with your new project, and replicate the setup you have in the development environment in that new project in the Shared VPC.", "isCorrect": false },
                { "text": "Ask the security team to grant you the Project Editor role in an existing production project used by another division of your company. Once they grant you that role, replicate the setup you have in the development environment in that project.", "isCorrect": false }

            ]
        },
        {
            "question": "Your management has asked an external auditor to review all the resources in a specific project. The security team has enabled the Organization Policy called Domain Restricted Sharing on the organization node by specifying only your Cloud Identity domain. You want the auditor to only be able to view, but not modify, the resources in that project. What should you do?",
            "answers": [
                { "text": "Create a temporary account for the auditor in Cloud Identity, and give that account the Viewer role on the project.", "isCorrect": true },
                { "text": "Create a temporary account for the auditor in Cloud Identity, and give that account the Security Reviewer role on the project.", "isCorrect": false },
                { "text": "Ask the auditor for their Google account, and give them the Security Reviewer role on the project.", "isCorrect": false },
                { "text": "Ask the auditor for their Google account, and give them the Viewer role on the project.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a workload running on Compute Engine that is critical to your business. You want to ensure that the data on the boot disk of this workload is backed up regularly. You need to be able to restore a backup as quickly as possible in case of disaster. You also want older backups to be cleaned automatically to save on cost. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Create a snapshot schedule for the disk using the desired interval.", "isCorrect": true },
                { "text": "Create a Cloud Function to create an instance template.", "isCorrect": false },
                { "text": "Create a cron job to create a new disk from the disk using gcloud.", "isCorrect": false },
                { "text": "Create a Cloud Task to create an image and export it to Cloud Storage.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to assign a Cloud Identity and Access Management (Cloud IAM) role to an external auditor. The auditor needs to have permissions to review your Google Cloud Platform (GCP) Audit Logs and also to review your Data Access logs. What should you do?",
            "answers": [
                { "text": "Assign the auditor the IAM role roles/logging.privateLogViewer. Direct the auditor to also review the logs for changes to Cloud IAM policy.", "isCorrect": true },
                { "text": "Assign the auditor the IAM role roles/logging.privateLogViewer. Perform the export of logs to Cloud Storage.", "isCorrect": false },
                { "text": "Assign the auditor's IAM user to a custom role that has logging.privateLogEntries.list permission. Perform the export of logs to Cloud Storage.", "isCorrect": false },
                { "text": "Assign the auditor's IAM user to a custom role that has logging.privateLogEntries.list permission. Direct the auditor to also review the logs for changes to Cloud IAM policy.", "isCorrect": false }

            ]
        },
        {
            "question": "You are managing several Google Cloud Platform (GCP) projects and need access to all logs for the past 60 days. You want to be able to explore and quickly analyze the log contents. You want to follow Google-recommended practices to obtain the combined logs for all projects. What should you do?",
            "answers": [
                { "text": "Create a Stackdriver Logging Export with a Sink destination to a BigQuery dataset. Configure the table expiration to 60 days.", "isCorrect": true },
                { "text": "Navigate to Stackdriver Logging and select resource.labels.project_id=\"*\"", "isCorrect": false },
                { "text": "Create a Stackdriver Logging Export with a Sink destination to Cloud Storage. Create a lifecycle rule to delete objects after 60 days.", "isCorrect": false },
                { "text": "Configure a Cloud Scheduler job to read from Stackdriver and store the logs in BigQuery. Configure the table expiration to 60 days.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to reduce GCP service costs for a division of your company using the fewest possible steps. You need to turn off all configured services in an existing GCP project. What should you do?",
            "answers": [
                { "text": "1. Verify that you are assigned the Project Owners IAM role for this project. 2. Locate the project in the GCP console, click Shut down and then enter the project ID.", "isCorrect": true },
                { "text": "1. Verify that you are assigned the Project Owners IAM role for this project. 2. Switch to the project in the GCP console, locate the resources and delete them.", "isCorrect": false },
                { "text": "1. Verify that you are assigned the Organizational Administrator IAM role for this project. 2. Locate the project in the GCP console, enter the project ID and then click Shut down.", "isCorrect": false },
                { "text": "1. Verify that you are assigned the Organizational Administrators IAM role for this project. 2. Switch to the project in the GCP console, locate the resources and delete them.", "isCorrect": false }

            ]
        },
        {
            "question": "You are configuring service accounts for an application that spans multiple projects. Virtual machines (VMs) running in the web-applications project need access to BigQuery datasets in crm-databases-proj. You want to follow Google-recommended practices to give access to the service account in the web-applications project. What should you do?",
            "answers": [
                { "text": "Give bigquery.dataViewer role to crm-databases-proj and appropriate roles to web-applications.", "isCorrect": true },
                { "text": "Give ג€project ownerג€ role to crm-databases-proj and bigquery.dataViewer role to web-applications.", "isCorrect": false },
                { "text": "Give ג€project ownerג€ role to crm-databases-proj and the web-applications project.", "isCorrect": false },
                { "text": "Give ג€project ownerג€ for web-applications appropriate roles to crm-databases-proj.", "isCorrect": false }

            ]
        },
        {
            "question": "An employee was terminated, but their access to Google Cloud Platform (GCP) was not removed until 2 weeks later. You need to find out this employee accessed any sensitive customer information after their termination. What should you do?",
            "answers": [
                { "text": "View Data Access audit logs in Stackdriver. Search for the user's email as the principal.", "isCorrect": true },
                { "text": "View System Event Logs in Stackdriver. Search for the user's email as the principal.", "isCorrect": false },
                { "text": "View System Event Logs in Stackdriver. Search for the service account associated with the user.", "isCorrect": false },
                { "text": "View the Admin Activity log in Stackdriver. Search for the service account associated with the user.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to create a custom IAM role for use with a GCP service. All permissions in the role must be suitable for production use. You also want to clearly share with your organization the status of the custom role. This will be the first version of the custom role. What should you do?",
            "answers": [
                { "text": "Use permissions in your role that use the 'supported' support level for role permissions. Set the role stage to ALPHA while testing the role permissions.", "isCorrect": true },
                { "text": "Use permissions in your role that use the 'supported' support level for role permissions. Set the role stage to BETA while testing the role permissions.", "isCorrect": false },
                { "text": "Use permissions in your role that use the 'testing' support level for role permissions. Set the role stage to ALPHA while testing the role permissions.", "isCorrect": false },
                { "text": "Use permissions in your role that use the 'testing' support level for role permissions. Set the role stage to BETA while testing the role permissions.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has a large quantity of unstructured data in different file formats. You want to perform ETL transformations on the data. You need to make the data accessible on Google Cloud so it can be processed by a Dataflow job. What should you do?",
            "answers": [
                { "text": "Upload the data to Cloud Storage using the gsutil command line tool.", "isCorrect": true },
                { "text": "Upload the data to BigQuery using the bq command line tool.", "isCorrect": false },
                { "text": "Upload the data into Cloud SQL using the import function in the console.", "isCorrect": false },
                { "text": "Upload the data into Cloud Spanner using the import function in the console.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to manage multiple Google Cloud projects in the fewest steps possible. You want to configure the Google Cloud SDK command line interface (CLI) so that you can easily manage multiple projects. What should you do?",
            "answers": [
                { "text": "1. Create a configuration for each project you need to manage. 2. Activate the appropriate configuration when you work with each of your assigned Google Cloud projects.", "isCorrect": true },
                { "text": "1. Create a configuration for each project you need to manage. 2. Use gcloud init to update the configuration values when you need to work with a non-default project", "isCorrect": false },
                { "text": "1. Use the default configuration for one project you need to manage. 2. Activate the appropriate configuration when you work with each of your assigned Google Cloud projects.", "isCorrect": false },
                { "text": "1. Use the default configuration for one project you need to manage. 2. Use gcloud init to update the configuration values when you need to work with a non-default project.", "isCorrect": false }

            ]
        },
        {
            "question": "Your managed instance group raised an alert stating that new instance creation has failed to create new instances. You need to maintain the number of running instances specified by the template to be able to process expected application traffic. What should you do?",
            "answers": [
                { "text": "Create an instance template that contains valid syntax which will be used by the instance group. Delete any persistent disks with the same name as instance names.", "isCorrect": true },
                { "text": "Create an instance template that contains valid syntax that will be used by the instance group. Verify that the instance name and persistent disk name values are not the same in the template.", "isCorrect": false },
                { "text": "Verify that the instance template being used by the instance group contains valid syntax. Delete any persistent disks with the same name as instance names. Set the disks.autoDelete property to true in the instance template.", "isCorrect": false },
                { "text": "Delete the current instance template and replace it with a new instance template. Verify that the instance name and persistent disk name values are not the same in the template. Set the disks.autoDelete property to true in the instance template.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company is moving from an on-premises environment to Google Cloud. You have multiple development teams that use Cassandra environments as backend databases. They all need a development environment that is isolated from other Cassandra instances. You want to move to Google Cloud quickly and with minimal support effort. What should you do?",
            "answers": [
                { "text": "1. Advise your developers to go to Cloud Marketplace. 2. Ask the developers to launch a Cassandra image for their development work.", "isCorrect": true },
                { "text": "1. Build an instruction guide to install Cassandra on Google Cloud. 2. Make the instruction guide accessible to your developers.", "isCorrect": false },
                { "text": "1. Build a Cassandra Compute Engine instance and take a snapshot of it. 2. Use the snapshot to create instances for your developers.", "isCorrect": false },
                { "text": "1. Build a Cassandra Compute Engine instance and take a snapshot of it. 2. Upload the snapshot to Cloud Storage and make it accessible to your developers. 3. Build instructions to create a Compute Engine instance from the snapshot so that developers can do it themselves.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a Compute Engine instance hosting a production application. You want to receive an email if the instance consumes more than 90% of its CPU resources for more than 15 minutes. You want to use Google services. What should you do?",
            "answers": [
                { "text": "1. Create a Stackdriver Workspace, and associate your Google Cloud Platform (GCP) project with it. 2. Create an Alerting Policy in Stackdriver that uses the threshold as a trigger condition. 3. Configure your email address in the notification channel.", "isCorrect": true },
                { "text": "1. Create a consumer Gmail account. 2. Write a script that monitors the CPU usage. 3. When the CPU usage exceeds the threshold, have that script send an email using the Gmail account and smtp.gmail.com on port 25 as SMTP server.", "isCorrect": false },
                { "text": "1. Create a Stackdriver Workspace, and associate your GCP project with it. 2. Write a script that monitors the CPU usage and sends it as a custom metric to Stackdriver. 3. Create an uptime check for the instance in Stackdriver.", "isCorrect": false },
                { "text": "1. In Stackdriver Logging, create a logs-based metric to extract the CPU usage by using this regular expression: CPU Usage: ([0-9] {1,3})% 2. In Stackdriver Monitoring, create an Alerting Policy based on this metric. 3. Configure your email address in the notification channel.", "isCorrect": false }

            ]
        },
        {
            "question": "You have an application that uses Cloud Spanner as a backend database. The application has a very predictable traffic pattern. You want to automatically scale up or down the number of Spanner nodes depending on traffic. What should you do?",
            "answers": [
                { "text": "Create a Cloud Monitoring alerting policy to send an alert to webhook when Cloud Spanner CPU is over or under your threshold. Create a Cloud Function that listens to HTTP and resizes Spanner resources accordingly.", "isCorrect": true },
                { "text": "Create a Cloud Monitoring alerting policy to send an alert to Google Cloud Support email when Cloud Spanner CPU exceeds your threshold. Google support would scale resources up or down accordingly.", "isCorrect": false },
                { "text": "Create a Cloud Monitoring alerting policy to send an alert to oncall SRE emails when Cloud Spanner CPU exceeds the threshold. SREs would scale resources up or down accordingly.", "isCorrect": false },
                { "text": "Create a cron job that runs on a scheduled basis to review Cloud Monitoring metrics, and then resize the Spanner instance accordingly.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company publishes large files on an Apache web server that runs on a Compute Engine instance. The Apache web server is not the only application running in the project. You want to receive an email when the egress network costs for the server exceed 100 dollars for the current month as measured by Google Cloud. What should you do?",
            "answers": [
                { "text": "Export the billing data to BigQuery. Create a Cloud Function that uses BigQuery to sum the egress network costs of the exported billing data for the Apache web server for the current month and sends an email if it is over 100 dollars. Schedule the Cloud Function using Cloud Scheduler to run hourly.", "isCorrect": true },
                { "text": "Set up a budget alert on the billing account with an amount of 100 dollars, a threshold of 100%, and notification type of ג€email.ג€", "isCorrect": false },
                { "text": "Set up a budget alert on the project with an amount of 100 dollars, a threshold of 100%, and notification type of ג€email.ג€", "isCorrect": false },
                { "text": "Use the Cloud Logging Agent to export the Apache web server logs to Cloud Logging. Create a Cloud Function that uses BigQuery to parse the HTTP response log data in Cloud Logging for the current month and sends an email if the size of all HTTP responses, multiplied by current Google Cloud egress prices, totals over 100 dollars. Schedule the Cloud Function using Cloud Scheduler to run hourly.", "isCorrect": false }

            ]
        },
        {
            "question": "You have designed a solution on Google Cloud that uses multiple Google Cloud products. Your company has asked you to estimate the costs of the solution. You need to provide estimates for the monthly total cost. What should you do?",
            "answers": [
                { "text": "For each Google Cloud product in the solution, review the pricing details on the products pricing page. Use the pricing calculator to total the monthly costs for each Google Cloud product.", "isCorrect": true },
                { "text": "For each Google Cloud product in the solution, review the pricing details on the products pricing page. Create a Google Sheet that summarizes the expected monthly costs for each product.", "isCorrect": false },
                { "text": "Provision the solution on Google Cloud. Leave the solution provisioned for 1 week. Navigate to the Billing Report page in the Cloud Console. Multiply the 1 week cost to determine the monthly costs.", "isCorrect": false },
                { "text": "Provision the solution on Google Cloud. Leave the solution provisioned for 1 week. Use Cloud Monitoring to determine the provisioned and used resource amounts. Multiply the 1 week cost to determine the monthly costs.", "isCorrect": false }

            ]
        },
        {
            "question": "You have an application that receives SSL-encrypted TCP traffic on port 443. Clients for this application are located all over the world. You want to minimize latency for the clients. Which load balancing option should you use?",
            "answers": [
                { "text": "SSL Proxy Load Balancer", "isCorrect": true },
                { "text": "Network Load Balancer", "isCorrect": false },
                { "text": "HTTPS Load Balancer", "isCorrect": false },
                { "text": "Internal TCP/UDP Load Balancer. Add a firewall rule allowing ingress traffic from 0.0.0.0/0 on the target instances.", "isCorrect": false }

            ]
        },
        {
            "question": "You have an application on a general-purpose Compute Engine instance that is experiencing excessive disk read throttling on its Zonal SSD Persistent Disk. The application primarily reads large files from disk. The disk size is currently 350 GB. You want to provide the maximum amount of throughput while minimizing costs. What should you do?",
            "answers": [
                { "text": "Migrate to use a Local SSD on the instance.", "isCorrect": true },
                { "text": "Increase the allocated CPU to the instance.", "isCorrect": false },
                { "text": "Increase the size of the disk to 1 TB.", "isCorrect": false },
                { "text": "Migrate to use a Regional SSD on the instance.", "isCorrect": false }

            ]
        },
        {
            "question": "Your Dataproc cluster runs in a single Virtual Private Cloud (VPC) network in a single subnet with range 172.16.20.128/25. There are no private IP addresses available in the VPC network. You want to add new VMs to communicate with your cluster using the minimum number of steps. What should you do?",
            "answers": [
                { "text": "Create a new VPC network for the VMs. Enable VPC Peering between the VMs' VPC network and the Dataproc cluster VPC network.", "isCorrect": true },
                { "text": "Modify the existing subnet range to 172.16.20.0/24.", "isCorrect": false },
                { "text": "Create a new Secondary IP Range in the VPC and configure the VMs to use that range.", "isCorrect": false },
                { "text": "Create a new VPC network for the VMs with a subnet of 172.32.0.0/16. Enable VPC network Peering between the Dataproc VPC network and the VMs VPC network. Configure a custom Route exchange.", "isCorrect": false }

            ]
        },
        {
            "question": "You manage an App Engine Service that aggregates and visualizes data from BigQuery. The application is deployed with the default App Engine Service account. The data that needs to be visualized resides in a different project managed by another team. You do not have access to this project, but you want your application to be able to read data from the BigQuery dataset. What should you do?",
            "answers": [
                { "text": "Ask the other team to grant your default App Engine Service account the role of BigQuery Job User.", "isCorrect": true },
                { "text": "Ask the other team to grant your default App Engine Service account the role of BigQuery Data Viewer.", "isCorrect": false },
                { "text": "In Cloud IAM of your project, ensure that the default App Engine service account has the role of BigQuery Data Viewer.", "isCorrect": false },
                { "text": "In Cloud IAM of your project, grant a newly created service account from the other team the role of BigQuery Job User in your project.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to create a copy of a custom Compute Engine virtual machine (VM) to facilitate an expected increase in application traffic due to a business acquisition. What should you do?",
            "answers": [
                { "text": "Create a Compute Engine snapshot of your base VM. Create your images from that snapshot.", "isCorrect": false },
                { "text": "Create a Compute Engine snapshot of your base VM. Create your instances from that snapshot.", "isCorrect": false },
                { "text": "Create a custom Compute Engine image from a snapshot. Create your images from that image.", "isCorrect": false },
                { "text": "Create a custom Compute Engine image from a snapshot. Create your instances from that image.", "isCorrect": true }

            ]
        },
        {
            "question": "You have deployed an application on a single Compute Engine instance. The application writes logs to disk. Users start reporting errors with the application. You want to diagnose the problem. What should you do?",
            "answers": [
                { "text": "Install and configure the Cloud Logging Agent and view the logs from Cloud Logging.", "isCorrect": true },
                { "text": "Configure a Health Check on the instance and set a Low Healthy Threshold value.", "isCorrect": false },
                { "text": "Connect to the instance's serial console and read the application logs.", "isCorrect": false },
                { "text": "Navigate to Cloud Logging and view the application logs.", "isCorrect": false }

            ]
        },
        {
            "question": "An application generates daily reports in a Compute Engine virtual machine (VM). The VM is in the project corp-iot-insights. Your team operates only in the project corp-aggregate-reports and needs a copy of the daily exports in the bucket corp-aggregate-reports-storage. You want to configure access so that the daily reports from the VM are available in the bucket corp-aggregate-reports-storage and use as few steps as possible while following Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Grant the VM Service Account the role Storage Object Creator on corp-aggregate-reports-storage.", "isCorrect": true },
                { "text": "Move both projects under the same folder.", "isCorrect": false },
                { "text": "Create a Shared VPC network between both projects. Grant the VM Service Account the role Storage Object Creator on corp-iot-insights.", "isCorrect": false },
                { "text": "Make corp-aggregate-reports-storage public and create a folder with a pseudo-randomized suffix name. Share the folder with the IoT team.", "isCorrect": false }

            ]
        },
        {
            "question": "You built an application on your development laptop that uses Google Cloud services. Your application uses Application Default Credentials for authentication and works fine on your development laptop. You want to migrate this application to a Compute Engine virtual machine (VM) and set up authentication using Google- recommended practices and minimal changes. What should you do?",
            "answers": [
                { "text": "Assign appropriate access for Google services to the service account used by the Compute Engine VM.", "isCorrect": true },
                { "text": "Create a service account with appropriate access for Google services, and configure the application to use this account.", "isCorrect": false },
                { "text": "Store credentials for service accounts with appropriate access for Google services in a config file, and deploy this config file with your application.", "isCorrect": false },
                { "text": "Store credentials for your user account with appropriate access for Google services in a config file, and deploy this config file with your application.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to create a Compute Engine instance in a new project that doesn't exist yet. What should you do?",
            "answers": [
                { "text": "Using the Cloud SDK, create a new project, enable the Compute Engine API in that project, and then create the instance specifying your new project.", "isCorrect": true },
                { "text": "Enable the Compute Engine API in the Cloud Console, use the Cloud SDK to create the instance, and then use the --project flag to specify a new project.", "isCorrect": false },
                { "text": "Using the Cloud SDK, create the new instance, and use the --project flag to specify the new project. Answer yes when prompted by Cloud SDK to enable the Compute Engine API.", "isCorrect": false },
                { "text": "Enable the Compute Engine API in the Cloud Console. Go to the Compute Engine section of the Console to create a new instance, and look for the Create In A New Project option in the creation form.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company runs one batch process in an on-premises server that takes around 30 hours to complete. The task runs monthly, can be performed offline, and must be restarted if interrupted. You want to migrate this workload to the cloud while minimizing cost. What should you do?",
            "answers": [
                { "text": "Migrate the workload to a Compute Engine VM. Start and stop the instance as needed.", "isCorrect": true },
                { "text": "Migrate the workload to a Compute Engine Preemptible VM.", "isCorrect": false },
                { "text": "Migrate the workload to a Google Kubernetes Engine cluster with Preemptible nodes.", "isCorrect": false },
                { "text": "Create an Instance Template with Preemptible VMs On. Create a Managed Instance Group from the template and adjust Target CPU Utilization. Migrate the workload.", "isCorrect": false }

            ]
        },
        {
            "question": "You are developing a new application and are looking for a Jenkins installation to build and deploy your source code. You want to automate the installation as quickly and easily as possible. What should you do?",
            "answers": [
                { "text": "Deploy Jenkins through the Google Cloud Marketplace.", "isCorrect": true },
                { "text": "Create a new Compute Engine instance. Run the Jenkins executable.", "isCorrect": false },
                { "text": "Create a new Kubernetes Engine cluster. Create a deployment for the Jenkins image.", "isCorrect": false },
                { "text": "Create an instance template with the Jenkins executable. Create a managed instance group with this template.", "isCorrect": false }

            ]
        },
        {
            "question": "You have downloaded and installed the gcloud command line interface (CLI) and have authenticated with your Google Account. Most of your Compute Engine instances in your project run in the europe-west1-d zone. You want to avoid having to specify this zone with each CLI command when managing these instances. What should you do?",
            "answers": [
                { "text": "Set the europe-west1-d zone as the default zone using the gcloud config subcommand.", "isCorrect": true },
                { "text": "In the Settings page for Compute Engine under Default location, set the zone to europeג€\"west1-d.", "isCorrect": false },
                { "text": "In the CLI installation directory, create a file called default.conf containing zone=europeג€\"west1ג€\"d.", "isCorrect": false },
                { "text": "Create a Metadata entry on the Compute Engine page with key compute/zone and value europeג€\"west1ג€\"d.", "isCorrect": false }

            ]
        },
        {
            "question": "The core business of your company is to rent out construction equipment at large scale. All the equipment that is being rented out has been equipped with multiple sensors that send event information every few seconds. These signals can vary from engine status, distance traveled, fuel level, and more. Customers are billed based on the consumption monitored by these sensors. You expect high throughput \`\" up to thousands of events per hour per device \`\" and need to retrieve consistent data based on the time of the event. Storing and retrieving individual signals should be atomic. What should you do?",
            "answers": [
                { "text": "Ingest the data into Cloud Bigtable. Create a row key based on the event timestamp.", "isCorrect": true },
                { "text": "Ingest the data into Datastore. Store data in an entity group based on the device.", "isCorrect": false },
                { "text": "Create a file in Cloud Filestore per device and append new data to that file.", "isCorrect": false },
                { "text": "Create a file in Cloud Storage per device and append new data to that file.", "isCorrect": false }

            ]
        },
        {
            "question": "You are asked to set up application performance monitoring on Google Cloud projects A, B, and C as a single pane of glass. You want to monitor CPU, memory, and disk. What should you do?",
            "answers": [
                { "text": "Enable API, create a workspace under project A, and then add projects B and C.", "isCorrect": true },
                { "text": "Enable API and then use default dashboards to view all projects in sequence.", "isCorrect": false },
                { "text": "Enable API and then give the metrics.reader role to projects A, B, and C.", "isCorrect": false },
                { "text": "Enable API and then share charts from project A, B, and C.", "isCorrect": false }

            ]
        },
        {
            "question": "You created several resources in multiple Google Cloud projects. All projects are linked to different billing accounts. To better estimate future charges, you want to have a single visual representation of all costs incurred. You want to include new cost data as soon as possible. What should you do?",
            "answers": [
                { "text": "Configure Billing Data Export to BigQuery and visualize the data in Data Studio.", "isCorrect": true },
                { "text": "Visit the Cost Table page to get a CSV export and visualize it using Data Studio.", "isCorrect": false },
                { "text": "Fill all resources in the Pricing Calculator to get an estimate of the monthly cost.", "isCorrect": false },
                { "text": "Use the Reports view in the Cloud Billing Console to view the desired cost information.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has workloads running on Compute Engine and on-premises. The Google Cloud Virtual Private Cloud (VPC) is connected to your WAN over a Virtual Private Network (VPN). You need to deploy a new Compute Engine instance and ensure that no public Internet traffic can be routed to it. What should you do?",
            "answers": [
                { "text": "Create the instance without a public IP address.", "isCorrect": true },
                { "text": "Create the instance with Private Google Access enabled.", "isCorrect": false },
                { "text": "Create a deny-all egress firewall rule on the VPC network.", "isCorrect": false },
                { "text": "Create a route on the VPC to route all traffic to the instance over the VPN tunnel.", "isCorrect": false }

            ]
        },
        {
            "question": "Your team maintains the infrastructure for your organization. The current infrastructure requires changes. You need to share your proposed changes with the rest of the team. You want to follow Google's recommended best practices. What should you do?",
            "answers": [
                { "text": "Use Deployment Manager templates to describe the proposed changes and store them in a Cloud Storage bucket.", "isCorrect": false },
                { "text": "Use Deployment Manager templates to describe the proposed changes and store them in Cloud Source Repositories.", "isCorrect": true },
                { "text": "Apply the changes in a development environment, run gcloud compute instances list, and then save the output in a shared Storage bucket.", "isCorrect": false },
                { "text": "Apply the changes in a development environment, run gcloud compute instances list, and then save the output in Cloud Source Repositories.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a Compute Engine instance hosting an application used between 9 AM and 6 PM on weekdays. You want to back up this instance daily for disaster recovery purposes. You want to keep the backups for 30 days. You want the Google-recommended solution with the least management overhead and the least number of services. What should you do?",
            "answers": [
                { "text": "1. In the Cloud Console, go to the Compute Engine Disks page and select your instance's disk. 2. In the Snapshot Schedule section, select Create Schedule and configure the following parameters: - Schedule frequency: Daily - Start time: 1:00 AM ג€\" 2:00 AM - Autodelete snapshots after: 30 days", "isCorrect": true },
                { "text": "1. Update your instances' metadata to add the following value: snapshotג€\"schedule: 0 1 * * * 2. Update your instances' metadata to add the following value: snapshotג€\"retention: 30", "isCorrect": false },
                { "text": "1. Create a Cloud Function that creates a snapshot of your instance's disk. 2. Create a Cloud Function that deletes snapshots that are older than 30 days. 3. Use Cloud Scheduler to trigger both Cloud Functions daily at 1:00 AM.", "isCorrect": false },
                { "text": "1. Create a bash script in the instance that copies the content of the disk to Cloud Storage. 2. Create a bash script in the instance that deletes data older than 30 days in the backup Cloud Storage bucket. 3. Configure the instance's crontab to execute these scripts daily at 1:00 AM.", "isCorrect": false }

            ]
        },
        {
            "question": "Your existing application running in Google Kubernetes Engine (GKE) consists of multiple pods running on four GKE n1\`\"standard\`\"2 nodes. You need to deploy additional pods requiring n2\`\"highmem\`\"16 nodes without any downtime. What should you do?",
            "answers": [
                { "text": "Create a new Node Pool and specify machine type n2ג€\"highmemג€\"16. Deploy the new pods.", "isCorrect": true },
                { "text": "Use gcloud container clusters upgrade. Deploy the new services.", "isCorrect": false },
                { "text": "Create a new cluster with n2ג€\"highmemג€\"16 nodes. Redeploy the pods and delete the old cluster.", "isCorrect": false },
                { "text": "Create a new cluster with both n1ג€\"standardג€\"2 and n2ג€\"highmemג€\"16 nodes. Redeploy the pods and delete the old cluster.", "isCorrect": false }

            ]
        },
        {
            "question": "You have an application that uses Cloud Spanner as a database backend to keep current state information about users. Cloud Bigtable logs all events triggered by users. You export Cloud Spanner data to Cloud Storage during daily backups. One of your analysts asks you to join data from Cloud Spanner and Cloud Bigtable for specific users. You want to complete this ad hoc request as efficiently as possible. What should you do?",
            "answers": [
                { "text": "Create two separate BigQuery external tables on Cloud Storage and Cloud Bigtable. Use the BigQuery console to join these tables through user fields, and apply appropriate filters.", "isCorrect": true },
                { "text": "Create a Cloud Dataproc cluster that runs a Spark job to extract data from Cloud Bigtable and Cloud Storage for specific users.", "isCorrect": false },
                { "text": "Create a dataflow job that copies data from Cloud Bigtable and Cloud Spanner for specific users.", "isCorrect": false },
                { "text": "Create a dataflow job that copies data from Cloud Bigtable and Cloud Storage for specific users.", "isCorrect": false }

            ]
        },
        {
            "question": "You are hosting an application from Compute Engine virtual machines (VMs) in us\`\"central1\`\"a. You want to adjust your design to support the failure of a single Compute Engine zone, eliminate downtime, and minimize cost. What should you do?",
            "answers": [
                { "text": "ג€\" Create Compute Engine resources in usג€\"central1ג€\"b. ג€\" Balance the load across both usג€\"central1ג€\"a and usג€\"central1ג€\"b.", "isCorrect": true },
                { "text": "ג€\" Create a Managed Instance Group and specify usג€\"central1ג€\"a as the zone. ג€\" Configure the Health Check with a short Health Interval.", "isCorrect": false },
                { "text": "ג€\" Create an HTTP(S) Load Balancer. ג€\" Create one or more global forwarding rules to direct traffic to your VMs.", "isCorrect": false },
                { "text": "ג€\" Perform regular backups of your application. ג€\" Create a Cloud Monitoring Alert and be notified if your application becomes unavailable. ג€\" Restore from backups when notified.", "isCorrect": false }

            ]
        },
        {
            "question": "A colleague handed over a Google Cloud Platform project for you to maintain. As part of a security checkup, you want to review who has been granted the Project Owner role. What should you do?",
            "answers": [
                { "text": "Use the command gcloud projects getג€"iamג€"policy to view the current role assignments.", "isCorrect": true },
                { "text": "Enable Audit Logs on the IAM & admin page for all resources, and validate the results.", "isCorrect": false },
                { "text": "Navigate to Identity-Aware Proxy and check the permissions for these resources.", "isCorrect": false },
                { "text": "In the console, validate which SSH keys have been stored as project-wide keys.", "isCorrect": false }

            ]
        },
        {
            "question": "You are running multiple VPC-native Google Kubernetes Engine clusters in the same subnet. The IPs available for the nodes are exhausted, and you want to ensure that the clusters can grow in nodes when needed. What should you do?",
            "answers": [
                { "text": "Expand the CIDR range of the relevant subnet for the cluster.", "isCorrect": true },
                { "text": "Create a new subnet in the same region as the subnet being used.", "isCorrect": false },
                { "text": "Add an alias IP range to the subnet used by the GKE clusters.", "isCorrect": false },
                { "text": "Create a new VPC, and set up VPC peering with the existing VPC.", "isCorrect": false }

            ]
        },
        {
            "question": "You have a batch workload that runs every night and uses a large number of virtual machines (VMs). It is fault-tolerant and can tolerate some of the VMs being terminated. The current cost of VMs is too high. What should you do?",
            "answers": [
                { "text": "Run a test using simulated maintenance events. If the test is successful, use preemptible N1 Standard VMs when running future jobs.", "isCorrect": true },
                { "text": "Run a test using simulated maintenance events. If the test is successful, use N1 Standard VMs when running future jobs.", "isCorrect": false },
                { "text": "Run a test using a managed instance group. If the test is successful, use N1 Standard VMs in the managed instance group when running future jobs.", "isCorrect": false },
                { "text": "Run a test using N1 standard VMs instead of N2. If the test is successful, use N1 Standard VMs when running future jobs.", "isCorrect": false }

            ]
        },
        {
            "question": "You are working with a user to set up an application in a new VPC behind a firewall. The user is concerned about data egress. You want to configure the fewest open egress ports. What should you do?",
            "answers": [
                { "text": "Set up a low-priority (65534) rule that blocks all egress and a high-priority rule (1000) that allows only the appropriate ports.", "isCorrect": true },
                { "text": "Set up a high-priority (1000) rule that pairs both ingress and egress ports.", "isCorrect": false },
                { "text": "Set up a high-priority (1000) rule that blocks all egress and a low-priority (65534) rule that allows only the appropriate ports.", "isCorrect": false },
                { "text": "Set up a high-priority (1000) rule to allow the appropriate ports", "isCorrect": false }

            ]
        },
        {
            "question": "Your company runs its Linux workloads on Compute Engine instances. Your company will be working with a new operations partner that does not use Google Accounts. You need to grant access to the instances to your operations partner so they can maintain the installed tooling. What should you do?",
            "answers": [
                { "text": "Enable Cloud IAP for the Compute Engine instances, and add the operations partner as a Cloud IAP Tunnel User.", "isCorrect": true },
                { "text": "Tag all the instances with the same network tag. Create a firewall rule in the VPC to grant TCP access on port 22 for traffic from the operations partner to instances with the network tag.", "isCorrect": false },
                { "text": "Set up Cloud VPN between your Google Cloud VPC and the internal network of the operations partner.", "isCorrect": false },
                { "text": "Ask the operations partner to generate SSH key pairs, and add the public keys to the VM instances.", "isCorrect": false }

            ]
        },
        {
            "question": "You have created a code snippet that should be triggered whenever a new file is uploaded to a Cloud Storage bucket. You want to deploy this code snippet. What should you do?",
            "answers": [
                { "text": "Use Cloud Functions and configure the bucket as a trigger resource.", "isCorrect": true },
                { "text": "Use App Engine and configure Cloud Scheduler to trigger the application using Pub/Sub.", "isCorrect": false },
                { "text": "Use Google Kubernetes Engine and configure a CronJob to trigger the application using Pub/Sub.", "isCorrect": false },
                { "text": "Use Dataflow as a batch job, and configure the bucket as a data source.", "isCorrect": false }

            ]
        },
        {
            "question": "You have been asked to set up Object Lifecycle Management for objects stored in storage buckets. The objects are written once and accessed frequently for 30 days. After 30 days, the objects are not read again unless there is a special need. The objects should be kept for three years, and you need to minimize cost. What should you do?",
            "answers": [
                { "text": "Set up a policy that uses Standard storage for 30 days and then moves to Archive storage for three years.", "isCorrect": true },
                { "text": "Set up a policy that uses Nearline storage for 30 days and then moves to Archive storage for three years.", "isCorrect": false },
                { "text": "Set up a policy that uses Nearline storage for 30 days, then moves the Coldline for one year, and then moves to Archive storage for two years.", "isCorrect": false },
                { "text": "Set up a policy that uses Standard storage for 30 days, then moves to Coldline for one year, and then moves to Archive storage for two years.", "isCorrect": false }

            ]
        },
        {
            "question": "You are storing sensitive information in a Cloud Storage bucket. For legal reasons, you need to be able to record all requests that read any of the stored data. You want to make sure you comply with these requirements. What should you do?",
            "answers": [
                { "text": "Enable Data Access audit logs for the Cloud Storage API.", "isCorrect": true },
                { "text": "Enable the Identity Aware Proxy API on the project.", "isCorrect": false },
                { "text": "Scan the bucket using the Data Loss Prevention API.", "isCorrect": false },
                { "text": "Allow only a single Service Account access to read the data.", "isCorrect": false }

            ]
        },
        {
            "question": "You are the team lead of a group of 10 developers. You provided each developer with an individual Google Cloud Project that they can use as their personal sandbox to experiment with different Google Cloud solutions. You want to be notified if any of the developers are spending above $500 per month on their sandbox environment. What should you do?",
            "answers": [
                { "text": "Create a budget per project and configure budget alerts on all of these budgets.", "isCorrect": true },
                { "text": "Create a single budget for all projects and configure budget alerts on this budget.", "isCorrect": false },
                { "text": "Create a separate billing account per sandbox project and enable BigQuery billing exports. Create a Data Studio dashboard to plot the spending per billing account.", "isCorrect": false },
                { "text": "Create a single billing account for all sandbox projects and enable BigQuery billing exports. Create a Data Studio dashboard to plot the spending per project.", "isCorrect": false }

            ]
        },
        {
            "question": "You are deploying a production application on Compute Engine. You want to prevent anyone from accidentally destroying the instance by clicking the wrong button. What should you do?",
            "answers": [
                { "text": "Enable delete protection on the instance.", "isCorrect": true },
                { "text": "Disable the flag ג€Delete boot disk when instance is deleted.ג€", "isCorrect": false },
                { "text": "Disable Automatic restart on the instance.", "isCorrect": false },
                { "text": "Enable Preemptibility on the instance.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company uses a large number of Google Cloud services centralized in a single project. All teams have specific projects for testing and development. The DevOps team needs access to all of the production services in order to perform their job. You want to prevent Google Cloud product changes from broadening their permissions in the future. You want to follow Google-recommended practices. What should you do?",
            "answers": [
                { "text": "Create a custom role that combines the required permissions. Grant the DevOps team the custom role on the production project.", "isCorrect": true },
                { "text": "Grant all members of the DevOps team the role of Project Editor on the production project.", "isCorrect": false },
                { "text": "Grant all members of the DevOps team the role of Project Editor on the organization level.", "isCorrect": false },
                { "text": "Create a custom role that combines the required permissions. Grant the DevOps team the custom role on the organization level.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building an application that processes data files uploaded from thousands of suppliers. Your primary goals for the application are data security and the expiration of aged data. You need to design the application to:\n* Restrict access so that suppliers can access only their own data.\n* Give suppliers write access to data only for 30 minutes.\n* Delete data that is over 45 days old.\nYou have a very short development cycle, and you need to make sure that the application requires minimal maintenance. Which two strategies should you use?\n(Choose two.)",
            "answers": [
                { "text": "Build a lifecycle policy to delete Cloud Storage objects after 45 days.", "isCorrect": true },
                { "text": "Use signed URLs to allow suppliers limited time access to store their objects.", "isCorrect": true },
                { "text": "Set up an SFTP server for your application, and create a separate user for each supplier.", "isCorrect": false },
                { "text": "Build a Cloud function that triggers a timer of 45 days to delete objects that have expired.", "isCorrect": false },
                { "text": "Develop a script that loops through all Cloud Storage buckets and deletes any buckets that are older than 45 days.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company wants to standardize the creation and management of multiple Google Cloud resources using Infrastructure as Code. You want to minimize the amount of repetitive code needed to manage the environment. What should you do?",
            "answers": [
                { "text": "Develop templates for the environment using Cloud Deployment Manager.", "isCorrect": true },
                { "text": "Use curl in a terminal to send a REST request to the relevant Google API for each individual resource.", "isCorrect": false },
                { "text": "Use the Cloud Console interface to provision and manage all related resources.", "isCorrect": false },
                { "text": "Create a bash script that contains all requirement steps as gcloud commands.", "isCorrect": false }

            ]
        },
        {
            "question": "You are performing a monthly security check of your Google Cloud environment and want to know who has access to view data stored in your Google Cloud Project. What should you do?",
            "answers": [
                { "text": "Review the IAM permissions for any role that allows for data access.", "isCorrect": true },
                { "text": "Enable Audit Logs for all APIs that are related to data storage.", "isCorrect": false },
                { "text": "Review the Identity-Aware Proxy settings for each resource.", "isCorrect": false },
                { "text": "Create a Data Loss Prevention job.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has embraced a hybrid cloud strategy where some of the applications are deployed on Google Cloud. A Virtual Private Network (VPN) tunnel connects your Virtual Private Cloud (VPC) in Google Cloud with your company's on-premises network. Multiple applications in Google Cloud need to connect to an on-premises database server, and you want to avoid having to change the IP configuration in all of your applications when the IP of the database changes. What should you do?",
            "answers": [
                { "text": "Create a private zone on Cloud DNS, and configure the applications with the DNS name.", "isCorrect": true },
                { "text": "Configure Cloud NAT for all subnets of your VPC to be used when egressing from the VM instances.", "isCorrect": false },
                { "text": "Configure the IP of the database as custom metadata for each instance, and query the metadata server.", "isCorrect": false },
                { "text": "Query the Compute Engine internal DNS from the applications to retrieve the IP of the database.", "isCorrect": false }

            ]
        },
        {
            "question": "You have developed a containerized web application that will serve internal colleagues during business hours. You want to ensure that no costs are incurred outside of the hours the application is used. You have just created a new Google Cloud project and want to deploy the application. What should you do?",
            "answers": [
                { "text": "Deploy the container on Cloud Run (fully managed), and set the minimum number of instances to zero.", "isCorrect": true },
                { "text": "Deploy the container on Cloud Run for Anthos, and set the minimum number of instances to zero.", "isCorrect": false },
                { "text": "Deploy the container on App Engine flexible environment with autoscaling, and set the value min_instances to zero in the app.yaml.", "isCorrect": false },
                { "text": "Deploy the container on App Engine flexible environment with manual scaling, and set the value instances to zero in the app.yaml.", "isCorrect": false }

            ]
        },
        {
            "question": "You have experimented with Google Cloud using your own credit card and expensed the costs to your company. Your company wants to streamline the billing process and charge the costs of your projects to their monthly invoice. What should you do?",
            "answers": [
                { "text": "Change the billing account of your projects to the billing account of your company.", "isCorrect": true },
                { "text": "Create a ticket with Google Billing Support to ask them to send the invoice to your company.", "isCorrect": false },
                { "text": "Set up BigQuery billing export and grant your financial department IAM access to query the data.", "isCorrect": false },
                { "text": "Grant the financial team the IAM role of ג€Billing Account Userג€ on the billing account linked to your credit card.", "isCorrect": false }

            ]
        },
        {
            "question": "You are running a data warehouse on BigQuery. A partner company is offering a recommendation engine based on the data in your data warehouse. The partner company is also running their application on Google Cloud. They manage the resources in their own project, but they need access to the BigQuery dataset in your project. You want to provide the partner company with access to the dataset. What should you do?",
            "answers": [
                { "text": "Ask the partner to create a Service Account in their project, and grant their Service Account access to the BigQuery dataset in your project.", "isCorrect": true },
                { "text": "Ask the partner to create a Service Account in their project, and have them give the Service Account access to BigQuery in their project.", "isCorrect": false },
                { "text": "Create a Service Account in your own project, and ask the partner to grant this Service Account access to BigQuery in their project.", "isCorrect": false },
                { "text": "Create a Service Account in your own project, and grant this Service Account access to BigQuery in your project.", "isCorrect": false }

            ]
        },
        {
            "question": "Your web application has been running successfully on Cloud Run for Anthos. You want to evaluate an updated version of the application with a specific percentage of your production users (canary deployment). What should you do?",
            "answers": [
                { "text": "Create a new revision with the new version of the application. Split traffic between this version and the version that is currently running.", "isCorrect": true },
                { "text": "Create a new service with the new version of the application. Split traffic between this version and the version that is currently running.", "isCorrect": false },
                { "text": "Create a new service with the new version of the application. Add an HTTP Load Balancer in front of both services.", "isCorrect": false },
                { "text": "Create a new revision with the new version of the application. Add an HTTP Load Balancer in front of both revisions.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company developed a mobile game that is deployed on Google Cloud. Gamers are connecting to the game with their personal phones over the Internet. The game sends UDP packets to update the servers about the gamers' actions while they are playing in multiplayer mode. Your game backend can scale over multiple virtual machines (VMs), and you want to expose the VMs over a single IP address. What should you do?",
            "answers": [
                { "text": "Configure an External Network load balancer in front of the application servers.", "isCorrect": true },
                { "text": "Configure an SSL Proxy load balancer in front of the application servers.", "isCorrect": false },
                { "text": "Configure an Internal UDP load balancer in front of the application servers.", "isCorrect": false },
                { "text": "Configure an External HTTP(s) load balancer in front of the application servers.", "isCorrect": false }

            ]
        },
        {
            "question": "You are working for a hospital that stores its medical images in an on-premises data room. The hospital wants to use Cloud Storage for archival storage of these images. The hospital wants an automated process to upload any new medical images to Cloud Storage. You need to design and implement a solution. What should you do?",
            "answers": [
                { "text": "Create a script that uses the gsutil command line interface to synchronize the on-premises storage with Cloud Storage. Schedule the script as a cron job.", "isCorrect": true },
                { "text": "Deploy a Dataflow job from the batch template, ג€Datastore to Cloud Storage.ג€ Schedule the batch job on the desired interval.", "isCorrect": false },
                { "text": "Create a Pub/Sub topic, and enable a Cloud Storage trigger for the Pub/Sub topic. Create an application that sends all medical images to the Pub/Sub topic.", "isCorrect": false },
                { "text": "In the Cloud Console, go to Cloud Storage. Upload the relevant images to the appropriate bucket.", "isCorrect": false }

            ]
        },
        {
            "question": "Your auditor wants to view your organization's use of data in Google Cloud. The auditor is most interested in auditing who accessed data in Cloud Storage buckets. You need to help the auditor access the data they need. What should you do?",
            "answers": [
                { "text": "Turn on Data Access Logs for the buckets they want to audit, and then build a query in the log viewer that filters on Cloud Storage.", "isCorrect": true },
                { "text": "Assign the appropriate permissions, and then create a Data Studio report on Admin Activity Audit Logs.", "isCorrect": false },
                { "text": "Assign the appropriate permissions, and then use Cloud Monitoring to review metrics.", "isCorrect": false },
                { "text": "Use the export logs API to provide the Admin Activity Audit Logs in the format they want.", "isCorrect": false }

            ]
        },
        {
            "question": "You received a JSON file that contained a private key of a Service Account in order to get access to several resources in a Google Cloud project. You downloaded and installed the Cloud SDK and want to use this private key for authentication and authorization when performing gcloud commands. What should you do?",
            "answers": [
                { "text": "Use the command gcloud auth activate-service-account and point it to the private key.", "isCorrect": true },
                { "text": "Use the command gcloud auth login and point it to the private key.", "isCorrect": false },
                { "text": "Place the private key file in the installation directory of the Cloud SDK and rename it to ג€credentials.jsonג€.", "isCorrect": false },
                { "text": "Place the private key file in your home directory and rename it to ג€GOOGLE_APPLICATION_CREDENTIALSג€.", "isCorrect": false }

            ]
        },
        {
            "question": "You are working with a Cloud SQL MySQL database at your company. You need to retain a month-end copy of the database for three years for audit purposes. What should you do?",
            "answers": [
                { "text": "Set up an export job for the first of the month. Write the export file to an Archive class Cloud Storage bucket.", "isCorrect": true },
                { "text": "Save the automatic first-of-the-month backup for three years. Store the backup file in an Archive class Cloud Storage bucket.", "isCorrect": false },
                { "text": "Set up an on-demand backup for the first of the month. Write the backup to an Archive class Cloud Storage bucket.", "isCorrect": false },
                { "text": "Convert the automatic first-of-the-month backup to an export file. Write the export file to a Coldline class Cloud Storage bucket.", "isCorrect": false }

            ]
        },
        {
            "question": "You are monitoring an application and receive user feedback that a specific error is spiking. You notice that the error is caused by a Service Account having insufficient permissions. You are able to solve the problem but want to be notified if the problem recurs. What should you do?",
            "answers": [
                { "text": "Create a custom log-based metric for the specific error to be used in an Alerting Policy.", "isCorrect": true },
                { "text": "In the Log Viewer, filter the logs on severity 'Error' and the name of the Service Account.", "isCorrect": false },
                { "text": "Create a sink to BigQuery to export all the logs. Create a Data Studio dashboard on the exported logs.", "isCorrect": false },
                { "text": "Grant Project Owner access to the Service Account.", "isCorrect": false }

            ]
        },
        {
            "question": "You are developing a financial trading application that will be used globally. Data is stored and queried using a relational structure, and clients from all over the world should get the exact identical state of the data. The application will be deployed in multiple regions to provide the lowest latency to end users. You need to select a storage option for the application data while minimizing latency. What should you do?",
            "answers": [
                { "text": "Use Cloud Spanner for data storage.", "isCorrect": true },
                { "text": "Use Cloud Bigtable for data storage.", "isCorrect": false },
                { "text": "Use Cloud SQL for data storage.", "isCorrect": false },
                { "text": "Use Firestore for data storage.", "isCorrect": false }

            ]
        },
        {
            "question": "You are about to deploy a new Enterprise Resource Planning (ERP) system on Google Cloud. The application holds the full database in-memory for fast data access, and you need to configure the most appropriate resources on Google Cloud for this application. What should you do?",
            "answers": [
                { "text": "Provision Compute Engine instances with M1 machine type.", "isCorrect": true },
                { "text": "Provision preemptible Compute Engine instances.", "isCorrect": false },
                { "text": "Provision Compute Engine instances with GPUs attached.", "isCorrect": false },
                { "text": "Provision Compute Engine instances with local SSDs attached.", "isCorrect": false }

            ]
        },
        {
            "question": "You have developed an application that consists of multiple microservices, with each microservice packaged in its own Docker container image. You want to deploy the entire application on Google Kubernetes Engine so that each microservice can be scaled individually. What should you do?",
            "answers": [
                { "text": "Create and deploy a Deployment per microservice.", "isCorrect": true },
                { "text": "Create and deploy a Custom Resource Definition per microservice.", "isCorrect": false },
                { "text": "Create and deploy a Docker Compose File.", "isCorrect": false },
                { "text": "Create and deploy a Job per microservice.", "isCorrect": false }

            ]
        },
        {
            "question": "You will have several applications running on different Compute Engine instances in the same project. You want to specify at a more granular level the service account each instance uses when calling Google Cloud APIs. What should you do?",
            "answers": [
                { "text": "When creating the instances, specify a Service Account for each instance.", "isCorrect": true },
                { "text": "When creating the instances, assign the name of each Service Account as instance metadata.", "isCorrect": false },
                { "text": "After starting the instances, use gcloud compute instances update to specify a Service Account for each instance.", "isCorrect": false },
                { "text": "After starting the instances, use gcloud compute instances update to assign the name of the relevant Service Account as instance metadata.", "isCorrect": false }

            ]
        },
        {
            "question": "You are creating an application that will run on Google Kubernetes Engine. You have identified MongoDB as the most suitable database system for your application and want to deploy a managed MongoDB environment that provides a support SLA. What should you do?",
            "answers": [
                { "text": "Deploy MongoDB Atlas from the Google Cloud Marketplace.", "isCorrect": true },
                { "text": "Create a Cloud Bigtable cluster, and use the HBase API.", "isCorrect": false },
                { "text": "Download a MongoDB installation package, and run it on Compute Engine instances.", "isCorrect": false },
                { "text": "Download a MongoDB installation package, and run it on a Managed Instance Group.", "isCorrect": false }

            ]
        },
        {
            "question": "You are managing a project for the Business Intelligence (BI) department in your company. A data pipeline ingests data into BigQuery via streaming. You want the users in the BI department to be able to run the custom SQL queries against the latest data in BigQuery. What should you do?",
            "answers": [
                { "text": "Assign the IAM role of BigQuery User to a Google Group that contains the members of the BI team.", "isCorrect": true },
                { "text": "Create a Data Studio dashboard that uses the related BigQuery tables as a source and give the BI team view access to the Data Studio dashboard.", "isCorrect": false },
                { "text": "Create a Service Account for the BI team and distribute a new private key to each member of the BI team.", "isCorrect": false },
                { "text": "Use Cloud Scheduler to schedule a batch Dataflow job to copy the data from BigQuery to the BI team's internal data warehouse.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company is moving its entire workload to Compute Engine. Some servers should be accessible through the Internet, and other servers should only be accessible over the internal network. All servers need to be able to talk to each other over specific ports and protocols. The current on-premises network relies on a demilitarized zone (DMZ) for the public servers and a Local Area Network (LAN) for the private servers. You need to design the networking infrastructure on Google Cloud to match these requirements. What should you do?",
            "answers": [
                { "text": "1. Create a single VPC with a subnet for the DMZ and a subnet for the LAN. 2. Set up firewall rules to open up relevant traffic between the DMZ and the LAN subnets, and another firewall rule to allow public ingress traffic for the DMZ.", "isCorrect": true },
                { "text": "1. Create a single VPC with a subnet for the DMZ and a subnet for the LAN. 2. Set up firewall rules to open up relevant traffic between the DMZ and the LAN subnets, and another firewall rule to allow public egress traffic for the DMZ.", "isCorrect": false },
                { "text": "1. Create a VPC with a subnet for the DMZ and another VPC with a subnet for the LAN. 2. Set up firewall rules to open up relevant traffic between the DMZ and the LAN subnets, and another firewall rule to allow public ingress traffic for the DMZ.", "isCorrect": false },
                { "text": "1. Create a VPC with a subnet for the DMZ and another VPC with a subnet for the LAN. 2. Set up firewall rules to open up relevant traffic between the DMZ and the LAN subnets, and another firewall rule to allow public egress traffic for the DMZ.", "isCorrect": false }

            ]
        },
        {
            "question": "You have just created a new project which will be used to deploy a globally distributed application. You will use Cloud Spanner for data storage. You want to create a Cloud Spanner instance. You want to perform the first step in preparation of creating the instance. What should you do?",
            "answers": [
                { "text": "Enable the Cloud Spanner API.", "isCorrect": true },
                { "text": "Configure your Cloud Spanner instance to be multi-regional.", "isCorrect": false },
                { "text": "Create a new VPC network with subnetworks in all desired regions.", "isCorrect": false },
                { "text": "Grant yourself the IAM role of Cloud Spanner Admin.", "isCorrect": false }

            ]
        },
        {
            "question": "You have created a new project in Google Cloud through the gcloud command line interface (CLI) and linked a billing account. You need to create a new Compute Engine instance using the CLI. You need to perform the prerequisite stops. What should you do?",
            "answers": [
                { "text": "Enable the compute googleapis.com API.", "isCorrect": true },
                { "text": "Create a Cloud Monitoring Workspace.", "isCorrect": false },
                { "text": "Create a VPC network in the project.", "isCorrect": false },
                { "text": "Grant yourself the IAM role of Computer Admin.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has developed an Appliaction that consists of multiple microservices. You want to deploy the application to Google Kubernetes Engine (GKE), and you want to ensure that the cluster can scale as more applications are deployed in the future. You want to avoid manual intervention when each new application is deployed. What should you do?",
            "answers": [
                { "text": "Create a GKE cluster with autoscaling enabled on the node pool. Set a minimum and maximum for the size of the node pool.", "isCorrect": true },
                { "text": "Deploy the application on GKE, and add a HorizontalPodAutoscaler to the deployment.", "isCorrect": false },
                { "text": "Deploy the application on GKE, and add a VerticalPodAutoscaler to the deployment.", "isCorrect": false },
                { "text": "Create a separate node pool for each application, and deploy each application to its dedicated node pool.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to manage a third-party application that will run on a Compute Engine instance. Other Compute Engine instances are already running with default configuration. Application installation files are hosted on Cloud Storage. You need to access these files from the new instance without allowing other virtual machines (VMs) to access these files. What should you do?",
            "answers": [
                { "text": "Create a new service account and assign this service account to the new instance. Grant the service account permissions on Cloud Storage.", "isCorrect": true },
                { "text": "Create the instance with the default Compute Engine service account. Grant the service account permissions on Cloud Storage.", "isCorrect": false },
                { "text": "Create the instance with the default Compute Engine service account. Add metadata to the objects on Cloud Storage that matches the metadata on the new instance.", "isCorrect": false },
                { "text": "Create a new service account and assign this service account to the new instance. Add metadata to the objects on Cloud Storage that matches the metadata on the new instance.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to configure optimal data storage for files stored in Cloud Storage for minimal cost. The files are used in a mission-critical analytics pipeline that is used continually. The users are in Boston, MA (United States). What should you do?",
            "answers": [
                { "text": "Configure regional storage for the region closest to the users. Configure a Standard storage class.", "isCorrect": true },
                { "text": "Configure regional storage for the region closest to the users. Configure a Nearline storage class.", "isCorrect": false },
                { "text": "Configure dual-regional storage for the dual region closest to the users. Configure a Nearline storage class.", "isCorrect": false },
                { "text": "Configure dual-regional storage for the dual region closest to the users. Configure a Standard storage class.", "isCorrect": false }

            ]
        },
        {
            "question": "You are developing a new web application that will be deployed on Google Cloud Platform. As part of your release cycle, you want to test updates to your application on a small portion of real user traffic. The majority of the users should still be directed towards a stable version of your application. What should you do?",
            "answers": [
                { "text": "Deploy the application on App Engine. For each update, create a new version of the same service. Configure traffic splitting to send a small percentage of traffic to the new version.", "isCorrect": true },
                { "text": "Deploy the application on App Engine. For each update, create a new service. Configure traffic splitting to send a small percentage of traffic to the new service.", "isCorrect": false },
                { "text": "Deploy the application on Kubernetes Engine. For a new release, update the deployment to use the new version.", "isCorrect": false },
                { "text": "Deploy the application on Kubernetes Engine. For a new release, create a new deployment for the new version. Update the service to use the new deployment.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to add a group of new users to Cloud Identity. Some of the users already have existing Google accounts. You want to follow one of Google's recommended practices and avoid conflicting accounts. What should you do?",
            "answers": [
                { "text": "Invite the user to transfer their existing account.", "isCorrect": true },
                { "text": "Invite the user to use an email alias to resolve the conflict.", "isCorrect": false },
                { "text": "Tell the user that they must delete their existing account.", "isCorrect": false },
                { "text": "Tell the user to remove all personal email from the existing account.", "isCorrect": false }

            ]
        },
        {
            "question": "You need to manage a Cloud Spanner instance for best query performance. Your instance in production runs in a single Google Cloud region. You need to improve performance in the shortest amount of time. You want to follow Google best practices for service configuration. What should you do?",
            "answers": [
                { "text": "Create an alert in Cloud Monitoring to alert when the percentage of high priority CPU utilization reaches 65%. If you exceed this threshold, add nodes to your instance.", "isCorrect": true },
                { "text": "Create an alert in Cloud Monitoring to alert when the percentage of high priority CPU utilization reaches 45%. If you exceed this threshold, add nodes to your instance.", "isCorrect": false },
                { "text": "Create an alert in Cloud Monitoring to alert when the percentage of high priority CPU utilization reaches 45%. Use database query statistics to identify queries that result in high CPU usage, and then rewrite those queries to optimize their resource usage.", "isCorrect": false },
                { "text": "Create an alert in Cloud Monitoring to alert when the percentage of high priority CPU utilization reaches 65%. Use database query statistics to identify queries that result in high CPU usage, and then rewrite those queries to optimize their resource usage.", "isCorrect": false }

            ]
        },
        {
            "question": "Your company has an internal application for managing transactional orders. The application is used exclusively by employees in a single physical location. The application requires strong consistency, fast queries, and ACID guarantees for multi-table transactional updates. The first version of the application is implemented in PostgreSQL, and you want to deploy it to the cloud with minimal code changes. Which database is most appropriate for this application?",
            "answers": [
                { "text": "Cloud SQL", "isCorrect": true },
                { "text": "BigQuery", "isCorrect": false },
                { "text": "Cloud Spanner", "isCorrect": false },
                { "text": "Cloud Datastore", "isCorrect": false }

            ]
        },
        {
            "question": "You are assigned to maintain a Google Kubernetes Engine (GKE) cluster named 'dev' that was deployed on Google Cloud. You want to manage the GKE configuration using the command line interface (CLI). You have just downloaded and installed the Cloud SDK. You want to ensure that future CLI commands by default address this specific cluster. What should you do?",
            "answers": [
                { "text": "Use the command gcloud config set container/cluster dev.", "isCorrect": true },
                { "text": "Use the command gcloud container clusters update dev.", "isCorrect": false },
                { "text": "Create a file called gke.default in the ~/.gcloud folder that contains the cluster name.", "isCorrect": false },
                { "text": "Create a file called defaults.json in the ~/.gcloud folder that contains the cluster name.", "isCorrect": false }

            ]
        },
        {
            "question": "The sales team has a project named Sales Data Digest that has the ID acme-data-digest. You need to set up similar Google Cloud resources for the marketing team but their resources must be organized independently of the sales team. What should you do?",
            "answers": [
                { "text": "Create another project with the ID acme-marketing-data-digest for the Marketing team and deploy the resources there.", "isCorrect": true },
                { "text": "Grant the Project Editor role to the Marketing team for acme-data-digest.", "isCorrect": false },
                { "text": "Create a Project Lien on acme-data-digest and then grant the Project Editor role to the Marketing team.", "isCorrect": false },
                { "text": "Create a new project named Marketing Data Digest and use the ID acme-data-digest. Grant the Project Editor role to the Marketing team.", "isCorrect": false }

            ]
        },
        {
            "question": "You have deployed multiple Linux instances on Compute Engine. You plan on adding more instances in the coming weeks. You want to be able to access all of these instances through your SSH client over the internet without having to configure specific access on the existing and new instances. You do not want the Compute Engine instances to have a public IP. What should you do?",
            "answers": [
                { "text": "Configure Cloud Identity-Aware Proxy for SSH and TCP resources", "isCorrect": true },
                { "text": "Configure Cloud Identity-Aware Proxy for HTTPS resources.", "isCorrect": false },
                { "text": "Create an SSH keypair and store the public key as a project-wide SSH Key.", "isCorrect": false },
                { "text": "Create an SSH keypair and store the private key as a project-wide SSH Key.", "isCorrect": false }

            ]
        },
        {
            "question": "You have created an application that is packaged into a Docker image. You want to deploy the Docker image as a workload on Google Kubernetes Engine. What should you do?",
            "answers": [
                { "text": "Upload the image to Container Registry and create a Kubernetes Deployment referencing the image.", "isCorrect": true },
                { "text": "Upload the image to Cloud Storage and create a Kubernetes Service referencing the image.", "isCorrect": false },
                { "text": "Upload the image to Cloud Storage and create a Kubernetes Deployment referencing the image.", "isCorrect": false },
                { "text": "Upload the image to Container Registry and create a Kubernetes Service referencing the image.", "isCorrect": false }

            ]
        },
        {
            "question": "You are using Data Studio to visualize a table from your data warehouse that is built on top of BigQuery. Data is appended to the data warehouse during the day. At night, the daily summary is recalculated by overwriting the table. You just noticed that the charts in Data Studio are broken, and you want to analyze the problem. What should you do?",
            "answers": [
                { "text": "Use the BigQuery interface to review the nightly job and look for any errors.", "isCorrect": true },
                { "text": "Review the Error Reporting page in the Cloud Console to find any errors.", "isCorrect": false },
                { "text": "Use Cloud Debugger to find out why the data was not refreshed correctly.", "isCorrect": false },
                { "text": "In Cloud Logging, create a filter for your Data Studio report.", "isCorrect": false }

            ]
        },
        {
            "question": "You have been asked to set up the billing configuration for a new Google Cloud customer. Your customer wants to group resources that share common IAM policies. What should you do?",
            "answers": [
                { "text": "Use folders to group resources that share common IAM policies.", "isCorrect": true },
                { "text": "Use labels to group resources that share common IAM policies.", "isCorrect": false },
                { "text": "Set up a proper billing account structure to group IAM policies.", "isCorrect": false },
                { "text": "Set up a proper project naming structure to group IAM policies.", "isCorrect": false }

            ]
        },
        {
            "question": "You have been asked to create robust Virtual Private Network (VPN) connectivity between a new Virtual Private Cloud (VPC) and a remote site. Key requirements include dynamic routing, a shared address space of 10.19.0.1/22, and no overprovisioning of tunnels during a failover event. You want to follow Google- recommended practices to set up a high availability Cloud VPN. What should you do?",
            "answers": [
                { "text": "Use a custom mode VPC network, use Cloud Router border gateway protocol (BGP) routes, and use active/passive routing.", "isCorrect": true },
                { "text": "Use a custom mode VPC network, configure static routes, and use active/passive routing.", "isCorrect": false },
                { "text": "Use an automatic mode VPC network, configure static routes, and use active/active routing.", "isCorrect": false },
                { "text": "Use an automatic mode VPC network, use Cloud Router border gateway protocol (BGP) routes, and configure policy-based routing.", "isCorrect": false }

            ]
        },
        {
            "question": "You are running multiple microservices in a Kubernetes Engine cluster. One microservice is rendering images. The microservice responsible for the image rendering requires a large amount of CPU time compared to the memory it requires. The other microservices are workloads that are optimized for n1-standard machine types. You need to optimize your cluster so that all workloads are using resources as efficiently as possible. What should you do?",
            "answers": [
                { "text": "Create a node pool with compute-optimized machine type nodes for the image rendering microservice. Use the node pool with general-purpose machine type nodes for the other microservices.", "isCorrect": true },
                { "text": "Assign the pods of the image rendering microservice a higher pod priority than the other microservices.", "isCorrect": false },
                { "text": "Use the node pool with general-purpose machine type nodes for the image rendering microservice. Create a node pool with compute-optimized machine type nodes for the other microservices.", "isCorrect": false },
                { "text": "Configure the required amount of CPU and memory in the resource requests specification of the image rendering microservice deployment. Keep the resource requests for the other microservices at the default.", "isCorrect": false }

            ]
        },
        {
            "question": "Your organization has three existing Google Cloud projects. You need to bill the Marketing department for only their Google Cloud services for a new initiative within their group. What should you do?",
            "answers": [
                { "text": "1. Verify that you are assigned the Billing Administrator IAM role for your organization's Google Cloud Project for the Marketing department. 2. Link the new project to a Marketing Billing Account.", "isCorrect": true },
                { "text": "1. Verify that you are assigned the Billing Administrator IAM role for your organization's Google Cloud account. 2. Create a new Google Cloud Project for the Marketing department. 3. Set the default key-value project labels to department:marketing for all services in this project.", "isCorrect": false },
                { "text": "1. Verify that you are assigned the Organization Administrator IAM role for your organization's Google Cloud account. 2. Create a new Google Cloud Project for the Marketing department. 3. Link the new project to a Marketing Billing Account.", "isCorrect": false },
                { "text": "1. Verify that you are assigned the Organization Administrator IAM role for your organization's Google Cloud account. 2. Create a new Google Cloud Project for the Marketing department. 3. Set the default key-value project labels to department:marketing for all services in this project.", "isCorrect": false }

            ]
        },
        {
            "question": "You deployed an application on a managed instance group in Compute Engine. The application accepts Transmission Control Protocol (TCP) traffic on port 389 and requires you to preserve the IP address of the client who is making a request. You want to expose the application to the internet by using a load balancer. What should you do?",
            "answers": [
                { "text": "Expose the application by using an external TCP Network Load Balancer.", "isCorrect": true },
                { "text": "Expose the application by using a TCP Proxy Load Balancer.", "isCorrect": false },
                { "text": "Expose the application by using an SSL Proxy Load Balancer.", "isCorrect": false },
                { "text": "Expose the application by using an internal TCP Network Load Balancer.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building a multi-player gaming application that will store game information in a database. As the popularity of the application increases, you are concerned about delivering consistent performance. You need to ensure an optimal gaming performance for global users, without increasing the management complexity. What should you do?",
            "answers": [
                { "text": "Use Cloud Spanner to store user data mapped to the game statistics.", "isCorrect": true },
                { "text": "Use Cloud SQL database with cross-region replication to store game statistics in the EU, US, and APAC regions.", "isCorrect": false },
                { "text": "Use BigQuery to store game statistics with a Redis on Memorystore instance in the front to provide global consistency.", "isCorrect": false },
                { "text": "Store game statistics in a Bigtable database partitioned by username.", "isCorrect": false }

            ]
        },
        {
            "question": "You are building an application that stores relational data from users. Users across the globe will use this application. Your CTO is concerned about the scaling requirements because the size of the user base is unknown. You need to implement a database solution that can scale with your user growth with minimum configuration changes. Which storage solution should you use?",
            "answers": [
                { "text": "Cloud Spanner", "isCorrect": true },
                { "text": "Cloud SQL", "isCorrect": false },
                { "text": "Firestore", "isCorrect": false },
                { "text": "Bigtable", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        ,
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        },
        {
            "question": "",
            "answers": [
                { "text": "", "isCorrect": true },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false },
                { "text": "", "isCorrect": false }

            ]
        }
    ];
}