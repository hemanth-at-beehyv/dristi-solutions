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

                    # Extract name + workdir pairs as tab-separated lines
                    tools/yq eval -o=tsv '.config[] | select(.build) | .name as $name | .build[] | select(.workdir != null) | [$name, .workdir] | @tsv' build/build-config.yaml > workdirs.tsv

                    echo ""
                    echo "Checking if each workdir exists:"
                    while IFS=$'\\t' read -r name workdir; do
                        if [ -d "$workdir" ]; then
                            echo "[$name] Exists: $workdir"
                        else
                            echo "❌ [$name] MISSING: $workdir"
                        fi
                    done < workdirs.tsv
                '''
            }
        }
    }
}
