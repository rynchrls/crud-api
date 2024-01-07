const http = require("http");

//the api call
let names = require("./data/names.json");

//methods
const postReq = require("./methods/post-request");
const getReq = require("./methods/get-request");
const deleteReq = require("./methods/delete-request");
const putReq = require("./methods/put-request");

//port
const PORT = process.env.PORT || 5001;

// main server
const server = http.createServer((req, res) => {
  req.names = names;

  // methods crud api call
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "Route Not Found",
        })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`The server listen to port: ${PORT}`);
});
