const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.json({ user: "Mike Taylor", level: "admin" });
});

app.listen(5000, () => {
  console.log("Server running on localhost:5000...");
});
