`node index.js <<Serial Device>> <<bell.wav>> <<announcement.wav>>`

e.g. `node index.js /dev/ttyUSB0 bell.wav announcement.wav`

---

Requirment: Any one of the following audio player is installed

- mplayer
- afplay (Bundled with macOS)
- mpg123
- mpg321
- play (sox)
- [omxplayer](https://github.com/popcornmix/omxplayer)
- aplay (Bundled with most Linux Distro)
- [cmdmp3](https://github.com/jimlawless/cmdmp3)

---

TODO (PR Welcomed):

- Interrupting the Melody
- Test run on Windows/macOS

---

Recommend: https://unix.stackexchange.com/questions/14354/read-write-to-a-serial-port-without-root
