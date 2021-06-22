
pipeline {
  environment {
    authImagename = "josephfajardo/auth"
    registryCredential = 'dockerhub-credentials'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git([url: 'https://github.com/jafajardo/microservice-portfolio.git', branch: 'master', credentialsId: 'github-public-credentials'])
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build(authImagename, "./auth")
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')

          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $authImagename:${env.BUILD_NUMBER}"
         sh "docker rmi $authImagename:latest"

      }
    }
  }
}