MAC 설치방법
    brew update
    brew install mongodb

    mkdir -p /data/db
    mongod
    # dbpath 지정
    mongod --path <path>

    참조링크 : https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/