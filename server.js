var express = require('express');
var moment = require('moment'); //date parsing
var path = require('path');
var app = express();

function toUnix(time){
  //if(parseInt(time) < 0) return inValid();
  return JSON.stringify({
            unix : moment(time, 'X', true).unix(),
            natural: moment(time, 'X', true).format('MMMM DD, YYYY')
        });
}
function toNatural(time){
  return JSON.stringify({
            unix : moment(time, 'MMMM DD, YYYY', true).unix(),
            natural: moment(time, 'MMMM DD, YYYY', true).format('MMMM DD, YYYY')
        });
}

function inValid(){
  return JSON.stringify({
            unix : null,
            natural: null
        });
}

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:time', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  if(moment(req.params.time ,'MMMM DD, YYYY', true).isValid()){
    res.end(toNatural(req.params.time));
  }
  else if(moment(req.params.time, 'X', true).isValid()){
    res.end(toUnix(req.params.time));
  } 
  else {
    res.end(inValid());
  }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Timestamp app listening on port 8080!');
})