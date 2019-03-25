var path = require("path");
var morgan = require("morgan");
var express = require("express");
const bodyParser = require('body-parser')

module.exports = app => {
  app.use(morgan("dev"));

  app.get("*.js", function(req, res, next) {
    if (process.env.NODE_ENV === "production") {
      if (req.url !== "/service-worker.js") {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "text/javascript");
        next();
      }else{
      next();
      }
    }else{
    next();
    }
  });
  app.get("*.css", function(req, res, next) {
    if (process.env.NODE_ENV === "production") {
      req.url = req.url + ".gz";
      res.set("Content-Encoding", "gzip");
      res.set("Content-Type", "text/css");
      next();
    }else{
    next();

    }
  });

//   // CORS middleware
//   app.use((req, res, next) => {
//     // Website you wish to allow to connect
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // Request methods you wish to allow
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     // Request headers you wish to allow
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type"
//     );
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     // Pass to next layer of middleware
//     next();
//   });

  app.use(express.static(path.join(__dirname, "../../dist")));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};