var express = require('express')
var app = express();
var request = require('request');

//xml parser : xml2js

var parser = require('xml2js');

function weather (callback) {
        request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
            parser.parseString(body, function (err, jsonData) {
                console.log(body);
                console.log(jsonData);
                callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
            })
        });
}
app.get('/weather', function (req, res) {
    weather(function(data) {
        res.send(data);
    })
});

app.get('/', function (req, res) {
    request('http://www.naver.com', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage. 
    });
})
app.get('/home', function (req, res) {
    res.send('Home');
})
app.get('/about', function (req, res) {
    res.send('About');
})

app.listen(3000)