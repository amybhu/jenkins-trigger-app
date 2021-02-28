node {

    stage('Start'){
        checkout scm
    }
    stage('Docker Image Build & Push'){
        docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {

            def customImage = docker.build("amartyabhu/jenkins-trigger-web")

            /* Push the container to the custom Registry */
            customImage.push()
        }
    }
    stage('Deploy'){

        sh "ansible-playbook deploytohost.yml"
    }
    stage('Complete'){

        sh "echo 'Build Successful'"
    }
}
