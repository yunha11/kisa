var http = require('http');
var convert = require('xml-js');
var parser = require('xml2js');
var request = require('request');

var option = {
    'hostname': 'www.weather.go.kr',
    'path': '/weather/forecast/mid-term-rss3.jsp?stnld=109'
}

function current(callback) {
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
        parser.parseString(body, function (err, jsonData) {
            console.log(body);
            console.log(jsonData);
            callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
        })
    });
}

exports.current = current;

