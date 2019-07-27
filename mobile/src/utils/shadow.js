// eslint-disable-next-line import/prefer-default-export
export function elevationShadowStyle({
  elevation,
  shadowColor,
  shadowOpacity,
  shadowRadius,
  shadowOffsetWidthMultiplier,
  shadowOffsetHeightMultiplier,
}) {
  return {
    elevation,
    shadowColor,
    shadowOffset: {
      width: shadowOffsetWidthMultiplier
        ? shadowOffsetWidthMultiplier * elevation
        : 0,
      height: shadowOffsetHeightMultiplier
        ? shadowOffsetHeightMultiplier * elevation
        : 0,
    },
    shadowOpacity,
    shadowRadius: shadowRadius * elevation,
  };
}
