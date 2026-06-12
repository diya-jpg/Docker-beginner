verison:'3' 
services:
    mongodb:
        image:mongo
        ports:
        - 27017:27017
        environment:
        -MONGO_INITDB_ROOT_USERNAME=dee
        -MONGO_INITDB_ROOT_PASSWORD=1234
    mongo-express:
        image:mongo-express
        ports:
        - 8080:8081
        environment:
        -ME_CONFIG_MONGODB_ADMINUSERNAME=dee
        -ME_CONFIG_MONGODB_ADMINPASSWORD=1234
        -ME_CONFIG_MONGODB_SERVER=mongodb