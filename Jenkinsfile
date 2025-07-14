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

        stage('Generate Folder + Pipeline DSL') {
            steps {
                script {
                    def rawNames = sh(
                        script: "${YQ_BIN} eval '.config[].name' ${YAML_FILE}",
                        returnStdout: true
                    ).trim().split("\n")

                    Set<String> allFolders = new LinkedHashSet<>() // maintain order
                    String allDsl = ""

                    // STEP 1: Build folder paths top-down
                    rawNames.each { fullPath ->
                        def parts = fullPath.replaceAll('"', '').tokenize('/')
                        for (int i = 1; i <= parts.size() - 1; i++) {
                            def folderPath = parts[0..i - 1].join('/')
                            allFolders << folderPath
                        }
                    }

                    // STEP 2: Create folder DSL blocks
                    allFolders.each { folderPath ->
                        def display = folderPath.tokenize('/').last()
                        allDsl += """
folder("${folderPath}") {
    displayName("${display}")
    description("Auto-generated folder for ${folderPath}")
}
"""
                    }

                    // STEP 3: Create pipeline jobs
                    def configCount = sh(
                        script: "${YQ_BIN} eval '.config | length' ${YAML_FILE}",
                        returnStdout: true
                    ).trim().toInteger()

                    for (int i = 0; i < configCount; i++) {
                        def name = sh(
                            script: "${YQ_BIN} eval '.config[$i].name' ${YAML_FILE}",
                            returnStdout: true
                        ).trim().replaceAll('"', '')

                        def repo = sh(
                            script: "${YQ_BIN} eval '.config[$i].repo // \"https://github.com/hemanth-at-beehyv/dristi-solutions.git\"' ${YAML_FILE}",
                            returnStdout: true
                        ).trim().replaceAll('"', '')

                        def branch = sh(
                            script: "${YQ_BIN} eval '.config[$i].branch // \"develop\"' ${YAML_FILE}",
                            returnStdout: true
                        ).trim().replaceAll('"', '')

                        allDsl += """
pipelineJob("${name}") {
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url("${repo}")
                    }
                    branch("*/${branch}")
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
            defaultValue('${branch}')
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

                    // STEP 4: Apply all folders + jobs in a single DSL run
                    jobDsl scriptText: allDsl
                }
            }
        }
    }
}
