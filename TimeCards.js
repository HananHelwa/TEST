var https = require("https");

module.exports = {
  add: function (brandID, userID, day, host, cookie, clockIn, clockOut) {
    var options = {
      "method": "POST",
      "protocol": "https:",
      "hostname": host,
      "port": null,
      "path": "/api/v1/brands/" + brandID + "/users/" + userID + "/clocks?day=" + day + "&type=day",
      "headers": {
        "content-type": "application/json;charset=UTF-8",
        "cookie": cookie,
        "cache-control": "no-cache",
        "postman-token": "d7420cb2-ab47-9605-e260-5c2ca1d2ee59"
      }
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        if (res.statusCode == 200) {
          console.log("Time Card Added Successfully");
        } else {
          console.log(body.toString());
        }
      });
    });

    req.write('{"status":"APPROVED","actual_clock":{"clock_in":"' + clockIn + '","clock_out":"' + clockOut + '","breaks":[],"sick_leave_duration":3600,"clock_out_early_reason":null,"call_in":{"status":"APPROVED"},"position":{"category":{"code":"FOH","id":1,"name":"Front of House"},"position_settings":[{"date":"2018-03-03","is_tipped":false}],"code":"barback-","id":8,"name":"Barback ","object_position_settings_is_tipped":{"2018-03-03":false},"tips_enabled":true}}}');

    req.end();

  }
}
