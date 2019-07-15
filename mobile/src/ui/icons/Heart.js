import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M9.925 17.262l-.306-.253c-.482-.397-1.129-.836-1.875-1.344C4.778 13.647.297 10.599.297 5.737.297 2.75 2.751.32 5.767.32c1.614 0 3.124.7 4.158 1.9a5.48 5.48 0 0 1 4.158-1.9c3.016 0 5.47 2.43 5.47 5.417 0 4.862-4.481 7.91-7.447 9.928-.748.508-1.393.947-1.874 1.344l-.307.253z"
      fill={props.color}
    />
  </Svg>
);

export default SvgComponent;
