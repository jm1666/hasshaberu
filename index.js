const SerialPort = require("serialport");
const SoundPlay = require("sound-play");
const PlaySound = require("play-sound")({ player: "aplay" });
const { getAudioDurationInSeconds } = require("get-audio-duration");

const port = new SerialPort(process.argv.slice(2)[0], {
  baudRate: 9600,
  autoOpen: false,
});

let bellDuration = 0;
let announcementDuration = 0;
let bellPlayed = false;
let bellShouldPlaying = false;
let announceShouldPlaying = false;

getAudioDurationInSeconds(process.argv.slice(2)[1]).then((duration) => {
  bellDuration = duration * 1000;
});

getAudioDurationInSeconds(process.argv.slice(2)[2]).then((duration) => {
  announcementDuration = duration * 1000;
});

port.open(function (err) {
  if (err) {
    return console.error("Error opening port: ", err.message);
  }
});

const a = async () => {
  if (bellShouldPlaying == false) {
    bellShouldPlaying = true;
    if (process.platform === "darwin" || process.platform === "win32") {
      await SoundPlay.play(process.argv.slice(2)[1]);
    } else if (process.platform === "linux") {
      PlaySound.play(process.argv.slice(2)[1]);
      await sleep(bellDuration);
    }
    bellPlayed = true;
    bellShouldPlaying = false;
  }
};

const b = async () => {
  if (bellPlayed == true && announceShouldPlaying == false) {
    announceShouldPlaying = true;
    if (process.platform === "darwin" || process.platform === "win32") {
      await SoundPlay.play(process.argv.slice(2)[2]);
    } else if (process.platform === "linux") {
      PlaySound.play(process.argv.slice(2)[2]);
      await sleep(announcementDuration);
    }
    bellPlayed = false;
    announceShouldPlaying = false;
  }
};

setInterval(() => {
  port.write("1");

  if (port.read(1) == null) {
    b();
  } else {
    bellPlayed = false;
    a();
  }
}, bellDuration);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
