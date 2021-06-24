"use strict";

const fs = require("fs");

var data = [
  {
    name: "it did not work",
  },
];

function openLogFile() {
  console.log("running openLogFile");
  data = JSON.parse(
    fs.readFileSync("./log.json", { encoding: "utf8", flag: "r" })
  );
  console.log("read log data:", data);
}

function logTodoCreate(id) {
  data.forEach((todo) => {
    if (todo._id === id) {
      return;
    }
  });
  var newTodo = {
    _id: incomingTodo._id,
    read: 0,
    updated: 0,
  };
  console.log("creating todo:", newTodo);
  data.push(newTodo);
  updateLogFile();
}

function logTodoRead(id) {
  data.forEach((todo) => {
    if (todo._id === id) {
      data[todo].read++;
      updateLogFile();
      return;
    }
  });
}

function logAllRead() {
  data.forEach((todo) => {
    todo.read++;
  });
  updateLogFile();
}

function logTodoUpdate(id) {
  data.forEach((todo) => {
    if (todo._id === id) {
      data[todo].updated++;
      updateLogFile();
      return;
    }
  });
}

function logTodoDeleted(id) {
  data.forEach((todo) => {
    if (todo._id === id) {
      data[todo] = undefined;
      updateLogFile();
      return;
    }
  });
}

function updateLogFile() {
  fs.writeFile("./log.json", JSON.stringify(data), { flag: "w+" }, (err) => {
    console.log("Writing the following to the file\n:", data);
  });
  //file written successfully
}

module.exports = {
  data,
  updateLogFile,
  openLogFile,
  logTodoCreate,
  logTodoDeleted,
  logTodoRead,
  logTodoUpdate,
  logAllRead,
};
