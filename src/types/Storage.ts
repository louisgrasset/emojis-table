export enum Feature {
  COPY_FEATURE = "COPY_FEATURE",
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
};

export type StorageHistory = string[];

export type StorageOnboarding = Record<keyof typeof Feature, boolean>;
