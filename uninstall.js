const fs = require('fs');


// Match files matching pattern in path.
function readdirMatch(pth, pat) {
  return fs.readdirSync(pth).filter(nam => pat.test(nam));
};

// Uninstall "youtubeuploader".
function unsetup() {
  var fil = readdirMatch('.', /youtubeuploader.*/)[0];
  fs.renameSync(fil, 'youtubeuploader');
};
unsetup();
