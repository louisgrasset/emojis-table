import './App.scss';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

import Search from './Search';
import Attribution from './Attribution';

const emojis = require("emojilib");

function App() {
  const elementRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [columnCount, setColumnCount] = useState(5);
  const [emojisHistory, setEmojisHistory] = useState<{ emojis: string[] }>({ emojis: ['🍋', '🍣', '🌱', '🌸', '🔥'] });

  const emojisData = useMemo(
    () => Object.keys(emojis)
      .map((e: any) => (({ character: e, keywords: emojis[e].map((k: string) => k.replace(/[_-]/g, " ")) }))),
    []);

  const placeholder = useMemo(() => emojisData[Math.floor(Math.random() * emojisData.length)].keywords[0], [emojisData]);

  const emojisList = useMemo(
    () => emojisData.filter(e => search.length > 0 ? (e.keywords.filter((k: string) => k.includes(search)).length ? e : null) : e),
    [search, emojisData]);

  const emojisCharacters = useMemo(() => emojisList.map(e => e.character), [emojisList]);

  const rowCount = useMemo(() => Math.ceil(emojisCharacters.length / columnCount), [emojisCharacters, columnCount])
  const handleColumns = useCallback(() => { if (elementRef.current) { setColumnCount(Math.ceil(elementRef?.current.getBoundingClientRect().width / 60)) } }, [elementRef])

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

  const copyEmoji = useCallback((e: string) => navigator.clipboard.writeText(e).then(() => saveEmoji(e)), [saveEmoji]);

  useLayoutEffect(handleColumns, [elementRef, handleColumns]);

  useEffect(() => {
    window.addEventListener('resize', handleColumns);
    return () => window.removeEventListener('resize', handleColumns);
  }, [handleColumns])

  return (
    <div className="app" ref={elementRef}>
      <Attribution />
      <Search search={search} setSearch={setSearch} placeholder={placeholder}></Search>
      <div className="emojis-list--emojis-history">
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
