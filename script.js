function generateTemplate() {
    const tech = document.getElementById("tech").value;
    const pipeline = document.getElementById("pipeline").value;
    let output = "";

    if (pipeline === "Dockerfile") {
        if (tech === "Node.js") {
            output = `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]`;
        } else {
            output = `FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]`;
        }
    } else if (pipeline === "Jenkinsfile") {
        output = `pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t app .'
            }
        }
    }
}`;
    } else if (pipeline === "GitHub Actions") {
        output = `name: CI Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app .`;
    }

    document.getElementById("output").textContent = output;
}
