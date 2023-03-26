import { StorageDefaults, UsageLog } from "../types/Storage";
import { incrementUsageLogUpdate } from "./increment-usage-log-update";

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

const migrateUsagelogs = (prev: any): void => {
  let usagelogs = StorageDefaults.usagelogs;
  if (prev) {
    usagelogs = {
      ...usagelogs,
      ...Object.keys(StorageDefaults.usagelogs).reduce((acc, usagelog) => {
        const prevUsageLogCount = prev?.[usagelog];
        return {
          ...acc,
          [usagelog]: prevUsageLogCount || 0,
        };
      }, {}),
    };
  }
  void chrome.storage.sync.set({ usagelogs });
};

export const storageService = () => {
  // Clear previous extension history
  void chrome.storage.local.clear();

  // Migrate storage
  void chrome.storage.sync.get(null).then((data) => {
    migrateHistory(data?.history);
    migrateOnboarding(data?.onboarding);
    migrateUsagelogs(data?.usagelogs);
  });

  // Log usage on current day
  const dayOfWeek = new Date().getUTCDay();
  const correspondingLog = [
    UsageLog.OPENINGS_ON_SUNDAY,
    UsageLog.OPENINGS_ON_MONDAY,
    UsageLog.OPENINGS_ON_TUESDAY,
    UsageLog.OPENINGS_ON_WEDNESDAY,
    UsageLog.OPENINGS_ON_THURSDAY,
    UsageLog.OPENINGS_ON_FRIDAY,
    UsageLog.OPENINGS_ON_SATURDAY,
    UsageLog.OPENINGS_ON_SUNDAY,
  ];
  incrementUsageLogUpdate(correspondingLog[dayOfWeek]);
};
