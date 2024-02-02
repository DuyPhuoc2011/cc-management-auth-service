pipeline {
    agent any
    environment {
        DOCKER_HUB = 'duyphuoc'
        DOCKER_REPOSITORY = 'cc-management'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        SERVICE_NAME = 'auth'
    }
    stages {
        stage('Cleanup') {
            steps {
                sh 'rm -rf node_modules'
                cleanWs()
            }
        }

        stage('Checkout source') {
            steps {
                echo "Checking out source code"
                checkout scm
            }
        }

        stage('Build and push image') {
            when { 
                expression { 
                    env.GIT_BRANCH == 'origin/staging' || env.BRANCH_NAME == 'origin/prod'
                }
            }

            steps {
                // Build and push image
                script {
                    env.BRANCH_NAME = env.GIT_BRANCH.split('/')[1]
                    env.IMAGE_TAG = "${DOCKER_HUB}/${DOCKER_REPOSITORY}:${SERVICE_NAME}-${BRANCH_NAME}-${env.GIT_COMMIT.substring(0, 7)}"
                    echo "Building image ${IMAGE_TAG}"
                    sh "docker build -t ${IMAGE_TAG} . \
                        && docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW} \
                        && docker push ${IMAGE_TAG} \
                        && docker rmi ${IMAGE_TAG}"
                }
            }
        }
        
        stage('Deploy to staging') {
            steps {
                // Deploy
                script {
                    sh "kubectl set image deployment/auth-deployment auth-container=${IMAGE_TAG}"
                }
            }
        }
    }
}

