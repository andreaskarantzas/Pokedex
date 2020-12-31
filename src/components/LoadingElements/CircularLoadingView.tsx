/**
 * Created by andreaskarantzas on 27.12.20.
 */

import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface CircularLoadingViewProps {
  size?: number;
  fullscreen?: boolean;
  thickness?: number;
  additionalText?: string;
}

export const CircularLoadingView: React.FC<CircularLoadingViewProps> = (
  props: CircularLoadingViewProps
) => {
  const { size, thickness, additionalText } = props;

  return (
    <div style={styles.container}>
      <CircularProgress size={size || 96} thickness={thickness} />
      {additionalText && <p style={styles.loadingText}>{additionalText}</p>}
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 32,
    flexDirection: "column" as "column",
  },
  loadingText: {
    marginTop: 30,
    fontSize: 26,
  },
};
