pipeline {
i
    agent any

    environment {
        IMAGE_NAME     = "srivari-site"
        CONTAINER_NAME = "srivari-container"
        HOST_PORT      = "3001"
        CONTAINER_PORT = "80"
        REPO_URL       = "https://github.com/ParthaV30/Srivari-Contractors.git"
        BRANCH_NAME    = "main"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: "${BRANCH_NAME}", url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "--- Building Docker image for Srivari Contractors ---"
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Cleanup Old Container') {
            steps {
                script {
                    echo "--- Cleaning up old container (if exists) ---"
                    sh """
                        if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                            echo "Stopping and removing existing container..."
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                        else
                            echo "No existing container found ✅"
                        fi
                    """
                }
            }
        }

        stage('Free Port If Busy') {
            steps {
                script {
                    echo "--- Checking if port ${HOST_PORT} is already in use ---"
                    sh """
                        CONTAINER_ID=\$(docker ps --filter "publish=${HOST_PORT}" --format "{{.ID}}")
                        if [ ! -z "\$CONTAINER_ID" ]; then
                            echo "Port ${HOST_PORT} in use by container \$CONTAINER_ID. Stopping it..."
                            docker stop \$CONTAINER_ID || true
                            docker rm \$CONTAINER_ID || true
                        else
                            echo "Port ${HOST_PORT} is free ✅"
                        fi
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    echo "--- Running new container for Srivari Contractors ---"
                    sh """
                        docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Clean Dangling Images') {
            steps {
                script {
                    echo "--- Cleaning unused Docker images ---"
                    sh "docker image prune -f || true"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! App running on port ${HOST_PORT}"
        }
        failure {
            echo "❌ Deployment failed. Check Jenkins console logs."
        }
    }
}

