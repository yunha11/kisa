var express = require('express')
var app = express();
var request = require('request');
var path = require('path');
//xml parser : xml2js
var parser = require('xml2js');
//body parser 
var cors = require('cors');
var bodyParser = require('body-parser')

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootpwd135!',
  database : 'kisapay'
});
 
connection.connect();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors());
//ejs
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//public폴더 내용 공개
app.use(express.static('public'));

function weather (callback) {
        request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
            parser.parseString(body, function (err, jsonData) {
                console.log(body);
                console.log(jsonData);
                callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
            })
        });
}

app.get('/sampleDesign', function(req,res) {
    res.render('designSample')
})
app.get('/sampleDesign2', function(req,res) {
    res.render('designSample2')
})
app.get('/sampleDesign3', function(req, res) {
    res.render('designSample3')
})
//브라우저는 get으로 랜더링 한것만 접속가능
app.get('/weather', function (req, res) {
    weather(function(data) {
        res.send(data);
    })
});

app.get('/join', function(req,res){
    res.render('join')
})
app.post('/join', function (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    var password = req.body.password;

    console.log("시작"); 

    connection.query('INSERT INTO kisapay.user (userid, username, userpassword) VALUES (?,?,?)',[id, name, password],
         function (error, results, fields) {
        if (error) { throw error; }
        else {
            console.log(results);
            res.json(1);
        }
      });
//   console.log(name, id, password);

   //클라이언트에 보여지는 내용 
   res.json(name + " " + id + " " + password);
})

app.get('/', function (req, res) { 
    request('https://openapi.open-platform.or.kr/account/balance', function (error, response, body) {
        console.log('body:', body); // Print the HTML for the Google homepage. 
        var balance = body.balance_amt;
        console.log(balance);
        res.send(body);
    });
})
app.get('/home', function (req, res) {
    res.send('Home');
})
app.get('/about', function (req, res) {
    res.send('About');
})

app.listen(3000)