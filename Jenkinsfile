pipeline {
    agent any

    stages {
        stage('List Cloned Files') {
            steps {
                echo "Files cloned from the GitHub repo:"
                sh 'ls build'
                sh 'python3'
            }
        }
    }
}
