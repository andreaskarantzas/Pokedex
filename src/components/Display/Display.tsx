/**
 * Created by andreaskarantzas on 29.12.20.
 */
import React from "react";

export type DisplayProps = {
  enable?: boolean;
  children?: any;
  testID?: string;
};

/** conditionally renders a view **/
export const Display: React.FC<DisplayProps> = ({ children, enable }) => {
  if (enable) {
    return <div>{children}</div>;
  }
  return null;
};
