const fs = require('fs');


// Uninstall "ffmpeg".
function unsetup() {
  fs.mkdirSync('assets/bin', {recursive: true});
  fs.writeFileSync('assets/bin/ffmpeg', '');
  fs.writeFileSync('assets/bin/ffplay', '');
  fs.writeFileSync('assets/bin/ffprobe', '');
};
unsetup();
