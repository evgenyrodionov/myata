import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = ({ size, color, ...props }) => (
  <Svg viewBox="0 0 50 50" width={size} height={size} fill={color} {...props}>
    <Path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z" />
  </Svg>
);

export default SvgComponent;
