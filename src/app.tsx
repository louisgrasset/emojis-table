import { useCallback, useEffect, useMemo, useState } from "react";
import { History } from "./components/history";
import emojidb from "./data/emojidb.json";
import { Emoji } from "./types/Emoji";
import "./styles/app.scss";
import { EmptyResult } from "./components/empty-result";
import { pickRandomEmoji } from "./helpers/pick-random-emoji";
import { EmojiGroup } from "./components/emoji-group";
import { Notification } from "./components/notification";
import { Onboarding } from "./components/onboarding";
import { incrementUsageLogUpdate } from "./helpers/increment-usage-log-update";
import { UsageLog } from "./types/Storage";

const DEBOUNCE_DURATION = 200;
function App() {
  const randomEmoji = useMemo(() => pickRandomEmoji(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedsearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const groups = useMemo(
    () => emojidb as unknown as Record<string, Emoji[]>,
    [emojidb],
  );
  const filteredGroups = useMemo(() => {
    return Object.entries(groups).map(
      ([group, data]) =>
        [
          group,
          debouncedSearchQuery.length > 0
            ? data.filter((emojiData) =>
                emojiData.description.some((description) =>
                  description.includes(debouncedSearchQuery),
                ),
              )
            : data,
        ] as [string, Emoji[]],
    );
  }, [debouncedSearchQuery]);

  const isResultEmpty = useMemo<boolean>(() => {
    if (searchQuery.length === 0) {
      return false;
    }

    return (
      filteredGroups.reduce((nonEmptyGroupsCount, [_group, data]) => {
        return data.length === 0
          ? nonEmptyGroupsCount
          : nonEmptyGroupsCount + 1;
      }, 0) === 0
    );
  }, [searchQuery, filteredGroups]);

  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0);

  const triggerNotificationHandler = useCallback(() => {
    setShowNotification(false);
    setTimeout(() => setShowNotification(true), 50);
  }, []);

  const triggerUpdateHandler = useCallback(() => {
    setLastUpdateTimestamp(Date.now());
    triggerNotificationHandler();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setShowNotification(false), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showNotification]);

  let debounceTimeout: number | NodeJS.Timeout;
  const debouncedSearch = useCallback((query: string) => {
    setSearchQuery(query);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setDebouncedsearchQuery(query);
      incrementUsageLogUpdate(UsageLog.SEARCHES_COUNT);
    }, DEBOUNCE_DURATION);
  }, []);

  return (
    <div className="app">
      <section className="section-search">
        <input
          autoFocus={true}
          type="text"
          placeholder={randomEmoji.description[0].toLowerCase()}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </section>
      <History
        triggerNotification={triggerNotificationHandler}
        lastUpdateTimestamp={lastUpdateTimestamp}
      />
      <section className="section-list">
        {isResultEmpty ? (
          <EmptyResult />
        ) : (
          filteredGroups.map(([group, data]) =>
            data.length ? (
              <EmojiGroup
                key={group}
                group={group}
                data={data}
                triggerUpdate={triggerUpdateHandler}
              />
            ) : null,
          )
        )}
      </section>
      {showNotification ? <Notification /> : null}
      <Onboarding />
    </div>
  );
}

export default App;
