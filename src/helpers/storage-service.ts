import { StorageDefaults } from "../types/Storage";

const migrateHistory = (prev: any): void => {
  // Reset storage when not set or malformed
  if (!prev || !Array.isArray(prev) || prev.length !== 6) {
    void chrome.storage.sync.set({ history: StorageDefaults.history });
  }
};

const migrateOnboarding = (prev: any): void => {
  let onboarding = StorageDefaults.onboarding;
  if (prev) {
    onboarding = {
      ...onboarding,
      ...Object.keys(StorageDefaults.onboarding).reduce((acc, feature) => {
        const prevFeatureStatus = prev?.[feature];
        return {
          ...acc,
          [feature]: prevFeatureStatus || false,
        };
      }, {}),
    };
  }
  void chrome.storage.sync.set({ onboarding });
};

export const storageService = () => {
  // Clear previous extension history
  void chrome.storage.local.clear();

  // Migrate storage
  void chrome.storage.sync.get(null).then((data) => {
    migrateHistory(data?.history);
    migrateOnboarding(data?.onboarding);
  });
};
