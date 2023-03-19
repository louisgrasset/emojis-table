import { useEffect, useState } from "react";
import { Feature } from "../types/Storage";

export const useOnboarding = (
  requestedFeatures: Feature[]
): Record<string, boolean | null> => {
  const [features, setFeatures] = useState(
    requestedFeatures.reduce((acc, feat) => ({ ...acc, [feat]: null }), {})
  );

  useEffect(() => {
    chrome.storage.sync.get(["onboarding"]).then((data) => {
      const value = Object.keys(data.onboarding).reduce((acc, feature) => {
        return requestedFeatures.toString().includes(feature)
          ? { ...acc, [feature]: data.onboarding[feature] }
          : acc;
      }, {});
      setFeatures(value);
    });
  }, []);

  return features;
};
