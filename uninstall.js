const path = require('path');
const fs = require('fs');


// Uninstall "ffmpeg".
function unsetup() {
  var pth = path.join(__dirname, 'assets', 'bin');
  fs.mkdirSync(pth, {recursive: true});
  fs.writeFileSync(path.join(pth, 'ffmpeg'), '');
  fs.writeFileSync(path.join(pth, 'ffplay'), '');
  fs.writeFileSync(path.join(pth, 'ffprobe'), '');
};
unsetup();
