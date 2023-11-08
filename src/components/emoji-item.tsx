import { useCallback } from "react";

import { addToHistory } from "../helpers/add-to-history";
import { incrementUsageLogUpdate } from "../helpers/increment-usage-log-update";
import { onCopyHandler } from "../helpers/on-copy-handler";
import { UsageLog } from "../types/Storage";

interface EmojiItemProps {
  emoji: string;
  triggerUpdate?: () => void;
}

export const EmojiItem = ({ emoji, triggerUpdate }: EmojiItemProps) => {
  const onClickHander = useCallback(() => {
    onCopyHandler(emoji);
    addToHistory(emoji);
    incrementUsageLogUpdate(UsageLog.COPIES_COUNT);
    if (triggerUpdate) {
      triggerUpdate();
    }
  }, [emoji]);

  return (
    <div className="emoji-item" onClick={onClickHander}>
      {emoji}
    </div>
  );
};
