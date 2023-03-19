import { Feature } from "../types/Storage";

export const markOnboardingFeatureAsSeen = (feature: Feature) => {
  void chrome.storage.sync.get(["onboarding"]).then((data) => {
    const updatedOnboarding = data.onboarding;
    updatedOnboarding[feature] = true;

    void chrome.storage.sync
      .set({ onboarding: updatedOnboarding })
      .catch((err) => console.error(err));
  });
};
