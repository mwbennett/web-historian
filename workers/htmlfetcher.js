var fs = require('fs');
var path = require('path');
var archive = require('/Users/student/2015-03-web-historian/helpers/archive-helpers');
var httpHelpers = require('/Users/student/2015-03-web-historian/web/http-helpers');
var _ = require('underscore')
var http = require('http-request');

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

// CRON

// go through sites.txt

module.exports = function(){
  console.log('is this working?')
  archive.readListOfUrls(function(websites){
    _.each(websites, function(site){
      var path = site.substring(0, site.length -3) +'html'
      path = archive.paths.archivedSites + '/' + path
      fs.exists(path, function(exists){
        if (!exists){
          fs.writeFile(path, '', 'utf8', function(err){
            if(err){
              throw err
            }
          })
          http.get(site, path, function(err, res){
            if(err){
              throw err;
            }
          })
        }
      })
    })
  })
}()


// for each site, check ./archives/sites for a corresponding directory
// if present, continue
