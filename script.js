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