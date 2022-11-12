const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//middleware
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/newDb", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema ({
  title: String,  
  content: String

});

const Article = mongoose.model('article',articleSchema);

app.get('/articles',(req,res) => {
  Article.find(function(err,foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.json(err);
    }
  });
});

app.post("/articles", (req,res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save(function(err) {
    console.log(err);
  })
})

app.delete('/articles',(req,res) => {
  Article.deleteMany(function(err) {
    if(!err) {
      res.send("deleted all data")
    }
    else {
      res.send("error while deleting")
    }
  })
})

app.listen(3000,() => {
  console.log('listeinig on 3000')
})