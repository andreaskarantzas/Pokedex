import Color from "color";

interface ColorProps {
  [key: string]: string;
}
export const ThemeColors: ColorProps = {
  primaryColor: "#0F60AA",
  secondaryColor: "#54C3F0",
  successColor: "#2FC403",
  successColorDarker: "#2c8703",
  errorColor: "#E73536",
  warningColor: "#E77725",
  selectionColor: "#eed93a",
  textColor: "#2E2E2E",
  white: "#FFFFFF",
  black: "#2e2e2e",
  charcoalGrey: "#4a4a4a",
  warmestGrey: "#6E6E6E",
  warmGrey: "#929292",
  lightGrey: "#CCCCCC",
  lightestGrey: "#E8E8E8",
  navBarColor: "#fafafa",
  screen: "#fcfcfc",
  transparent: "transparent",

  /** Pokemon type colors - copied from pokemon related wiki **/
  bug: "#B5C534",
  dragon: "#8656FA",
  electric: "#F9DF78",
  fairy: "#EFA7B7",
  fighting: "#BA5852",
  fire: "#F4934D",
  flying: "#B8A5F2",
  ghost: "#7D6B9B",
  grass: "#99D07D",
  ground: "#EDD081",
  ice: "#B3E1E1",
  normal: "#CDCDB9",
  poison: "#A768A7",
  psychic: "#F47DA1",
  rock: "#C5B059",
  steel: "#C1C1D1",
  water: "#85A5F0",
};

const enhanceColor = (colorObject: any, colorKey: string) => {
  const color = colorObject[colorKey];
  for (let i = 1; i < 10; i++) {
    const fade = i / 10;
    const colorIndex = 100 - i * 10;
    const newColor = Color(color).fade(fade).string();
    const newKey = `${colorKey}${colorIndex}`;
    colorObject[newKey] = newColor;
  }
};

const colorKeys = Object.keys(ThemeColors);
export const Colors = Object.assign({}, ThemeColors);
for (const colorKey of colorKeys) {
  enhanceColor(Colors, colorKey);
}

export const getColorValueByKey = (key: string) => {
  if (Colors.hasOwnProperty(key)) {
    return Colors[key];
  }
  throw new Error("Color not found");
};
