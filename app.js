const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/newDb", { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("article", articleSchema);

//////////// Request for all articles //////////////
app
  .route("/articles")

  .get((req, res) => {
    Article.find(function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.json(err);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save(function (err) {
      console.log(err);
    });
  })
  .delete((req, res) => {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("deleted all data");
      } else {
        res.send("error while deleting");
      }
    });
  });

//////////// Request for one article //////////////
app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne(
      { title: req.params.articleTitle },
      function (err, foundArticles) {
        if (foundArticles) {
          res.send(foundArticles);
        } else {
          res.send("No articles were found regarding the title");
        }
      }
    );
  })
  .put((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("successfully updated article");
        } else {
          res.send("error updating the db");
        }
      }
    );
  })
  .patch((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("successfully updated article");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, function (err) {
      if (!err) {
        res.send("successfully deleted");
      } else {
        res.send("error while deleting");
      }
    });
  });

app.listen(3000, () => {
  console.log("listeinig on 3000");
});
