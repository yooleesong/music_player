# simple-music-player
Simple Music Player for javascript lecture

## Tables of contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Music Player](#music-player)
  - [Requirements](#requirements)
  - [Guides](#guides)

## Installation

Please, download repository codes by clicking below "Download ZIP" and unzip the files.

![Github Repository Code Download](/images/github-download.png)

Alternatively, you can download the codes using with `git`

```
$ git clone https://github.com/taehwanno/simple-music-player
```

## Project Structure

```
.
├── LICENSE
├── README.md
├── audio
│   ├── Crush - Summer Love.mp3
│   ├── Crush - Whatever You Do (Feat. Gray).mp3
│   └── 에일리 - 첫눈처럼 너에게 가겠다.mp3
├── index.html
├── script.js
└── style.css
```

`script.js` and `style.css` is the position that you will write the codes.

Actually, mp3 files in an audio directory are not free to the copyright problem. :bomb:

## Music Player

![Music Player Prototype](/images/player.png)

We will use [jQuery](http://jquery.com/), [howler.js](https://github.com/goldfire/howler.js) (Web Audio API library, + HTML5 Audio).

Please see [jQuery API Documents](http://api.jquery.com/), [howler.js API Documents](https://github.com/goldfire/howler.js#documentation).

Already the scripts are added by CDN in [index.html](https://github.com/taehwanno/simple-music-player/blob/master/index.html#L33-L34).

You just write javascript codes in [script.js](https://github.com/taehwanno/simple-music-player/blob/master/script.js)

### Requirements

The number in each requirement means task sequence.

#### 1. Just play **Crush - Whatever You Do (Feat. Gray)**

- button with `id="play-button"` specification
  - In play mode, `Play` text must change to `Pause`
  - In pause mode, `Pause` text muse change to `Play`

#### 2. Implement previous, next play button (`<`, `>`)

- Play list sequence (for project consistency)
  1. Crush - Whatever You Do (Feat. Gray).mp3
  2. 에일리 - 첫눈처럼 너에게 가겠다.mp3
  3. Crush - Summer Love.mp3
- Button with `id="previous-button"`
  - if clicked, play previous song
  - if first song is in play (specifically, `Crush - Whatever You Do (Feat. Gray).mp3`), nothing happens
- Button with `id="next-button"`
  - if clicked, play next song
  - if last song is in play (specifically, `Crush - Summer Love.mp3`), nothing happens
- Text in `id="music-title"`
  - show song title matched to current one

#### 3. Implement duration

- Text in `id="duration-start"`
  - show current played times (format: `0:00`)
- Text in `id="duration-end"`
  - show current song end times (format: `0:00`)
- Progress in `id="progress"`
  - show duration percentage (`= duration start / duration end`)

### Guides

Below codes show extremely simple play .mp3 codes using with howler.js

```js
var sound = new Howl({
  src: ['./audio/Crush - Whatever You Do (Feat. Gray).mp3']
});

sound.play();
```
