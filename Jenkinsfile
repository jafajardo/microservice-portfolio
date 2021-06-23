
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
  agent { dockerfile true }
  stages {
    stage('Clone Git') {
      steps {
        git([url: 'https://github.com/jafajardo/microservice-portfolio.git', branch: 'master', credentialsId: 'github-public-credentials'])
      }
    }
    stage('Build and Deploy Auth Image') {
      steps{
        dockerImage = docker.build(authImageName, "./auth")
        docker.withRegistry( '', registryCredential ) {
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push('latest')
        }
      }
    }
    stage('Build and Deploy Client Image') {
      steps{
        dockerImage = docker.build(clientImageName, "./client")
        docker.withRegistry( '', registryCredential ) {
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push('latest')
        }
      }
    }
    stage('Build and Deploy Holding Image') {
      steps{
        dockerImage = docker.build(holdingImageName, "./holding")
        docker.withRegistry( '', registryCredential ) {
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push('latest')
        }
      }
    }
    stage('Build and Deploy Portfolio Image') {
      steps{
        dockerImage = docker.build(portfolioImageName, "./portfolio")
        docker.withRegistry( '', registryCredential ) {
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push('latest')
        }
      }
    }
    stage('Build and Deploy Share-stats Image') {
      steps{
        dockerImage = docker.build(shareStatsImageName, "./share-stats")
        docker.withRegistry( '', registryCredential ) {
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push('latest')
        }
      }
    }
    stage('Build and Deploy Trade Image') {
      steps{
        dockerImage = docker.build(tradeImageName, "./trade")
        docker.withRegistry( '', registryCredential ) {
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push('latest')
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