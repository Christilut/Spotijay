Spotijay
========

# Introduction

Download your tracks directly from Spotify, in 320kbps!

Note that while this program is downloading, you cannot use your account elsewhere, just like regular Spotify. Doing so will cause the downloader to stop.  
Also its quite slow, since the Spotify network doesn't serve files at max speed, but rather at a speed that is fast enough to stream.  
Oh and it will probably mess up your account statistics at the end of the year since it probably counts download time as time listened.

# Installation

Requires Node 0.10.x
Requires Spotify Premium

Protip: use NVM for easy node version switching

1. Clone this repo
2. Install `libspotify12` and `libspotify-dev` from https://github.com/mopidy/libspotify-deb
3. Install following libraries: lame sox eye3D
  - Ubuntu/Debian: `sudo apt-get install lame sox eyed3`
  - ~~Arch: `yaourt -S libspotify python2-eyed3 lame sox`~~
  - ~~OSX: `brew install homebrew/binary/libspotify lame sox eyeD3`~~
  - ~~Windows: haha good one~~
4. Run `npm install` inside it
5. Copy your [appkey](https://developer.spotify.com/my-account/keys) in the root of the dir


Program crashes once in a while due to a library bug so you'll have to restart it when that happens. Use [Forever](https://www.npmjs.com/package/forever) to automatically restart it. You should probably turn it off manually when done though (or configure Forever properly) otherwise it restarts every time you want to listen to Spotify and you'll always get the "someone else is using Spotify" message.

# Examples

### Download a single track
```shell
node spotijay -u username -p password --track spotify:track:7ixxyJJJKZdo8bsdWwkaB6
```

### Sync your playlists in the background and forget about crashes interrupting your download
```shell
npm install -g forever

forever start node spotijay -u username -p password -d ~/downloads --silent --playlist spotify:playlist:123abc
```

# Bugs?

Please make an issue, I might look at it when I have time. Pull requests are very welcome!


# Credits

Completely based on [Spotijay](https://github.com/alexperezpaya/Spotijay)
