var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring')
// require more modules/folders here!

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, httpHelpers.headers)
  response.end(JSON.stringify(data))
}

var actions = {
  "GET": function(req, res){
    var pathName = url.parse(req.url).pathname;

    if (pathName === archive.paths.root){
      pathName = archive.paths.siteAssets + archive.paths.homePage;
    } else{
      pathName = archive.paths.archivedSites + pathName
    }

    fs.readFile(pathName, function(err, data){
      if(err){
        sendResponse(res, null, 404);
      }
      else {
        sendResponse(res, data.toString());
      }
    })
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
      sendResponse(res, data, 302);
    })
  }
}

exports.handleRequest = function (req, res) {
  actions[req.method](req, res)
};

  // res.end(archive.paths.list);
