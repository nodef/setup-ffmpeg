const download = require('download');
const Progress = require('progress');
const fs = require('fs-extra');
const cp = require('child_process');


// Global variables.
const VERSION = '4.0.2';
const ARCH_LINUX = {
  arm: 'armhf-32bit',
  arm64: 'arm64-64bit',
  ia32: '32bit',
  x32: '32bit',
  x64: '64bit'
};
const ARCH_OTHERS = {
  ia32: '32',
  x32: '32',
  x64: '64'
};
const PLATFORM = {
  darwin: 'mac',
  win32: 'win'
};
const FORMAT = '[:bar] :percent :etas';
const OPTIONS = {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 0
};


// Run a command, return true if success.
function cpRun(txt) {
  try { cp.execSync(txt, {stdio: []}); }
  catch(e) { return false; }
  return true;
};

// Match files matching pattern in path.
function readdirMatch(pth, pat) {
  return fs.readdirSync(pth).filter(nam => pat.test(nam));
};

// Get download URL.
function downloadUrl() {
  var platform = PLATFORM[process.platform]||'linux', arch = process.arch;
  arch = (platform==='linux'? ARCH_LINUX[arch]:ARCH_OTHERS[arch])||arch;
  if(platform==='linux') return `https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-${arch}-static.tar.xz`;
  return `https://ffmpeg.zeranoe.com/builds/${platform}${arch}/static/ffmpeg-${VERSION}-${platform}${arch}-static.zip`;
};

// Download and extract files (with progress).
function edownload(url, dst, opt) {
  var o = (opt || typeof dst==='string'? opt:dst)||{};
  var bar = o.progress===undefined? new Progress(FORMAT, OPTIONS):o.progress;
  return download(url, dst, opt).on('response', o.onresponse||(res => {
    if(bar==null) return;
    bar.total = res.headers['content-length'];
    res.on('data', dat => bar.tick(dat.length));
  }));
};

// Setup "ffmpeg".
async function setup() {
  if(cpRun('ffmpeg -version')) {
    console.log('setup: ffmpeg already exists.');
    return fs.removeSync('node_modules');
  }
  fs.removeSync('assets');
  var url = downloadUrl();
  console.log(`setup: Downloading ${url}`);
  await edownload(url, '.', {extract: true});
  var dir = readdirMatch('.', /ffmpeg.*/)[0];
  fs.renameSync(dir, 'assets');
  cpRun('chmod -f +x assets/bin/ffmpeg*');
  cpRun('chmod -f +x assets/bin/ffplay*');
  cpRun('chmod -f +x assets/bin/ffprobe*');
  fs.removeSync('node_modules');
};
setup();
