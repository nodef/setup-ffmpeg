const download = require('download');
const Progress = require('progress');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');


// Global variables.
const RELEASE = '18.14';
const URLPREFIX = 'https://github.com/porjo/youtubeuploader/releases/download';
const ARCH = {
  arm: 'armv7',
  x64: 'amd64'
};
const PLATFORM = {
  darwin: 'mac',
  win32: 'windows'
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
  var arch = ARCH[process.arch]||process.arch;
  var platform = PLATFORM[process.platform]||'linux';
  var ext = platform!=='linux'? '.zip':'.gz';
  return `${URLPREFIX}/${RELEASE}/youtubeuploader_${platform}_${arch}${ext}`;
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

// Setup "youtubeuploader".
async function setup() {
  fs.removeSync('youtubeuploader');
  if(cpRun('youtubeuploader -v')) {
    console.log('setup: youtubeuploader already exists.');
    return fs.removeSync('.');
  }
  var url = downloadUrl();
  console.log(`setup: Downloading ${url}`);
  await edownload(url, '.', {extract: true});
  var fil = readdirMatch('.', /youtubeuploader.*/)[0];
  fs.renameSync(fil, 'youtubeuploader'+path.extname(fil));
  cpRun('chmod -f +x youtubeuploader*');
  fs.removeSync('node_modules');
};
setup();
