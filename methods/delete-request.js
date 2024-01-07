const writeToFile = require("../utll/write-to-file");
module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  if (baseUrl === "/data/names/" && regexV4.test(id)) {
    const index = req.names.findIndex((n) => {
      return n.id === id;
    });
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Not Found",
          message: "Name Not Found",
        })
      );
    } else {
      req.names.splice(index, 1);
      writeToFile(req.names);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end();
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
