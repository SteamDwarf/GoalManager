const { query } = require("express");
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
    if(!database) throw new Error("Server error");

    const collection = database.collection(collectionName);
    
    return collection.find(query);
}

const createItem = (collectionName, item) => {
    if(!database) throw new Error("Server error");

    const collection = database.collection(collectionName);
    
    return collection.insertOne(item);
}

const changeItem = (collectionName, newItemData) => {
    if(!database) throw new Error("Server error");

    const collection = database.collection(collectionName);
    
    return collection.insertOne(item);
}

module.exports = {connectDBClient, getItems, createItem};