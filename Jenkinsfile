pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/ParthaV30/Srivari-Contractors.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t srivari-site:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop srivari || true
                docker rm srivari || true
                docker run -d \
                  --name srivari \
                  -p 3001:80 \
                  --restart unless-stopped \
                  srivari-site:latest
                '''
            }
        }
    }
}

