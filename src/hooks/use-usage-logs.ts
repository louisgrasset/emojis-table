import { useEffect, useState } from "react";

import { UsageLog } from "../types/Storage";

export const useUsageLogs = (usagelog: UsageLog): number | null => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get(["usagelogs"]).then((data) => {
      const value = data.usagelogs[usagelog];
      setValue(value);
    });
  }, []);

  return value;
};
