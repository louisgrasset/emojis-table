import './App.scss';

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { browser } from "webextension-polyfill-ts";

import { History } from './components/History';
import { List } from './components/List';
import { Search } from './components/Search';
import { Attribution } from './components/Attribution';

const rawEmojis = require("emojilib");

function App() {
  const elementRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [columnCount, setColumnCount] = useState(5);
  const [emojisHistory, setEmojisHistory] = useState<{ emojis: string[] }>({ emojis: ['🍋', '🍣', '🌱', '🌸', '🔥'] });

  const emojis = useMemo(
    () => Object.keys(rawEmojis)
      .map((e: any) => (({ character: e, keywords: rawEmojis[e].map((k: string) => k.replace(/[_-]/g, " ")) }))),
    []);

  const placeholder = useMemo(() => emojis[Math.floor(Math.random() * emojis.length)].keywords[0], [emojis]);

  const emojisFiltered = useMemo(
    () => emojis.filter(e => search.length > 0 ? (e.keywords.filter((k: string) => k.includes(search)).length ? e : null) : e),
    [search, emojis]);

  const emojisCharacters = useMemo(() => emojisFiltered.map(e => e.character), [emojisFiltered]);

  let rowCount = useMemo(() => Math.ceil(emojisCharacters.length / columnCount), [emojisCharacters, columnCount])

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


  useEffect(() => {
    browser.storage.local.get('history').then((data: any) => {
      setEmojisHistory({ emojis: (data?.history ? data.history : ['🍋', '🍣', '🌱', '🌸', '🔥']) });
    })
  }, [])

  useEffect(() => {
    browser.storage.local.set({ 'history': emojisHistory.emojis });
  }, [emojisHistory])

  useEffect(() => {
    window.addEventListener('resize', handleColumns);
    return () => window.removeEventListener('resize', handleColumns);
  }, [handleColumns])

  return (
    <div className="app" ref={elementRef}>
      <Search search={search} setSearch={setSearch} placeholder={placeholder} />
      <History history={emojisHistory} copyEmoji={copyEmoji} />
      <List emojis={emojisCharacters} copyEmoji={copyEmoji} rowCount={rowCount} columnCount={columnCount} />
    </div>
  );
}

export default App;
