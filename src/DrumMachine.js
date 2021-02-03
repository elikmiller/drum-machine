import axios from "axios";

class DrumMachine {
  constructor(
    options = {
      onTempoChange: () => {},
      onIsPlayingChange: () => {},
      onNotePlayed: () => {},
      onPatternChange: () => {},
      onLoadingDone: () => {},
    }
  ) {
    this.audioContext = new AudioContext();
    this.unlocked = false;
    this.isPlaying = false; // Are we currently playing?
    this.startTime = null; // The start time of the entire sequence.
    this.current16thNote = null; // What note is currently last scheduled?
    this.tempo = 80.0; // tempo (bpm)
    this.lookahead = 25.0; // How frequently to call scheduling function (ms)
    this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (s)
    this.nextNoteTime = 0.0; // when the next note is due.
    this.noteLength = 0.05; // length of "beep" (in seconds)
    this.timerID = null; // setInterval id
    this.pattern = {
      clap: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      clave: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      conga_hi: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      conga_mid: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      conga_low: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      cowbell: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      cymbal: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      hihat_closed: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      hihat_open: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      kick: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      maracas: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      rim: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      snare: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      tom_hi: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      tom_mid: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      tom_low: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    };

    // callbacks
    this.onTempoChange = options.onTempoChange;
    this.onIsPlayingChange = options.onIsPlayingChange;
    this.onNotePlayed = options.onNotePlayed;
    this.onPatternChange = options.onPatternChange;
    this.onLoadingDone = options.onLoadingDone;

    // sounds
    this.loading = true;
    this.audioData = {};
    let tracks = [
      "clap",
      "clave",
      "conga_hi",
      "conga_mid",
      "conga_low",
      "cowbell",
      "cymbal",
      "hihat_closed",
      "hihat_open",
      "kick",
      "maracas",
      "rim",
      "snare",
      "tom_hi",
      "tom_mid",
      "tom_low",
    ];
    let loadTracks = [];
    for (let track of tracks) {
      loadTracks.push(
        axios
          .get(process.env.PUBLIC_URL + `/clips/${track}.mp3`, {
            responseType: "arraybuffer",
          })
          .then((result) => {
            return this.audioContext.decodeAudioData(result.data);
          })
          .then((result) => {
            this.audioData[track] = result;
          })
      );
    }
    Promise.all(loadTracks).then(() => {
      this.loading = false;
      this.onLoadingDone();
    });
  }

  nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / this.tempo; // Notice this picks up the CURRENT
    // tempo value to calculate beat length.
    this.nextNoteTime += 0.25 * secondsPerBeat; // Add beat length to last beat time

    this.current16thNote++; // Advance the beat number, wrap to zero
    if (this.current16thNote === 16) {
      this.current16thNote = 0;
    }
    this.onNotePlayed(this.current16thNote);
  }

  scheduleNote(beatNumber, time) {
    for (let track in this.pattern) {
      if (!this.pattern[track][beatNumber]) continue;
      let source = this.audioContext.createBufferSource();
      source.buffer = this.audioData[track];
      source.connect(this.audioContext.destination);
      source.start(time);
    }
  }

  scheduler() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }

  setTempo(tempo) {
    this.tempo = tempo;
    this.onTempoChange(this.tempo);
  }

  setPattern(pattern) {
    this.pattern = pattern;
    this.onPatternChange(this.pattern);
  }

  startStop() {
    if (!this.unlocked) {
      this.unlocked = true;
      this.audioContext.resume();
    }

    this.isPlaying = !this.isPlaying;

    console.log(this.isPlaying);

    if (this.isPlaying) {
      this.current16thNote = 0;
      this.nextNoteTime = this.audioContext.currentTime + 0.1;
      this.timerID = setInterval(() => this.scheduler(), this.lookahead);
    } else {
      clearInterval(this.timerID);
      this.timerID = null;
    }

    this.onIsPlayingChange(this.isPlaying);
  }
}

export default DrumMachine;
