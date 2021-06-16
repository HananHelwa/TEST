var http = require("http");
var Common = require('./Common');
var TimeCards = require('./TimeCards');
var config = require('config');

//get configs
var adminEmail = config.get('Brand.adminEmail');
var adminPassword = config.get('Brand.adminPassword');
var brandID = config.get('Brand.id');
var host = config.get('TimeCards.APIHostName');
var day = config.get('TimeCards.day');
var users = [41435,30453,39924,91553,43198,100921,118728];

var options = {
  "method": "PUT",
  "hostname": config.get('Environment.host'),
  "port": null,
  "path": config.get('Environment.loginAPI'),
  "headers": {
    "content-type": "application/json;charset=UTF-8",
  }
};


var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    if (res.statusCode == 200) {
      console.log("Admin logged in successfully");
      // display returned cookies in header
      var setcookie = res.headers["set-cookie"];
      console.log(setcookie);
      RequestAPI(setcookie);

    } else {
      console.log(body.toString());
    }

  });
});

req.write("{\"username\":\"" + adminEmail + "\",\"password\":\"" + adminPassword + "\"}");
req.end();

function RequestAPI(cookie) {
  var j = 0;
  for (var x = 0; x < users.length; x++) {
    for (var i = 1; i <= 4; i++) {
      j = i + 1;
      TimeCards.add(brandID,users[x], day, host, cookie, "2020-08-09T18:" + i + ":00.000Z", "2020-08-09T18:" + j + ":00.000Z");
    }
}


}
