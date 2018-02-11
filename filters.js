//@ts-check
'use strict'

/**
 * @typedef {Object} Word
 * @property {String} w The word itself
 * @property {String} t The type of the word
 * @property {Number} s The number of syllables in the word
 */

var filters = [{
    /** The regex to use to match */
    regex: /(?:starts?|begins?)(?: with)?\s+(?:['"](.*)['"]|(\S+))/,

    /**
     * Filter the current list of words
     *
     * @param {String}   str   The input string of the user
     * @param {String[]} args  The capture groups of the array, after doing <String>.match
     * @param {Word[]} words The current list of words, may be already filtered by other filters
     * @returns {Word[]} A new array of words that match
     */
    filter: function (str, args, words) {
      var start = (args[1] ? args[1].toLowerCase() : args[2].toLowerCase()).trim()

      return words.filter(function (v) {
        return v.w.indexOf(start) === 0
      })
    }
  },

  // Inverse of the above, checks if a word ends with the provided string
  {
    regex: /ends?(?: with)?\s+(?:['"](.*)['"]|(\S+))/,

    filter: function (str, args, words) {
      var end = (args[1] ? args[1].toLowerCase() : args[2].toLowerCase()).trim()

      return words.filter(function (v) {
        var w = v.w
        return w.substring(w.length - end.length, w.length) === end
      })
    }
  },

  // Check for the type of the words
  {
    regex: /(nouns?|verbs?|adjectives?|adverbs?)/,

    filter: function (str, args, words) {
      var condition = typeCheck.main(str);

      if (condition.includes("!noun")) {
        words = words.filter(function (v) {
          return v.t !== "noun";
        })
      }

      if (condition.includes("!adjective")) {
        words = words.filter(function (v) {
          return v.t !== "adjective";
        })
      }

      if (condition.includes("!adverb")) {
        words = words.filter(function (v) {
          return v.t !== "adverb";
        })
      }

      if (condition.includes("!verb")) {
        words = words.filter(function (v) {
          return v.t !== "verb";
        })
      }

      if (condition.includes(" adjective")) {
        words = words.filter(function (v) {
          return v.t === "adjective";
        })
      }

      if (condition.includes(" adverb")) {
        words = words.filter(function (v) {
          return v.t === "adverb";
        })
      }

      if (condition.includes(" noun")) {
        words = words.filter(function (v) {
          return v.t === "noun";
        })
      }

      if (condition.includes(" verb")) {
        words = words.filter(function (v) {
          return v.t === "verb";
        })
      }

      return words
    }
  },
]
