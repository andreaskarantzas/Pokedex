import Color from "color";

interface ColorProps {
  [key: string]: string;
}
export const ThemeColors: ColorProps = {
  primaryColor: "#0F60AA",
  secondaryColor: "darkslategray",
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
  bug: "#abc635",
  dragon: "#027dc7",
  electric: "#f9e16e",
  fairy: "#f2a4e7",
  fighting: "#e3434c",
  fire: "#fbab48",
  flying: "#a4bfef",
  ghost: "#7473d1",
  grass: "#5bc173",
  ground: "#d49262",
  ice: "#8bdcd2",
  normal: "#a0a29f",
  poison: "#bd62d2",
  psychic: "#fd998e",
  rock: "#d5ca8f",
  steel: "#59a2a9",
  water: "#68b8e4",
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

/**
 * returns the color hex value when a key is specified
 * @param key
 */
export const getColorValueByKey = (key: string) => {
  if (Colors.hasOwnProperty(key)) {
    return Colors[key];
  }
  return Colors["transparent"];
};
