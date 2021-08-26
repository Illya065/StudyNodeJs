const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

const app = express();

// app.set('view engine', 'ejs');
app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61263317dd835c45195e6d83")
    .then((user) => {
      req.user = new User(user.username, user.emai, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose
  .connect(
    "mongodb+srv://illya:TsGWNUfGen2J5URy@cluster0.pm5q9.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
