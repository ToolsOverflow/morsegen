import { decode, encode } from "./morse.js";
import { downloadFile, saveFile } from "./utils.js";

const getGainValues = (morse, options = {}, currentTime = 0) => {
  let { unit, fwUnit } = { unit: 0.1, fwUnit: 0.1, ...options };
  const spots = [];
  let time = 0;

  if (options.wpm) {
    unit = fwUnit = 60 / (options.wpm * 50);
  }

  const beap = (count) => {
    const volume = options.volume / 100 || 0.001;
    spots.push([volume, currentTime + time]);
    time += unit * count;
  };

  const gap = (count) => {
    spots.push([0, currentTime + time]);
    time += fwUnit * count;
  };

  const silence = (count) => {
    spots.push([0, currentTime + time]);
    time += count * unit;
  };

  for (let i = 0, addSilence = false; i < morse.length; i++) {
    if (morse[i] === " ") {
      gap(7);
      addSilence = false;
    } else if (morse[i] === options.dot) {
      if (addSilence) silence(1);
      else addSilence = true;
      beap(1);
    } else if (morse[i] === options.dash) {
      if (addSilence) silence(1);
      else addSilence = true;
      beap(3);
    } else if (typeof morse[i + 1] !== "undefined" && morse[i + 1] !== " ") {
      gap(3);
      addSilence = false;
    }
  }

  spots.push([0, time]);

  return [spots, time];
};

const audioBufferToWav = (buffer) => {
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const samples = buffer.length;
  const length = samples * numberOfChannels * 2 + 44;
  const result = new DataView(new ArrayBuffer(length));

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  };

  writeString(result, 0, "RIFF");
  result.setUint32(4, length - 8, true);
  writeString(result, 8, "WAVE");
  writeString(result, 12, "fmt ");

  result.setUint32(16, 16, true);
  result.setUint16(20, 1, true);
  result.setUint16(22, numberOfChannels, true);
  result.setUint32(24, sampleRate, true);
  result.setUint32(28, sampleRate * numberOfChannels * 2, true);
  result.setUint16(32, numberOfChannels * 2, true);
  result.setUint16(34, 16, true);
  writeString(result, 36, "data");
  result.setUint32(40, samples * numberOfChannels * 2, true);

  let offset = 44;
  for (let i = 0; i < numberOfChannels; i++) {
    floatTo16BitPCM(result, offset, buffer.getChannelData(i));
    offset += samples * 2;
  }

  return result.buffer;
};

const audio = (morse, options = {}) => {
  options = { dot: ".", dash: "-", ...options };

  let AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let OfflineAudioContextClass =
    window.OfflineAudioContext || window.webkitOfflineAudioContext;

  if (!AudioContextClass || !OfflineAudioContextClass) {
    throw new Error("Web Audio API is not supported in this browser");
  }

  morse = morse.trim();

  if (options.input === undefined) {
    morse = encode(morse, options);
  } else {
    morse = options?.input === "morse" ? morse : encode(morse, options);
  }

  morse = morse.replace(/\#/g, "");

  if (morse.trim().length === 0)
    throw new Error(
      "Invalid morse code. It should only contain valid characters."
    );

  const [gainValues, time] = getGainValues(morse, options);

  let audioContext = new AudioContextClass();
  let offlineContext = new OfflineAudioContextClass(1, 44100 * time, 44100);

  const oscillator = offlineContext.createOscillator();
  const gainNode = offlineContext.createGain();

  oscillator.type = options?.oscillator?.type || "sine";
  oscillator.frequency.value = options?.oscillator?.frequency || 440;

  gainValues.forEach(([volume, timestamp], index) => {
    const fadeDuration = 0.005;
    if (index === 0 || gainValues[index - 1][0] !== volume) {
      gainNode.gain.setTargetAtTime(volume, timestamp, fadeDuration);
    }
  });

  oscillator.connect(gainNode);
  gainNode.connect(offlineContext.destination);

  let source = null;
  let renderedBuffer = null;
  let sourceTimeout = null;
  let pauseTime = 0;
  let isPlaying = false;
  let startAt = 0;
  let disable = false;
  let nodeInterval = null;

  const render = new Promise((resolve, reject) => {
    oscillator.start(0);

    offlineContext.startRendering();

    offlineContext.oncomplete = (e) => {
      try {
        renderedBuffer = e.renderedBuffer;
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    offlineContext.onerror = (e) => reject(e);
  });

  const findIndex = () => {
    const elapsed = (Date.now() - startAt) / 1000;

    const index = gainValues.findIndex((node) => node[1] >= elapsed);

    if (index !== -1) {
      options?.onNextGain && options?.onNextGain(gainValues[index]);
    }
  };

  const trackProgress = () => {
    findIndex();
    nodeInterval = requestAnimationFrame(trackProgress);
  };

  const stopTracking = () => {
    if (nodeInterval) {
      cancelAnimationFrame(nodeInterval);
      nodeInterval = null;
    }
  };

  const createSource = () => {
    source = audioContext.createBufferSource();
    source.buffer = renderedBuffer;
    source.connect(audioContext.destination);

    source.onended = () => {
      isPlaying = false;
      options?.oscillator?.onEnded && options?.oscillator?.onEnded();
      stopTracking();
    };
  };

  const play = async () => {
    if (!isPlaying) {
      if (disable) return;

      isPlaying = true;
      options?.onPlay && options?.onPlay();

      if (Date.now() > startAt + pauseTime) {
        startAt = Date.now() - pauseTime;
      }

      await render;
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      createSource();
      source.start(audioContext.currentTime, pauseTime / 1000);
      disable = true;
      clearTimeout(sourceTimeout);
      sourceTimeout = setTimeout(() => stop(), time * 1000);

      if (!nodeInterval) {
        trackProgress();
      }
    } else {
      pause();
    }
  };

  const pause = () => {
    clearTimeout(sourceTimeout);
    stopTracking();

    if (source) {
      disable = false;
      source.stop();
      pauseTime = Date.now() - startAt;
      isPlaying = false;

      options?.onPause && options?.onPause();
    }
  };

  const stop = () => {
    pause();
    pauseTime = 0;
    isPlaying = false;
    options?.onPause && options?.onPause();
    startAt = 0;
    disable = false;
    stopTracking();
  };

  const getWavData = async () => {
    if (!renderedBuffer) {
      await render;
    }

    return audioBufferToWav(renderedBuffer);
  };

  const saveWav = async (name, options) => {
    const { filePicker } = { filePicker: true, ...options };
    if (!name) name = decode(morse);
    const data = await getWavData();

    if (filePicker) {
      saveFile("Audio File (Wav)", "audio/wav", ".wav", data, name);
    } else {
      downloadFile(data, "audio/wav", name, ".wav");
    }
  };

  const close = () => {
    stop();
    audioContext.close();
  };

  return {
    play,
    pause,
    stop,
    close,
    audioContext,
    oscillator,
    gainNode,
    getWavData,
    saveWav,
    render,
    getRenderedBuffer: () => renderedBuffer,
    getGainValues: () => gainValues,
  };
};

export default audio;
