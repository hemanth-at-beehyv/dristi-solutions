pipeline {
    agent any

    environment {
        YQ_BIN = "${env.WORKSPACE}/tools/yq"
        YAML_FILE = "build/build-config.yaml"
    }

    stages {
        stage('Download yq') {
            steps {
                sh '''
                    mkdir -p tools
                    curl -L https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -o tools/yq
                    chmod +x tools/yq
                '''
            }
        }

        stage('Check Missing Workdirs') {
            steps {
                sh '''
                    tools/yq eval -o=tsv '
                      .config[] | select(.build) |
                      .build[] | select(.workdir != null) |
                      .workdir
                    ' "$YAML_FILE" | while read -r workdir; do
                        if [ ! -d "$workdir" ]; then
                            echo "missing workdirectory: $workdir"
                        fi
                    done
                '''
            }
        }
    }
}
