// This file is in charge of database connection

const mongoose = require("mongoose");

function connect() {
  let connectionString = `mongodb+srv://todo_2021:mycoolpassword@cluster0.kld2t.mongodb.net/todo_2021?retryWrites=true&w=majority`;

  console.log("connecting to db...");

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log("There was an error connection to mongo: ", err);
    });
}

function onConnect(callback) {
  mongoose.connection.once("open", callback);
}

module.exports = {
  connect,
  onConnect,
};
