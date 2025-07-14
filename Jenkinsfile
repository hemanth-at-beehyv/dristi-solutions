pipeline {
    agent any

    environment {
        YQ_BIN = "${env.WORKSPACE}/tools/yq"
        YAML_FILE = "build/build-config.yaml"
    }

    stages {
        stage('Download yq Locally') {
            steps {
                sh '''
                    mkdir -p tools
                    curl -L https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -o tools/yq
                    chmod +x tools/yq
                '''
            }
        }

        stage('Check Workdir Paths from YAML') {
            steps {
                sh '''
                    echo "== Extracting and Checking Workdir Paths =="

                    # Extract all workdirs into a temp file
                    tools/yq eval '.config[].build[].workdir' build/build-config.yaml > workdirs.txt

                    echo ""
                    echo "Checking if each workdir exists:"
                    while read workdir; do
                        if [ -d "$workdir" ]; then
                            echo "✅ Exists: $workdir"
                        else
                            echo "❌ MISSING: $workdir"
                        fi
                    done < workdirs.txt
                '''
            }
        }
    }
}
