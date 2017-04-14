const request = require('request');
const token = require('./token');
const fs = require('fs');

console.log('Welcome to the Github Avatar Downloader!');

const GITHUB_USER = 'AlvyS';
const GITHUB_TOKEN = '61f1403188f48e43c2b30d691535caf393a6e6f8';
// console.log(GITHUB_TOKEN);

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // console.log(requestURL);
  var options = {
  'url': requestURL,
  headers: {
    'User-Agent': 'AlvyUser'
    }
  };

  request(options, (err, response, body) => {
    if(err) {
      console.log('oops', err);
      return false;
    }
    var data = JSON.parse(body);
    data.forEach((avatar) => {
      var filePath = "avatars/" + avatar.login + ".jpg";
      var urlPath = avatar.avatar_url;
      cb(urlPath, filePath);
    });
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
         console.log("oops")
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);
