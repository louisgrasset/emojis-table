import { useCallback, useEffect, useMemo, useState } from "react";

import { getNavigator } from "../helpers/get-navigator";
import { markOnboardingFeatureAsSeen } from "../helpers/mark-onboarding-feature-as-seen";
import { useOnboarding } from "../hooks/use-onboarding";
import { useUsageLogs } from "../hooks/use-usage-logs";
import StoreChromium from "../icons/store-chromium.svg";
import StoreFirefox from "../icons/store-firefox.svg";
import { Navigator } from "../types/Navigator";
import { Feature, UsageLog } from "../types/Storage";

interface OnboardingProps {
  feature: Feature;
  markAsSeen: () => Promise<unknown>;
}

export const OnboardingComponent = ({
  feature,
  markAsSeen,
}: OnboardingProps) => {
  const [icon, setIcon] = useState<JSX.Element | string>("");
  const [title, setTitle] = useState<JSX.Element | string>("");
  const [description, setDescription] = useState<JSX.Element | string>("");
  const [action, setAction] = useState<JSX.Element | string>("");

  useEffect(() => {
    const navigator = getNavigator();
    const reviewHandler = () => {
      markAsSeen().then(() => {
        const url =
          navigator === Navigator.FIREFOX
            ? "https://addons.mozilla.org/firefox/addon/emojis-table/"
            : "https://chrome.google.com/webstore/detail/emojis-table/lkpflloaceieinnhchbmfefimjliigcj";

        window.open(url, "_blank");
      });
    };

    switch (feature) {
      case Feature.COPY_FEATURE:
        setIcon("📋");
        setTitle("Copy");
        setDescription(
          <>
            To copy an emoji, simply <b>click</b> on it! Then, you can paste it
            anywhere you want
          </>,
        );
        break;
      case Feature.STORE_REVIEW:
        setIcon(
          navigator === Navigator.FIREFOX ? (
            <StoreFirefox />
          ) : (
            <StoreChromium />
          ),
        );

        setTitle("Enjoying Emojis table?");
        setDescription(
          "We would love to hear your thoughts and feedback in a review.",
        );
        setAction(<button onClick={reviewHandler}>Leave a review</button>);
        break;
    }
  }, [feature]);

  return (
    <div className="onboarding">
      <div className="onboarding__content">
        <div className="onboarding__content-icon">{icon}</div>
        <h2 className="onboarding__content-title">{title}</h2>
        <p className="onboarding__content-description">{description}</p>
        <div className="onboarding__content-action">{action}</div>

        <div
          title={"Close"}
          onClick={markAsSeen}
          className="onboarding__content-close"
        >
          ×
        </div>
      </div>
    </div>
  );
};

export const Onboarding = () => {
  const {
    [Feature.COPY_FEATURE]: copyFeatureOnboardingSeen,
    [Feature.STORE_REVIEW]: storeReviewFeatureSeen,
  } = useOnboarding([Feature.COPY_FEATURE, Feature.STORE_REVIEW]);

  const copiesCount = useUsageLogs(UsageLog.COPIES_COUNT);
  const feature = useMemo(() => {
    if (!copyFeatureOnboardingSeen) {
      return Feature.COPY_FEATURE;
    } else if (!storeReviewFeatureSeen && copiesCount && copiesCount >= 20) {
      return Feature.STORE_REVIEW;
    }
  }, [copyFeatureOnboardingSeen, storeReviewFeatureSeen, copiesCount]);

  const [visible, setVisible] = useState(true);
  const markAsSeen = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (feature) {
        markOnboardingFeatureAsSeen(feature)
          .then(() => setVisible(false))
          .then(resolve)
          .catch(reject);
      }
    });
  }, [feature]);

  return feature && visible ? (
    <OnboardingComponent feature={feature} markAsSeen={markAsSeen} />
  ) : null;
};
