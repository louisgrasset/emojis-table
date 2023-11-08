import { Emoji } from "../types/Emoji";
import { EmojiItem } from "./emoji-item";

interface EmojiGroupProps {
  group: string;
  data: Emoji[];
  triggerUpdate: () => void;
}

export const EmojiGroup = ({ group, data, triggerUpdate }: EmojiGroupProps) => {
  return (
    <div className="emoji-group">
      <h2 className={"emoji-group__name"}>{group}</h2>
      <div className={"emoji-group__list"}>
        {data.map((d) => (
          <EmojiItem
            triggerUpdate={triggerUpdate}
            key={d.slug}
            emoji={d.emoji}
          />
        ))}
      </div>
    </div>
  );
};
