def registry = 'https://whiteforce87.jfrog.io'
def frontendImageName = 'whiteforce87.jfrog.io/frontend-docker-local/frontend'
def version = '0.1.0'

pipeline {
    agent {
        node {
            label 'nodejs'
        }
    }
    stages {
        stage('Install Dependencies') {
            steps {
                echo "--------installing dependencies-------"
                sh 'npm install'
                echo "--------dependencies installed-------"
            }
        }
        stage('Build Frontend') {
            steps {
                echo "--------build started-------"
                sh 'npm run build'
                echo "--------build ended-------"
            }
        }
        stage("Frontend Publish") {
            steps {
                script {
                    echo '<--------------- Frontend Publish Started --------------->'
                    def server = Artifactory.newServer url: registry + "/artifactory", credentialsId: "jfrog_artifactory_credentials"
                    def properties = "buildid=${env.BUILD_ID},commitid=${GIT_COMMIT}"
                    def uploadSpec =  """{
                        "files": [
                            {
                                "pattern": "build/**/*",
                                "target": "frontend-npm-local/{1}",
                                "flat": "false",
                                "props" : "${properties}",
                                "exclusions": [ "*.sha1", "*.md5"]
                            }
                        ]
                    }"""
                    echo "Upload Spec: ${uploadSpec}"
                    try {
                        def buildInfo = server.upload spec: uploadSpec
                        echo "Artifacts uploaded successfully"
                        buildInfo.env.collect()
                        server.publishBuildInfo buildInfo
                        echo '<--------------- Frontend Publish Ended --------------->'
                    } catch (Exception e) {
                        echo "Failed to upload artifacts: ${e.message}"
                        throw e
                    }
                }
            }
        }
        stage("Docker Build Frontend") {
            steps {
                script {
                    echo '<--------------- Docker Build Started --------------->'
                    frontendApp = docker.build(frontendImageName + ":" + version)
                    echo '<--------------- Docker Build Ends --------------->'
                }
            }
        }
        stage("Docker Publish Frontend") {
            steps {
                script {
                    echo '<--------------- Docker Publish Started --------------->'
                    docker.withRegistry(registry, 'jfrog_artifactory_credentials') {
                        frontendApp.push()
                    }
                    echo '<--------------- Docker Publish Ended --------------->'
                }
            }
        }
        stage('Package Helm Chart for Frontend') {
            steps {
                echo 'Packaging Helm chart for frontend...'
                sh 'helm package frontend'
            }
        }
        
        stage('Deploy Frontend with Helm') {
            steps {
                echo 'Deploying frontend with Helm...'
                sh 'helm upgrade --install frontend frontend-0.1.0.tgz --set image.repository=${frontendImageName} --set image.tag=${version}'
            }
        }
    }
}