
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

app.use( "/jobs", require("./routes/jobs.routes") );

app.use(require("./middleware/error-handler.middleware"));

app.listen(3000, function serverIsWorking() {
  console.log("This should be running");
});
