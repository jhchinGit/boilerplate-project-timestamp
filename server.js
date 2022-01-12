// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

app.get("/api/", function (req, res) {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:dateTime", function (req, res) {
  if (isNumeric(req.params.dateTime)) {
    res.json({
      unix: new Date(Number(req.params.dateTime)).getTime(),
      utc: new Date(Number(req.params.dateTime)).toUTCString(),
    });
  } else {
    const date = new Date(req.params.dateTime);

    if (date.toUTCString() === "Invalid Date") {
      res.json({
        error: "Invalid Date",
      });
    }
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
