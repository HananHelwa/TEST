var http = require("http");

module.exports = {
  add: function (brandID, assignee, ScheduleID, roleID, cookie, host) {
    var options = {
      "method": "POST",
      "hostname": host,
      "port": null,
      "path": "/api/v1/brands/" + brandID + "/schedules/" + ScheduleID + "/shifts",
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
          console.log("Shift added successfully !");
        } else {
          console.log(body.toString());
        }
      });
    });

    req.write('{"assignee_id":'+ assignee +',"role_id":'+ roleID +',"start_time":"Mar 5, 2018 14:00","end_time":"Mar 5, 2018 19:45"}');
    req.end();
  }
}
