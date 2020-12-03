`node index.js <<Serial Device>> <<bell.wav>> <<announcement.wav>>`

e.g. `node index.js /dev/ttyUSB0 bell.wav announcement.wav`

---

Requirments: 

1. ANY of them
    - mplayer
    - afplay (Bundled with macOS)
    - mpg123
    - mpg321
    - play (sox)
    - [omxplayer](https://github.com/popcornmix/omxplayer)
    - aplay (Bundled with most Linux Distro)
    - [cmdmp3](https://github.com/jimlawless/cmdmp3)
2. 改造済み 発車ベルスイッチ (春日電機　動力用開閉器)　+ USB シリアルポート 変換アダプタ　https://jagameshi.hatenablog.com/entry/2019/11/12/021009 
3. 発車メロディ `bell.wav`
4. 発車放送 `announcement.wav`

---

TODO (PR Welcomed):

- Interrupting the Melody
- Test run on Windows/macOS

---

Recommend: https://unix.stackexchange.com/questions/14354/read-write-to-a-serial-port-without-root
