const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`);
});
