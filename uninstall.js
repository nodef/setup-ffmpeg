const fs = require('fs');


// Match files matching pattern in path.
function readdirMatch(pth, pat) {
  return fs.readdirSync(pth).filter(nam => pat.test(nam));
};

// Uninstall "ffmpeg".
function unsetup() {
  var ffmpeg = readdirMatch('bin', /ffmpeg.*/)[0];
  var ffplay = readdirMatch('bin', /ffplay.*/)[0];
  var ffprobe = readdirMatch('bin', /ffprobe.*/)[0];
  fs.renameSync(ffmpeg, 'ffmpeg');
  fs.renameSync(ffplay, 'ffplay');
  fs.renameSync(ffprobe, 'ffprobe');
};
unsetup();
