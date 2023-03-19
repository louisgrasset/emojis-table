import { useCallback, useMemo, useState } from "react";
import { Feature } from "../types/Storage";
import { markOnboardingFeatureAsSeen } from "../helpers/mark-onboarding-feature-as-seen";

interface OnboardingProps {
  feature: Feature;
}

export const Onboarding = ({ feature }: OnboardingProps) => {
  const [visible, setVisible] = useState(true);
  const markAsSeen = useCallback(() => {
    markOnboardingFeatureAsSeen(feature);
    setVisible(false);
  }, [feature]);
  const content = useMemo(() => {
    switch (feature) {
      case Feature.COPY_FEATURE:
        return (
          <>
            <div className="onboarding__content-icon">📋</div>
            <h2 className="onboarding__content-title">Copy</h2>
            <p className="onboarding__content-description">
              To copy an emoji, simply <b>click</b> on it! Then, you can paste
              it anywhere you want
            </p>

            <div
              title={"Close"}
              onClick={markAsSeen}
              className="onboarding__content-close"
            >
              ×
            </div>
          </>
        );
    }
  }, [feature]);
  return visible ? (
    <div className="onboarding">
      <div className="onboarding__content">{content}</div>
    </div>
  ) : null;
};
