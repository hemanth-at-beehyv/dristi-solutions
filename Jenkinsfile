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

        stage('Validate Workdirs from YAML') {
            steps {
                sh '''
                    echo "Checking each workdir path from YAML"

                    tools/yq eval -o=tsv '
                    .config[] | select(.build) |
                    .name as $name |
                    .build[] | select(.workdir != null) |
                    [$name, .workdir] | @tsv
                    ' "$YAML_FILE" | while IFS=$'\\t' read -r name workdir; do
                        if [ -z "$workdir" ]; then
                            echo "[${name}] Skipped: empty workdir"
                            continue
                        fi

                        if [ -d "$workdir" ]; then
                            echo "[${name}] Exists: ${workdir}"
                        else
                            echo "[${name}] Missing: ${workdir}"
                        fi
                    done
                '''
            }
        }
    }
}
