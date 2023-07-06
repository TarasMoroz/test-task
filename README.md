# test-task

1. Clone the repo
2. Set up ENV files:
   **.env**
    ```
    NODE_ENV=production
    MONGO_URI=mongodb://dbusername:dbpassword@mongodb:27017
    MONGO_DATABASE=dbname
    PORT=80
    JWT_SECRET=bfuXH8ZasSECRETRANDOMSTRING
    JWT_EXPIRATION_MINUTES=15
    RATE_LIMIT_TIME=15
    RATE_LIMIT_REQUEST=15
    ADMIN_PASS=initialadminpassword
    ADMIN_PEPPER=pepperpasswordhashingstring
    ```

   **mongodb.env**
    ```
    MONGO_INITDB_ROOT_USERNAME=dbusername
    MONGO_INITDB_ROOT_PASSWORD=dbpassword
    MONGO_INITDB_ROOT_DATABASE=dbname
    ```

    **development.env**
   same as .env with local chages
   PORT=8000
   NODE_ENV=development
   etc

4. Use **docker compose up** for startup
5. Use **docker compose down** for shut down container
6. Use **npm run test** for testing with NODE_ENV=development

## deployment

docker compose -f docker-compose.yml up -d

## postman public api collections

https://www.postman.com/kiddtips/workspace/test-task
