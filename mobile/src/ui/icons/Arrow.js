import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={34} height={10} fill="none" viewBox="0 0 34 10" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.275.056c-.257 0-.518.046-.772.144l-13.56 5.162L3.38.2a2.167 2.167 0 1 0-1.542 4.05L16.942 10l15.104-5.75a2.167 2.167 0 0 0-.771-4.194z"
      fill={props.color}
    />
  </Svg>
);

export default SvgComponent;
