import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = ({ strokeWidth = 2, ...props }) => (
  <Svg width={props.size} height={props.size} viewBox="0 0 50 50" {...props}>
    <Path
      d="M33 11h9V2"
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      stroke={props.color}
      strokeMiterlimit={10}
    />
    <Path
      d="M41.7 10.7C37.7 6 31.7 3 25 3 12.8 3 3 12.8 3 25s9.8 22 22 22 22-9.8 22-22c0-3.602-.898-7.102-2.398-10.102"
      fill="none"
      strokeWidth={strokeWidth}
      stroke={props.color}
      strokeMiterlimit={10}
    />
    <Path
      d="M25 9v16l8 8"
      fill="none"
      strokeWidth={strokeWidth}
      stroke={props.color}
      strokeMiterlimit={10}
    />
    <Path d="M25 23a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm0 0" />
  </Svg>
);

export default SvgComponent;
