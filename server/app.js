
const express = require("express");
const bodyParser = require("body-parser");

require('./database-setup');

let app = express();

app.use(express.static(__dirname + "/../client/public/"));

app.use(bodyParser.json());

app.use( "/api/jobs", require("./routes/jobs.routes") );

app.use(require("./middleware/error-handler.middleware"));

app.listen(3000, function serverIsWorking() {
  console.log("This should be running");
});
