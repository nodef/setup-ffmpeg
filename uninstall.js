const fs = require('fs');


// Uninstall "ffmpeg".
function unsetup() {
  if(!fs.existsSync('assets')) fs.mkdirSync('assets');
  if(!fs.existsSync('assets/bin')) fs.mkdirSync('assets/bin');
  fs.writeFileSync('assets/bin/ffmpeg', '');
  fs.writeFileSync('assets/bin/ffplay', '');
  fs.writeFileSync('assets/bin/ffprobe', '');
};
unsetup();
