import express from "express";
import path from "path";
import { database } from "../db/conn";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/").get((req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// This section will help you get a list of all the records.
recordRoutes.route("/libraries").get((req: express.Request, res: express.Response) => {
  let db_connect = database;
  db_connect
    .collection("restaurants")
    .find({})
    .toArray((err: any, result: any) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
// recordRoutes.route("/record/:id").get((req: express.Request, res: express.Response) => {
//   let db_connect = database;
//   let myquery = { _id: ObjectId(req.params.id)};
//   db_connect
//     .collection("restaurants")
//     .findOne(myquery, (err: any, result: any) => {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you create a new record.
// recordRoutes.route("/record/add").post((req: express.Request, response: express.Response) => {
//   let db_connect = database;
//   let myobj = {
//     name: req.body.name,
//     position: req.body.position,
//     level: req.body.level,
//   };
//   db_connect.collection("records").insertOne(myobj, (err: any, res: any) => {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post((req: express.Request, response: express.Response) => {
//   let db_connect = database;
//   let myquery = { _id: ObjectId( req.params.id )};
//   let newvalues = {
//     $set: {
//       name: req.body.name,
//       position: req.body.position,
//       level: req.body.level,
//     },
//   }
// });

// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req: express.Request, response: express.Response) => {
//   let db_connect = database;
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect.collection("records").deleteOne(myquery, (err: any, obj: any) => {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

module.exports = recordRoutes;
