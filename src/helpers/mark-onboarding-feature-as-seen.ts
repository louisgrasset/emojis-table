import { Feature } from "../types/Storage";

export const markOnboardingFeatureAsSeen = (feature: Feature) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["onboarding"]).then((data) => {
      const updatedOnboarding = data.onboarding;
      updatedOnboarding[feature] = true;

      console.log(feature, data);
      chrome.storage.sync
        .set({ onboarding: updatedOnboarding })
        .then(resolve)
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  });
};
