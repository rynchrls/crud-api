module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  if (req.url === "/data/names") {
    console.log(baseUrl);
    res.statuscode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.names));
    res.end();
  } else if (baseUrl === "/data/names/" && regexV4.test(id)) {
    let filteredNames = req.names.filter((n) => {
      return n.id === id;
    });
    if (filteredNames.length > 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(filteredNames));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Not Found",
          message: " Name Not Found",
        })
      );
    }
  } else if ( baseUrl === '/data/names/' && !regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed!",
        message: "UUID is not valid",
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: " Route Not Found",
      })
    );
  }
};
