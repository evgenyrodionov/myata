import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props}>
    <Path
      d="M23.652 27.176s2.836-1.621 3.575-2.012c.742-.39 1.507-.492 1.972-.207.707.434 6.625 4.371 7.125 4.719.496.351.739 1.347.051 2.324-.684.977-3.832 4.84-5.164 4.8-1.336-.042-6.895-.167-17.371-10.644C3.367 15.68 3.242 10.121 3.2 8.786 3.155 7.448 7.022 4.3 8 3.616c.977-.683 1.977-.426 2.324.055.395.547 4.285 6.445 4.715 7.121.293.465.184 1.234-.207 1.977-.387.742-2.012 3.574-2.012 3.574s1.145 1.953 5.012 5.82c3.871 3.867 5.82 5.012 5.82 5.012zm0 0"
      fill="none"
      strokeWidth={1.6}
      stroke={props.color}
      strokeMiterlimit={10}
    />
  </Svg>
);

export default SvgComponent;
