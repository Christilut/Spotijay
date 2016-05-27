var async = require('async')
var fs = require('fs')
var path = require('path')
var args = require('commander')
var Spotify = require(__dirname + '/lib/spotify')

function errorCallback(err) {
  if (err) console.log(err)
  process.exit()
}

args
  .version(require('./package.json').version)
  .option('-u, --username [string]', 'Set your Spotify username')
  .option('-p, --password [string]', 'Set your Spotify password')
  .option('-d, --dir [string]', 'Set download destination, defaults to \'downloads\' in this folder', './downloads')
  .option('-t, --track [spotify uri]', 'Specify a track to download')
  .option('-l, --playlist [spotify uri]', 'Specify a playlist to download')
  .option('-s, --silent', 'Runs program silently (use this with forever or you\'ll get huge logs)')

args.on('--help', function() {
  console.log('  Examples:')
  console.log('')
  console.log('    Download a single track')
  console.log('    $ node spotijay -u foo -p bar --track spotify:uri:123')
  console.log('')
  console.log('    Download an entire playlist to your home folder')
  console.log('    $ node spotijay -u foo -p bar -d ~/downloads --playlist spotify:uri:123')
  console.log('')
})

args.parse(process.argv)

if (args.silent) {
  console.log = function() {}
}

if (args.playlist && args.track || !args.playlist && !args.track) {
  console.log('You must either specify a track or a playlist')
  process.exit(1)
}

if (!args.username || !args.password) {
  console.log('You must specify your Spotify username and password')
  process.exit(1)
}

if (args.playlist) {
  Spotify(args.username, args.password, function(err, spotify) {
    spotify.downloadPlaylistByUrl(args.playlist, args.dir, errorCallback)
  })
} else if (args.track) {
  Spotify(args.username, args.password, function(err, spotify) {
    spotify.getTrackByUrl(args.track, args.dir, errorCallback)
  })
}
