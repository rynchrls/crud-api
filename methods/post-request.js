const requestBodyparser = require("../utll/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utll/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/data/names") {
    try {
      let body = await requestBodyparser(req);
      body.id = crypto.randomUUID();
      req.names.push(body);
      writeToFile(req.names);
      res.writeHead(201, { "Content-type": "application/json" });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Bad Request!",
          message: "Request Not Found",
        })
      );
    }
  } else {
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
};
