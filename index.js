// This file is in charge of starting the application

const server = require("./server");
const persist = require("./persist");

// define a port
const port = process.argv[2] || process.env.PORT || 8080;

// connect to the database
persist.connect();

// once db is connected
persist.onConnect(() => {
  // start the server
  /*
  server.fileManager.openLogFile();
  server.syncLogAndDB();
  */

  server.app.listen(port, () => {
    console.log(`Server Running on :${port}`);
  });
});
