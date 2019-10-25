import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={9} height={9} fill="none" {...props}>
    <Circle opacity={0.4} cx={4.5} cy={4.5} r={4.5} fill="#fff" />
  </Svg>
);

export default SvgComponent;
