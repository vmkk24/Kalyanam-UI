pipeline {
   agent any
	stages {
      stage('SCM Checkout') {
         steps {
            git 'https://github.com/vmkk24/Kalyanam-UI.git'
		}
	}
	stage('Build') {
		steps {
			sh '''
			npm install
			ng build --base-href=/matrimony/                      
			'''
		}
	}
	stage ('Deploy') {
		steps {
			sh '''
             cp -r $WORKSPACE/dist/matrimony /opt/apache-tomcat-9.0.30/webapps
             curl -u admin:admin http://13.233.50.211:8888/manager/reload?path=/build 
             '''
		}
	}
}
}
