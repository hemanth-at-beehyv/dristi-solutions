pipeline {
    agent any

    environment {
        YQ_BIN = "${env.WORKSPACE}/tools/yq"
        YAML_FILE = "build/build-config.yaml"
    }

    stages {
        stage('Setup: Download yq') {
            steps {
                sh '''
                    mkdir -p tools
                    curl -L https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -o tools/yq
                    chmod +x tools/yq
                '''
            }
        }
        stage('Create Folders') {
            steps {
                script {
                    def rawNames = sh(
                        script: "${YQ_BIN} eval '.config[].name' ${YAML_FILE}",
                        returnStdout: true
                    ).trim().split("\n")

                    Set<String> createdFolders = new HashSet<>()

                    rawNames.each { fullPath ->
                        def parts = fullPath.replaceAll('"', '').tokenize('/')
                        for (int i = 1; i < parts.size(); i++) {
                            def folderPath = parts[0..i - 1].join('/')
                            if (!createdFolders.contains(folderPath)) {
                                echo "Creating folder: ${folderPath}"
                                jobDsl scriptText: """
                                    folder("${folderPath}") {
                                        displayName("${folderPath.tokenize('/').last()}")
                                        description("Auto-generated folder for ${folderPath}")
                                    }
                                """
                                createdFolders.add(folderPath)
                            }
                        }
                    }
                }
            }
        }

        stage('Generate Pipelines from YAML') {
            steps {
                script {
                    def configCount = sh(
                        script: "${YQ_BIN} eval '.config | length' ${YAML_FILE}",
                        returnStdout: true
                    ).trim().toInteger()

                    for (int i = 0; i < configCount; i++) {
                        def name = sh(
                            script: "${YQ_BIN} eval '.config[$i].name' ${YAML_FILE}",
                            returnStdout: true
                        ).trim().replaceAll('"', '')

                        def folderPath = name.tokenize('/')[0..-2].join('/')

                        echo "Creating pipeline for ${name}"

                        jobDsl scriptText: """
                            pipelineJob("${name}") {
                                definition {
                                    cpsScm {
                                        scm {
                                            git {
                                                remote {
                                                    url("https://github.com/hemanth-at-beehyv/backend.git")
                                                }
                                                branch("*/develop")
                                            }
                                        }
                                        scriptPath("Jenkinsfile.build-service")
                                    }
                                }
                                parameters {
                                    gitParameter {
                                        name('GIT_BRANCH')
                                        description('Select branch to build')
                                        type('PT_BRANCH')
                                        defaultValue('develop')
                                        branchFilter('origin/.*')
                                        tagFilter('*')
                                        sortMode('DESCENDING_SMART')
                                        selectedValue('DEFAULT')
                                        quickFilterEnabled(true)
                                        useRepository('backend')
                                    }
                                    stringParam("CONFIG_NAME", "${name}", "Matches name in build-config.yaml")
                                }
                            }
                        """
                    }
                }
            }
        }
    }
}
