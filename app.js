const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/wikiDb", {useNewUrlParser: true});

app.get('/articles',(req,res) => {
  Article.find(function(err,foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

const articleSchema = mongoose.Schema ({
  title: String,  
  content: String

});

const Article = mongoose.model('article',articleSchema);

app.listen(3000,() => {
  console.log('listeinig on 3000')
})