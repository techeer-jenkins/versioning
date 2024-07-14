pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose-deploy.yml'
        DEPLOY_SERVER="jenkinstest@34.69.206.54"
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
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
                    ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} '
                        git clone https://github.com/techeer-jenkins/versioning.git ~/my-project
                    '
                    
                    // Navigate to the cloned repository and run Docker Compose commands
                    ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} '
                        cd versioning
                        ls -al  # Check directory contents (optional)
                        docker-compose -f ${DOCKER_COMPOSE_FILE} pull
                        docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
                    '
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                            [pattern: '.propsfile', type: 'EXCLUDE']])
        }
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