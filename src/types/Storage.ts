export enum Feature {
  COPY_FEATURE = "COPY_FEATURE",
  STORE_REVIEW = "STORE_REVIEW",
}
export enum UsageLog {
  COPIES_COUNT = "COPIES_COUNT",
  SEARCHES_COUNT = "SEARCHES_COUNT",
  LETTERS_COUNT = "LETTERS_TYPED",
  OPENINGS_ON_MONDAY = "OPENINGS_ON_MONDAY",
  OPENINGS_ON_TUESDAY = "OPENINGS_ON_TUESDAY",
  OPENINGS_ON_WEDNESDAY = "OPENINGS_ON_WEDNESDAY",
  OPENINGS_ON_THURSDAY = "OPENINGS_ON_THURSDAY",
  OPENINGS_ON_FRIDAY = "OPENINGS_ON_FRIDAY",
  OPENINGS_ON_SATURDAY = "OPENINGS_ON_SATURDAY",
  OPENINGS_ON_SUNDAY = "OPENINGS_ON_SUNDAY",
}

export const StorageDefaults = {
  history: ["🔥", "🌸", "🌱", "🍣", "🍋", "🐔"],
  onboarding: Object.keys(Feature).reduce(
    (data, feature) => ({
      ...data,
      [feature]: false,
    }),
    {}
  ),
  usagelogs: Object.keys(UsageLog).reduce(
    (data, usagelog) => ({
      ...data,
      [usagelog]: 0,
    }),
    {}
  ),
};

export type StorageHistory = string[];

export type StorageOnboarding = Record<keyof typeof Feature, boolean>;
