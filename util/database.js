const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://illya:TsGWNUfGen2J5URy@cluster0.pm5q9.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("---------database.js   Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("---------database.js", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No DAtaBase";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
