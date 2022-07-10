import * as MongoDB from "mongodb";

//const { MongoClient } = require("mongodb");
// const Db = (process.env.ATLAS_URI) as string;
// const client: MongoDB.MongoClient = new MongoDB.MongoClient((process.env.ATLAS_URI) as string);
// var _db: MongoDB.Db;

// module.exports = {
//   connectToServer: (callback: Function) => {
//     client.connect((err: any, db: any) => {
//       // Verify we got a good "db" object
//       if (db) {
//         _db = db.db("cluster0");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//     });
//   },

//   getDatabase: () => { return _db; }
// };

export let database: MongoDB.Db;

export async function connectToDatabase() {
  const client: MongoDB.MongoClient = new MongoDB.MongoClient((process.env.ATLAS_URI) as string);
  await client.connect();
  database = client.db(process.env.DB_NAME);
  const librariesCollection: MongoDB.Collection = database.collection("restaurants");
  console.log(`Successfully connected to database "${database.databaseName}" and collection "${librariesCollection.collectionName}".`);
}
