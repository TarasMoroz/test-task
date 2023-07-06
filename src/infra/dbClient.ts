import { connect } from "http2";

const { MongoClient, ObjectId } = require('mongodb'); 

const connectString = process.env.MONGO_URI || false; // mongodb://localhost:27017 // mongodb://localhost:27017/
const databaseName  = process.env.MONGO_DATABASE || false; // testapi

let dbConnection : any;


export const dbInstance = {
    client  : async () => {

        const client = new MongoClient(connectString, { monitorCommands: true });
        dbConnection = client.db(databaseName);
        console.log(`connected to: ${connectString}`);
        console.log(`selected db: ${databaseName}`);
        // client.on('commandStarted', (started: any) => console.log(started));

        return dbConnection;
    }
}

async function main() {

    const client = new MongoClient(connectString);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await listDatabases(client);
        await listTestCollections(client); 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client : typeof MongoClient){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach((db:any) => console.log(` - ${db.name}`));
};

async function listTestCollections(client: typeof MongoClient){
    let testCollections = await client.db(databaseName).listCollections().toArray();

    let testUsersList = await client.db(databaseName).collection('users').find().toArray();
    let testUsersCount = await client.db(databaseName).collection('users').count();

    let testAdminList = await client.db(databaseName).collection('admin').find().toArray();
    let testAdminCount = await client.db(databaseName).collection('admin').count();  

    console.log(`List of ${databaseName} collections : `);
    console.log(testCollections);

    console.log(`List of users : `);
    console.log(testUsersCount);
    console.log(testUsersList);
    
    console.log(`List of admin : `);
    console.log(testAdminCount);
    console.log(testAdminList);

}

// main().catch(console.error);