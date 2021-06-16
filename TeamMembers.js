var http = require("http");

module.exports = {
  add: function (brandID, firstName, lastName, email, positionCode, cookie, host) {
    var options = {
      "method": "POST",
      "hostname": host,
      "port": null,
      "path": "/api/v1/brands/" + brandID + "/team_schedule",
      "headers": {
        "content-type": "application/json;charset=UTF-8",
        "cookie": cookie,
        "cache-control": "no-cache",
        "postman-token": "d7420cb2-ab47-9605-e260-5c2ca1d2ee59"
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
          console.log("User: " + firstName + " " + lastName + " Added Successfully");
        } else {
          console.log(body.toString());
        }
      });
    });

    req.write("{\"first_name\":\"" + firstName + "\",\"last_name\":\"" + lastName + "\",\"email\":\"" + email + "\",\"position_code\":\"" + positionCode + "\",\"pay_rate\":10,\"max_weekly_hours\":50}");
    req.end();
  }
}
