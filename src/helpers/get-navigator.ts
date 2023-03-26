import { Navigator } from "../types/Navigator";

export const getNavigator = (): Navigator | undefined => {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    return Navigator.CHROMIUM;
  } else if (userAgent.match(/firefox|fxios/i)) {
    return Navigator.FIREFOX;
  }
  return undefined;
};
