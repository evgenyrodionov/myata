import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props}>
    <G
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.color}
      strokeMiterlimit={10}
    >
      <Path
        d="M18.398 20h19.204m-6.403-6.398L37.602 20l-6.403 6.398"
        strokeWidth={1.6}
      />
      <Path
        d="M34.195 9.602C30.992 5.234 25.828 2.398 20 2.398 10.281 2.398 2.398 10.281 2.398 20c0 9.719 7.883 17.602 17.602 17.602 5.828 0 10.992-2.836 14.195-7.204"
        strokeWidth={1.6}
      />
    </G>
  </Svg>
);

export default SvgComponent;
