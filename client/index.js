const express = require("express");
var path = require('path');

const app = express();
const port = 3000;

// config
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/client", function (req, res) {
  res.render("client");
});
