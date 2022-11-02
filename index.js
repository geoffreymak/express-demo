const express = require("express");
const app = express();
const users = require("./users.json");

const daysAccess = (req, res, next) => {
  const date = new Date();
  const today = date.getDay();

  const nextDay = new Date(date);

  const todayDate = nextDay.getDate();
  const addDate = date.getTime();

  const findDate = 7 - todayDate;

  nextDay.setDate(date.getDate() + findDate);

  if (today === 1) next();
  return res.status(403).send(`Revenez le lundi prochain + ${nextDay}`);
};

app.get("/users", daysAccess, (req, res) => {
  res.send("users");
  res.status(404);
});
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  res.status(200).json(user);
});

app.listen(5000, () => {
  console.log("le serveur a démarré ");
});
