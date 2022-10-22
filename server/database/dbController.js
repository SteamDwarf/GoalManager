const {MongoClient} = require("mongodb");

const client = new MongoClient(process.env.DB_URI);
let database = undefined;

const connectDBClient = (successFunc) => {
    client.connect()
    .then(connection => {
        console.log(`Successfully connected to database on ${connection.options.hosts}`);
        database = client.db("goals_project");
        successFunc();
    })
    .catch(error => {
        console.error(error);
    });
}

const getItems = (collectionName, query) => {
    const collection = database.collection(collectionName);

    return collection.find(query);
}

const getItem = (collectionName, query) => {
    const collection = database.collection(collectionName);
    
    return collection.findOne(query);
}

const createItem = (collectionName, item) => {
    const collection = database.collection(collectionName);
    
    return collection.insertOne(item);
}

const changeItem = (collectionName, query, newData) => {
    const collection = database.collection(collectionName);
    
    return collection.updateOne(query, {$set: newData});
}

const deleteItem = (collectionName, query) => {
    const collection = database.collection(collectionName);
    
    return collection.deleteOne(query);
}

module.exports = {connectDBClient, getItems, getItem, createItem, changeItem, deleteItem};