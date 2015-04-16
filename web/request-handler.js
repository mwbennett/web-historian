var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring')
// require more modules/folders here!

var sendResponse = function(response, data, statusCode, contentType){
  statusCode = statusCode || 200;
  contentType = contentType || 'text/html'
  httpHelpers.headers['Content-Type'] = contentType;
  response.writeHead(statusCode, httpHelpers.headers)
  //response.write(data);
  response.end(data)
}

// CHANGE ALL REFERENCES TO SERVEFILE ---> NOW IN ARCHIVE-HELPERS

var actions = {
  "GET": function(req, res){
    var content;
    var pathName = url.parse(req.url).pathname;
    if (pathName === archive.paths.styles){
      content = 'text/css'
      pathName = archive.paths.siteAssets + pathName
    }
    else if (pathName === archive.paths.root){
      pathName = archive.paths.siteAssets + archive.paths.homePage;
    } else{
      pathName = archive.paths.archivedSites + pathName
    }

    serveFile(pathName, res, 200, content);
  },

  "POST": function(req, res){
    var data = "";

    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      data = querystring.parse(data).url +'\n';
      // write data to sites.txt
      fs.appendFile(archive.paths.list, data, function(err, written, string){
      });

      var pathName = archive.paths.siteAssets + archive.paths.loadingPage;
      serveFile(pathName, res);
    })
  }
}

exports.handleRequest = function (req, res) {
  actions[req.method](req, res)
};

  // res.end(archive.paths.list);
