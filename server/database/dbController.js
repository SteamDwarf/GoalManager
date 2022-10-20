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

const getItem = (collectionName, query) => {
    if(!database) throw new Error("Server error");

    const collection = database.collection(collectionName);
    
    return collection.findOne(query);
}

const createItem = (collectionName, item) => {
    if(!database) throw new Error("Server error");

    const collection = database.collection(collectionName);
    
    return collection.insertOne(item);
}

const changeItem = (collectionName, query, newData) => {
    if(!database) throw new Error("Server error");

    const collection = database.collection(collectionName);
    
    return collection.updateOne(query, {$set: newData});
}

module.exports = {connectDBClient, getItems, getItem, createItem, changeItem};