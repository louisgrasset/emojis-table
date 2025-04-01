import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import descriptions from "emojilib" with { type: "json" };
import logUpdate from "log-update";
import emojis from "unicode-emoji-json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = `${__dirname}/../src/data/`;
const size = Object.keys(emojis).length;

const groups = new Set();
const data = Object.entries(emojis).map(([emoji, data], index) => {
  logUpdate(`🛠️Building emoji data [${index + 1}/${size}]...`);
  groups.add(data.group);

  return {
    ...data,
    emoji: emoji,
    description: descriptions[emoji]
      ? [data.name, ...descriptions[emoji]]
      : [data.name],
  };
});
logUpdate(`✔️Build of ${size} emojis data finished!`);
logUpdate.done();

const dataByGroup = {};
groups.forEach((group) => {
  let count = 0;
  dataByGroup[group] = Object.values(data).filter((d) => {
    logUpdate(`🛠 Grouping emoji data for group "${group}" - ${d.emoji}`);
    const result = d.group === group;
    if (result) {
      count++;
    }
    return result;
  });
  logUpdate(`✔️Group "${group}" finished [${count} emojis]!`);
  logUpdate.done();
});

logUpdate(`✏️️️Writing database to file...`);
writeFileSync(`${filePath}/emojidb-raw.json`, JSON.stringify(data), {
  encoding: "utf-8",
});
writeFileSync(`${filePath}/emojidb.json`, JSON.stringify(dataByGroup), {
  encoding: "utf-8",
});
logUpdate(`✔️Database written to file!`);
