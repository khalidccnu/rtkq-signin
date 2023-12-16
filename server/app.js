require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("RTKQ is running...");
});

app.listen(port, () => {
  console.log(`RTKQ API is running on port: ${port}`);
});
