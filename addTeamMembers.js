var http = require("http");
var Common = require('./Common');
var TeamMembers = require('./TeamMembers');
var config = require('config');

//get configs 
var adminEmail = config.get('Brand.adminEmail');
var adminPassword = config.get('Brand.adminPassword');
var brandID = config.get('Brand.id');
var positionCode = config.get('TeamMembers.position');
var MembersAmount = config.get('TeamMembers.amount');
var TeamAPIHostName = config.get('TeamMembers.APIHostName');


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
      RequestAPI(setcookie);
    
    } else {
      console.log(body.toString());
    }

  });
});

req.write("{\"username\":\"" + adminEmail + "\",\"password\":\"" + adminPassword + "\"}");
req.end();

function RequestAPI(cookie) {

  for (var i = 1; i <= MembersAmount; i++) {
    var MemberEmail = Common.generateRandomString(10) + "@mail.com";
    TeamMembers.add(brandID, "Closer", " 1." + i, MemberEmail, positionCode, cookie, TeamAPIHostName);
  }
}
