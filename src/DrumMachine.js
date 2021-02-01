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
      kick: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tom_low: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tom_mid: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tom_high: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      hihat_closed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      hihat_open: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      crash: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
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
    let tracks = ["kick", "snare", "tom_low", "tom_mid", "tom_high", "hihat_closed", "hihat_open", "crash"];
    let loadTracks = [];
    for (let track of tracks) {
      loadTracks.push(
        axios
          .get(process.env.PUBLIC_URL + `/clips/${track}.wav`, {
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
