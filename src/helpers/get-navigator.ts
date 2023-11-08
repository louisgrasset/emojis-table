import { Navigator } from "../types/Navigator";

export const getNavigator = (): Navigator | undefined => {
  const userAgent = navigator.userAgent;

  if (/chrome|chromium|crios/i.exec(userAgent)) {
    return Navigator.CHROMIUM;
  } else if (/firefox|fxios/i.exec(userAgent)) {
    return Navigator.FIREFOX;
  }
  return undefined;
};
