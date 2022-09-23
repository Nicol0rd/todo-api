const express = require("express");
const app = express();
const {get} = require("lodash")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./src/controller/todo"));

//MongoDB 
const URL = get(process.env, "DATABASE_URL", "mongodb://localhost:27017/");
const DATABASE = get(process.env, "DATABASE_NAME", "collabera_api");
const PORT = get(process.env, "PORT", 3000);
const connectionString = `${URL}${DATABASE}`

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


mongoose.connect( connectionString, connectionOptions);

app.listen(PORT, () => {
  console.log(`TODO API running on port ${PORT}`)
})