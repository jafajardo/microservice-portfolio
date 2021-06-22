
pipeline {
  environment {
    authImageName = "josephfajardo/auth"
    clientImageName = "josephfajardo/client"
    holdingImageName = "josephfajardo/holding"
    portfolioImageName = "josephfajardo/portfolio"
    shareStatsImageName = "josephfajardo/share-stats"
    tradeImageName = "josephfajardo/trade"
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
    stage('Building auth image') {
      steps{
        script {
          dockerImage = docker.build(authImageName, "./auth")
        }
      }
    }
    stage('Deploy auth image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Building client image') {
      steps{
        script {
          dockerImage = docker.build(clientImageName, "./client")
        }
      }
    }
    stage('Deploy client image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Building holding image') {
      steps{
        script {
          dockerImage = docker.build(holdingImageName, "./holding")
        }
      }
    }
    stage('Deploy holding image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Building portfolio image') {
      steps{
        script {
          dockerImage = docker.build(portfolioImageName, "./portfolio")
        }
      }
    }
    stage('Deploy portfolio image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Building share-stats image') {
      steps{
        script {
          dockerImage = docker.build(shareStatsImageName, "./share-stats")
        }
      }
    }
    stage('Deploy share-stats image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Building trade image') {
      steps{
        script {
          dockerImage = docker.build(tradeImageName, "./trade")
        }
      }
    }
    stage('Deploy trade image') {
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
        
        sh "docker rmi $authImageName:${env.BUILD_NUMBER}"
        sh "docker rmi $authImageName:latest"

        sh "docker rmi $clientImageName:${env.BUILD_NUMBER}"
        sh "docker rmi $clientImageName:latest"

        sh "docker rmi $holdingImageName:${env.BUILD_NUMBER}"
        sh "docker rmi $holdingImageName:latest"

        sh "docker rmi $portfolioImageName:${env.BUILD_NUMBER}"
        sh "docker rmi $portfolioImageName:latest"

        sh "docker rmi $shareStatsImageName:${env.BUILD_NUMBER}"
        sh "docker rmi $shareStatsImageName:latest"

        sh "docker rmi $tradeImageName:${env.BUILD_NUMBER}"
        sh "docker rmi $tradeImageName:latest"
      }
    }
  }
}