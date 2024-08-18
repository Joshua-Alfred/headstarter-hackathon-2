pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Check out the code from the Git repository
                git branch: 'main', url: 'https://github.com/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your tests (if any)
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Build your app (if needed)
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the app to Render
                // You can use Render's API or CLI for deployment
                sh '''
                curl -X POST https://api.render.com/v1/services/YOUR_SERVICE_ID/deploys \
                -H "Authorization: Bearer YOUR_API_KEY" \
                -d '{"clearCache": false}'
                '''
            }
        }
    }
}
