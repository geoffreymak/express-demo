const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let users = require("./users.json");

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.status(200).json(users);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.map((user) =>
    user.id === id
      ? { ...user, name: req.body.name, email: req.body.email }
      : user
  );
  res.status(200).json(users.find((user) => user.id === id));
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let user = users.find((user) => user.id === id);
  users.splice(users.indexOf(user), 1);
  res.status(200).json(users);
});

app.listen(5000, () => {
  console.log("Serveur à l'écoute dans => http://localhost:5000/");
});
