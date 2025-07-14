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

        stage('Generate Pipelines from YAML') {
            steps {
                script {
                    def buildConfig = sh(
                        script: "${env.YQ_BIN} eval '.config' ${env.YAML_FILE}",
                        returnStdout: true
                    ).trim()

                    // Parse the number of configs
                    def configCount = sh(
                        script: "${env.YQ_BIN} eval '.config | length' ${env.YAML_FILE}",
                        returnStdout: true
                    ).trim().toInteger()

                    for (int i = 0; i < configCount; i++) {
                        def name = sh(
                            script: "${env.YQ_BIN} eval '.config[$i].name' ${env.YAML_FILE}",
                            returnStdout: true
                        ).trim().replaceAll('"', '')

                        def buildCount = sh(
                            script: "${env.YQ_BIN} eval \".config[$i].build | length\" ${env.YAML_FILE}",
                            returnStdout: true
                        ).trim().toInteger()

                        def folderPath = name.tokenize('/')[0..-2].join('/')
                        def jobName = name.tokenize('/').last()

                        // DSL script block
                        jobDsl scriptText: """
                            folder("${folderPath}") {
                                displayName("${folderPath.tokenize('/').last()}")
                                description("Auto-generated folder for ${folderPath}")
                            }

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
                                        type('PT_BRANCH')
                                        branch('origin/.*')
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
