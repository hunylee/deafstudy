MAC 설치방법
    brew update
    brew install mongodb

    mkdir -p /data/db
    mongod
    # dbpath 지정
    mongod --path <path>