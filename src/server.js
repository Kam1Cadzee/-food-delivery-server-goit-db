const express = require("express");
const includeRouters = require("./routes/router");
const bodyParser = require("body-parser");
const connectToDB = require("./db/connect-db");
const app = express();

const login = "Kam1Cadze";
const password = "1596VADIMszx9B";

app.use(bodyParser.urlencoded({ extended: false }));
includeRouters(app, express);


const startServer = port => {
  connectToDB(`mongodb+srv://${login}:${password}@cluster0-h5z9a.gcp.mongodb.net/mydb?retryWrites=true`)
    .then(() => {
      console.log("Database connection successful");
          app.listen(port);
    })
    .catch(err => {
      console.error("Database connection error");
      throw err;
    });
};
module.exports = startServer;
