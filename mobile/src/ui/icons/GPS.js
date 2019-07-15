import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={props.size} height={props.size} viewBox="0 0 56 56" {...props}>
    <Path
      d="M19.175 36.825l22.4-22.4m0 0L2.036 29.187l17.14 7.637 7.637 17.14 14.764-39.54z"
      stroke={props.color}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
