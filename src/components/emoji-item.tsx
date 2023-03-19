import { onCopyHandler } from "../helpers/on-copy-handler";
import { useCallback } from "react";
import { addToHistory } from "../helpers/add-to-history";

interface EmojiItemProps {
  emoji: string;
  triggerUpdate?: () => void;
}

export const EmojiItem = ({ emoji, triggerUpdate }: EmojiItemProps) => {
  const onClickHander = useCallback(() => {
    onCopyHandler(emoji);
    addToHistory(emoji);
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
