# Belly/Rdio DJ Player

Inspired by the [JS Audio Player](https://tech.bellycard.com/join/#javascript-audio-player) challenge on the Belly engineering page.

## Use

Due to restrictions on Rdio's API you must start the second speaker
session in a separate browser, incognito window, or computer.
Additionally both sessions may not be logged in as the same user.

The auto-complete depends on a sluggish search api, be patient when
looking up different tracks.

## Local Development

```
git clone https://github.com/pcorliss/belly-rdio-dj.git
cd belly-rdio-dj
npm install
mocha # Run Tests
node index.js # Start Local Server
# Navigate to http://localhost:3000
```

## Deployment

```
git push heroku master
```
