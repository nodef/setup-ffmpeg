const fs = require('fs');


// Uninstall "ffmpeg".
function unsetup() {
  fs.writeFileSync(path.join(pth, 'ffmpeg'), '');
  fs.writeFileSync(path.join(pth, 'ffplay'), '');
  fs.writeFileSync(path.join(pth, 'ffprobe'), '');
};
unsetup();
