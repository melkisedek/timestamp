var express = require('express');
var moment = require('moment'); //date parsing
var app = express();

function toUnix(time){
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

app.get('/:time', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  if(moment(req.params.time ,'MMMM DD, YYYY', true).isValid()){
    res.send(toNatural(req.params.time));
  }
  else if(moment(req.params.time, 'X', true).isValid()){
    res.send(toUnix(req.params.time));
  } 
  else {
    res.send(JSON.stringify({
            unix : null,
            natural: null
        }));
  }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Timestamp app listening on port 8080!');
})