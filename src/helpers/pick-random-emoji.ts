import emojidbRaw from "../data/emojidb-raw.json";

export const pickRandomEmoji = () =>
  emojidbRaw[Math.floor(Math.random() * emojidbRaw.length)];
