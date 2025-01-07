import { mapping, reverseMapping } from "./mapping.js";

const replaceMorseChars = (morse, dot, dash) =>
  morse.replace(/0/g, dot).replace(/1/g, dash);

const encodeChar = (char, map, unknown) =>
  char === " " ? "/" : map[char] ?? unknown;

/**
 * Encode text to Morse code.
 * @param {string} text The text to encode
 * @param {object} options The encoding options
 * @returns {string} The encoded Morse code
 */
export const encode = (text, options = {}) => {
  const defaultOptions = {
    dash: "-",
    dot: ".",
    seperator: " ",
    script: null,
    unknown: "#",
    strict: false,
  };

  const { script, dash, dot, seperator, unknown, strict } = {
    ...defaultOptions,
    ...options,
  };

  let morse = "";

  if (script) {
    const map = mapping[script];

    if (!map) return unknown;

    morse = [...text.replace(/\s+/g, " ").trim().toUpperCase()]
      .map((char) => encodeChar(char, map, unknown))
      .join(seperator);
  } else {
    let prevScript = null;

    morse = [...text.replace(/\s+/g, " ").trim().toUpperCase()]
      .map((char) => {
        for (const script in mapping) {
          if (
            (mapping[script] !== undefined &&
              mapping[script][char] !== undefined) ||
            char === " "
          ) {
            if (strict && prevScript && prevScript !== script) {
              throw new Error(
                `Inconsistent scripts detected: ${prevScript} and ${script}. Strict mode is enabled. You must specify the script to encode. Only characters from the same script can be encoded.`
              );
            }

            prevScript = script;
            return encodeChar(char, mapping[script], unknown);
          }
        }

        return unknown;
      })
      .join(seperator);
  }

  return replaceMorseChars(morse, dot, dash);
};

const decodeChar = (char, map, unknown) =>
  char === "/" ? " " : map[char] ?? unknown;

/**
 * Decode Morse code to text.
 * @param {string} morse The Morse code to decode
 * @param {object} options The decoding options
 * @returns {string} The decoded text
 */
export const decode = (morse, options = {}) => {
  const defaultOptions = {
    dash: "-",
    dot: ".",
    seperator: " ",
    script: null,
    unknown: "#",
    strict: false,
  };

  const { script, seperator, unknown, dash, dot, strict } = {
    ...defaultOptions,
    ...options,
  };

  const reversedMorse = reverseMapping(dot, dash);

  if (script) {
    if (reversedMorse[script] === undefined) return unknown;

    return morse
      .split(seperator)
      .map((char) => decodeChar(char, reversedMorse[script], unknown))
      .join("");
  } else {
    let prevScript = null;

    return morse
      .split(seperator)
      .map((char) => {
        for (const script in reversedMorse) {
          if (
            (reversedMorse[script] !== undefined &&
              reversedMorse[script][char] !== undefined) ||
            char === "/"
          ) {
            if (strict && prevScript && prevScript !== script) {
              throw new Error(
                `Inconsistent scripts detected: ${prevScript} and ${script}. Strict mode is enabled. You must specify the script to decode. Only morse characters from the same script can be decoded.`
              );
            }
            prevScript = script;
            return decodeChar(char, reversedMorse[script], unknown);
          }
        }

        return unknown;
      })
      .join("");
  }
};

export const getMapping = () => mapping;
