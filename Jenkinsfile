pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose-deploy.yml'
        DEPLOY_SERVER="jenkinstest@34.69.206.54"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/techeer-jenkins/versioning.git'
            }
        }

        stage('Test') {
            steps {
                script {
                    sh "docker --version"
                    sh "docker compose --version"
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    sshagent(['deploy-server-access']) {
                        sh """
                        scp -o StrictHostKeyChecking=no ${DOCKER_COMPOSE_FILE} ${DEPLOY_SERVER}:~/${DOCKER_COMPOSE_FILE}
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} '
                        cd ~ &&
                        ls -al &&
                        docker compose -f ${DOCKER_COMPOSE_FILE} pull &&
                        docker compose -f ${DOCKER_COMPOSE_FILE} up -d'
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
            slackSend message: "Service deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
        failure {
            echo 'Build or deployment failed.'
            slackSend failOnError: true, message: "Build failed  - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
    }
}