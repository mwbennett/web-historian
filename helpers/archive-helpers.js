var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'root' : '/',
  'homePage' : '/index.html',
  'styles' : '/styles.css',
  'loadingPage' : '/loading.html'
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var that = this;
  var result = [];
  fs.readFile(that.paths.list, 'utf8', function(err,data){
    if(err){
      throw err
    }
    result = data.split('\n');
    callback(result);
  })
};

exports.isUrlInList = function(path){
  var exists = false;
  this.readListOfUrls(function(result){
    _.each(result, function(val){
      if(val === path){
        exists = true
      }
    })
  })
  return exists;
};

exports.addUrlToList = function(path){
  var that = this;
  if (!this.isUrlInList){
    //write to file
  }
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};

// NOT FINISHED - NEED TO DETERMINE IF PATH EXISTS IN ARCHIVES
exports.serveFile = function(path, res){
  fs.readFile(path, function(err, data){
    if(err){

      sendResponse(res, null, 404)
    } else {
      sendResponse(res, data.toString())
    }
  })
}
