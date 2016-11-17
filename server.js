var express = require('express');
var app = express();
var newurl;
var urls={}; 

app.get('/new/*', function (req, res) {
    
//cutoff /new/ from the url
newurl = req.url.slice(5);

//is it a legit url?
var myregex = new RegExp("^(http|https)://", "i");
if(myregex.test(newurl)){
  console.log(true);

  //we need to add it to the urls json and tell them what the shorturl is
  //first get next available number
  var val=getnext();

  //add the number and url to urls
  urls[val]=newurl;
  //get the full url
  var host = req.protocol + '://' + req.get('host');
  console.log(host + '/' + val);  
  //show the host with the new shorturl
  var r={"passedUrl":newurl,"ShortUrl":(host + '/' + val)};
  res.send(r);   
  }
  else
  {
    //it was not a legit url
    console.log(false);
    var r={"error":"Invalid URL"};
    res.send(r);
  }

});

app.get('/:data', function (req, res) {
    //see if the url in the json of urls we been asked to redirect
    if(urls.hasOwnProperty(req.params.data)){
      //redirect it
      console.log(req.params.data);
      res.redirect(urls[req.params.data]);
    }
    else
    { 
      var r={"error":"Unknown request"}
      res.send(r);
    }
})

app.listen(8080);

function getnext(){
  var c=1000;
  while(urls.hasOwnProperty(c)===true){
       console.log(c + " " + urls.hasOwnProperty(c));
       c++;
  }
  return (c);
}