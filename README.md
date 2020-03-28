# IoT UCO - BackEnd

## Steps to run Api Rest

1. Tnstall packeges:

    ``npm install``

2. Edit file config/_config.js

3. Run server:

    ```npm start```

    Note: If you have problems with sequelize when it create the tables, uncomment ``sequelize.sync({force:true})`` in databases/conection_psql.js, run the script, and then comment again.