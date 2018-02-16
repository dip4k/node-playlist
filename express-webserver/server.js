const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 3000;

// middleware

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const timeStamp = new Date().toString();
  const log = `${timeStamp} : ${req.method}  ${req.url}`;
  fs.appendFile("server.log", `${log}\n`, err => {
    if (err) {
      console.log("unable to write in server.log file.");
    }
  });
  console.log(log);
  next();
});

app.use((req, res, next) => {
  res.render("coming-soon");
});

app.use(express.static(path.resolve(`${__dirname}/public`)));

// helpers

hbs.registerHelper("getYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  // console.log("Hello from express...!");
  // res.send({ name: "dipak", likes: ["gaming", "treking"] });

  res.render("home", {
    title: "Home Page",
    user: "Dipak ^_^"
  });
});

app.get("/about", (req, res) => {
  // res.send("This is about page...");

  res.render("about", {
    title: "About page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMsg: "404 error occured.." });
});

app.listen(port, () => {
  console.log(`Server running on port ${port} .`);
});
