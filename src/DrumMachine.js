class DrumMachine {
  constructor(
    options = {
      onTempoChange: () => {},
      onIsPlayingChange: () => {},
      onNotePlayed: () => {},
      onPatternChange: () => {},
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
      261.63: [
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
      ],
      329.63: [
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
      ],
      493.88: [
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
      ],
    };

    // callbacks
    this.onTempoChange = options.onTempoChange;
    this.onIsPlayingChange = options.onIsPlayingChange;
    this.onNotePlayed = options.onNotePlayed;
    this.onPatternChange = options.onPatternChange;
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
    for (let note in this.pattern) {
      if (!this.pattern[note][beatNumber]) continue;

      // create an oscillator
      var osc = this.audioContext.createOscillator();
      let gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0.3;
      osc.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      osc.frequency.value = parseFloat(note);
      osc.start(time);
      osc.stop(time + this.noteLength);
    }
  }

  scheduler() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
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
      // play silent buffer to unlock the audio
      var buffer = this.audioContext.createBuffer(1, 1, 22050);
      var node = this.audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      this.unlocked = true;
    }

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      // start playing
      this.current16thNote = 0;
      this.onNotePlayed(0);
      this.nextNoteTime = this.audioContext.currentTime;
      this.timerID = setInterval(() => this.scheduler(), this.lookahead);
    } else {
      clearInterval(this.timerID);
      this.timerID = null;
    }

    this.onIsPlayingChange(this.isPlaying);
  }
}

export default DrumMachine;
