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