const express = require("express");
const https = require("node:https");
const app = express();


app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=f2edcf53f9d8df1c556b3b5e01be8725&units=metric"
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(temp);
      console.log(description);
      res.write("<p>" + description + ".</p>");
      res.write("<h1>The temperature in London is " + temp + " degrees Celsius.</h1>");
      res.write("<img src="+ iconUrl + ">");
      res.send()
    })
  })
})


app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
