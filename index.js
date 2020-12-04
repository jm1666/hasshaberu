const SerialPort = require("serialport");
const PlaySound = require("play-sound")();
const { getAudioDurationInSeconds } = require("get-audio-duration");

const port = new SerialPort(process.argv.slice(2)[0], {
  baudRate: 9600,
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

const a = async () => {
  if (bellShouldPlaying == false && announceShouldPlaying == false) {
    bellShouldPlaying = true;
    PlaySound.play(process.argv.slice(2)[1]);
    await sleep(bellDuration);
    bellPlayed = true;
    bellShouldPlaying = false;
  }
};

const b = async () => {
  if (bellPlayed == true && announceShouldPlaying == false) {
    announceShouldPlaying = true;
    PlaySound.play(process.argv.slice(2)[2]);
    await sleep(announcementDuration);
    bellPlayed = false;
    announceShouldPlaying = false;
  }
};

setInterval(() => {
  port.write("1"); // Test Switch Mode

  if (port.read(1) == null) {
    rewriteConsole("Switch is Off.");
    b();
    // Switch is Off
  } else {
    rewriteConsole("Switch is On. ");
    bellPlayed = false;
    a();
    // Switch is On
  }
}, bellDuration);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function rewriteConsole(text) {
  // https://stackoverflow.com/a/41355384
  process.stdout.cursorTo(0);
  process.stdout.write(text); // end the line
}
