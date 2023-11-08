import { useEffect, useState } from "react";

import { EmojiItem } from "./emoji-item";

interface HistoryProps {
  lastUpdateTimestamp: number;
  triggerNotification: () => void;
}

export const History = ({
  lastUpdateTimestamp,
  triggerNotification,
}: HistoryProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const retrieveHistory = () => {
    chrome.storage.sync.get(["history"]).then((data) => {
      if (data) {
        setHistory(data.history);
      }
    });
  };

  // Retrieve potential saved history
  useEffect(() => {
    retrieveHistory();
  }, []);

  useEffect(() => {
    setTimeout(retrieveHistory, 50);
  }, [lastUpdateTimestamp]);

  return (
    <section className="section-history">
      {history.map((emoji) => (
        <EmojiItem
          triggerUpdate={triggerNotification}
          key={emoji}
          emoji={emoji}
        />
      ))}
    </section>
  );
};
