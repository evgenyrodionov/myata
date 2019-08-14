import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={50} height={50} viewBox="0 0 50 50" fill="#000000" {...props}>
    <Path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: props.color,
        fillOpacity: 1,
      }}
      d="M16 3C8.832 3 3 8.832 3 16v18c0 7.168 5.832 13 13 13h18c7.168 0 13-5.832 13-13V16c0-7.168-5.832-13-13-13zm0 2h18c6.086 0 11 4.914 11 11v18c0 6.086-4.914 11-11 11H16C9.914 45 5 40.086 5 34V16C5 9.914 9.914 5 16 5zm21 6a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-12 3c-6.063 0-11 4.938-11 11 0 6.063 4.938 11 11 11 6.063 0 11-4.938 11-11 0-6.063-4.938-11-11-11zm0 2c4.98 0 9 4.02 9 9s-4.02 9-9 9-9-4.02-9-9 4.02-9 9-9zm0 0"
    />
  </Svg>
);

export default SvgComponent;
