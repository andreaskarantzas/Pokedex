/**
 * Created by andreaskarantzas on 27.12.20.
 */

export const Capitalize = (s?: string) => {
  if (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return "";
};
