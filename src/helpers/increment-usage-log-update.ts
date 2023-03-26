import { UsageLog } from "../types/Storage";

export const incrementUsageLogUpdate = (usagelog: UsageLog): void => {
  void chrome.storage.sync.get(["usagelogs"]).then((data) => {
    const updatedUsagelogs = {
      ...data.usagelogs,
      [usagelog]: data.usagelogs[usagelog] + 1,
    };
    void chrome.storage.sync
      .set({ usagelogs: updatedUsagelogs })
      .catch((err) => console.error(err));
  });
};
