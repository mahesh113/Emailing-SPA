let express = require('express');
var app = express();

app.use(express.static(__dirname + '/View'));
var bodyParser = require('body-parser');

const api_key = 'key-96139b2b17a6ff763cf44a96f7e59ed5';
const domain = 'sandboxf4ff2b4f746940e7a56be1226eef1700.mailgun.org';//'https://api.mailgun.net/v3/sandboxf4ff2b4f746940e7a56be1226eef1700.mailgun.org/messages';
const Mailgun = require('mailgun-js');//({apiKey: api_key, domain: domain});

app.use(bodyParser.json());

app.get('/',function(req,res){
	console.log('Checkpoint0');
	
});

app.all('/mail',function(req,res){
	// console.log('to: '+req.body.to);
	// console.log('msg: '+req.body.from);
	var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var data = {
      from: 'postmaster@sandboxf4ff2b4f746940e7a56be1226eef1700.mailgun.org',
      to: req.body.to,
      subject: req.body.msg,
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }

    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
           res.writeHead(404,{'Content-Type':'text/html','reason':'NOT SURE'});
            console.log("got an error: ", err);
        }

        else {
           res.writeHead(200,{'Content-Type':'application/json'});
            console.log(body);
        }
    });

});

app.listen(3000,function(){
	console.log('listening to port 3000...') 
});
// var data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'mahesh.verma1983@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// };

// mailgun.messages().send(data, function (error, body) {
//   console.log(body);
//   res.send('Mail Sent' + body)
// });
