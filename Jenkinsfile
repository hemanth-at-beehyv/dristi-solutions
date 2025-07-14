pipeline {
    agent any

    environment {
        YQ_BIN = "${env.WORKSPACE}/tools/yq"
        YAML_FILE = "${env.WORKSPACE}/build/build-config.yaml"
    }

    stages {
        stage('Download yq Locally') {
            steps {
                sh '''
                    mkdir -p tools
                    pwd
                    ls
                    curl -L https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -o "$YQ_BIN"
                    chmod +x "$YQ_BIN"
                '''
            }
        }

        stage('Show Parsed YAML Fields') {
            steps {
                echo "Reading build definitions from YAML..."
                sh '''
                    echo "== Full Parsed YAML =="
                    "$YQ_BIN" eval '.' "$YAML_FILE"

                    echo ""
                    echo "== Flattened Build Fields =="
                    "$YQ_BIN" eval '.config[].build[] | to_entries[] | "\\(.key): \\(.value)"' "$YAML_FILE"
                '''
            }
        }
    }
}
