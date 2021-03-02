const express = require("express");
const app = express();
const path = require("path");
const { projects } = require("./data.json");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res, next) => {
  res.render("index", { projects });
});

// About route
app.get("/about", (req, res, next) => {
  res.render("about");
});

// Specific project route
app.get("/projects/:id", (req, res, next) => {
  const project = projects.find((project) => project.id == req.params.id);
  res.render("project", { project });
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  res.status(err.status).render("page-not-found", { err });
});

// Custom error handler
app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  if (!err.message) err.message = "Something went wrong!";
  res.status(err.status).render("error", { err });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
