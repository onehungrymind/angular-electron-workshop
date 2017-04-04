const request = require('request');
const accessToken = '';
const uploadUrl = 'https://content.dropboxapi.com/2/files/upload';

module.exports = function(ctx, cb) {
  const imageName = ctx.body.imageName;
  const image = ctx.body.image.data;
  
  request({
    method: 'POST',
    uri: uploadUrl,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Dropbox-API-Arg': `{ "path": "/${imageName}.jpg" }`,
      'content-type': 'application/octet-stream'
    },
    body: new Buffer(image, 'binary')
  }, (error, response, body) => {
    if (error) {
      cb(error);
    }
    cb(null, response);
  });
};