const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res) => {
  res.send('hello')
});

mongoose.connect("mongodb://localhost:27017/wikiApi", {useNewUrlParser: true});

const articleSchema = mongoose.Schema ({
  title: String,
  name: String

});

const Article = mongoose.model('person',articleSchema);

app.listen(3000,() => {
  console.log('listeinig on 3000')
})