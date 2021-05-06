import './App.scss';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { browser } from "webextension-polyfill-ts";
import { AutoSizer, Grid } from 'react-virtualized';

import Search from './Search';

const emojis = require("emojilib");

function App() {

  const [search, setSearch] = useState('');
  let columnCount = 5;

  const emojisData = useMemo(
    () => Object.keys(emojis)
      .map((e: any) => (({ character: e, keywords: emojis[e].map((k: string) => k.replace(/[_-]/g, " ")) }))),
    []);

  let placeholder = useMemo(() => emojisData[Math.floor(Math.random() * emojisData.length)].keywords[0], [emojisData]);

  const emojisList = useMemo(
    () => emojisData.filter(e => search.length > 0 ? (e.keywords.filter((k: string) => k.includes(search)).length ? e : null) : e),
    [search, emojisData]);

  const emojisCharacters = useMemo(() => emojisList.map(e => e.character), [emojisList]);
  let rowCount = useMemo(() => Math.ceil(emojisCharacters.length / columnCount), [emojisCharacters, columnCount])
  const [emojisHistory, setEmojisHistory] = useState<{ emojis: string[] }>({ emojis: [] });

  useEffect(() => {
    browser.storage.local.get('history').then((data: any) => {
      setEmojisHistory({ emojis: (data?.history ? data.history : ['🍋', '🍣', '🌱', '🌸', '🔥']) });
    })
  }, [])

  useEffect(() => {
    browser.storage.local.set({ 'history': emojisHistory.emojis });
  }, [emojisHistory])

  const saveEmoji = useCallback((e: string) => {
    let history: string[] = emojisHistory.emojis ? emojisHistory.emojis : [];
    if (!history.includes(e)) {
      if (history.length === columnCount) {
        history.pop();
      }
      history.unshift(e);
      setEmojisHistory({ emojis: history });
    }
  }, [emojisHistory, columnCount]);

  const copyEmoji = useCallback((e: string) => {
    const clipboard = navigator.clipboard;
    clipboard.writeText(e).then(() => saveEmoji(e))
  }, [saveEmoji]);
  return (
    <div className="app" >
      <Search search={search} setSearch={setSearch} placeholder={placeholder}></Search>
      <div className="emojis-list--emojis-history" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
        {
          emojisHistory.emojis?.map((emoji, key) => (
            <div className={'emojis-list__item'} key={key} onClick={() => copyEmoji(emoji)}>
              {emoji}
            </div>
          ))
        }
      </div>
      {
        emojisCharacters.length === 0 && (
          <div className="emojis-list--emojis-note">
            <h1>😔</h1>
            <p>Nothing...</p>
          </div>
        )
      }
      <div style={{ position: 'relative', height: 'calc(100% - 7rem)' }}>
        {
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  const emoji = emojisCharacters[rowIndex * columnCount + columnIndex];
                  return <div className={'emojis-list__item'} key={key} style={style} onClick={() => copyEmoji(emoji)}>
                    {emoji}
                  </div>
                }
                }
                className={'emojis-list'}
                columnWidth={width / columnCount}
                columnCount={columnCount}
                height={height}
                overscanColumnCount={0}
                overscanRowCount={0}
                rowHeight={50}
                rowCount={rowCount}
                width={width}
              />
            )}
          </AutoSizer>
        }
      </div>
    </div>
  );
}

export default App;
