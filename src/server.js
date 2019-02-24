const express = require('express');
const includeRouters = require('./routes/router');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
includeRouters(app, express);
const startServer = port => app.listen(port);
module.exports = startServer;
