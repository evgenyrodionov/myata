import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={17} height={20} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.147 0c1.222 0 2.217.987 2.217 2.201V17.8A2.211 2.211 0 0 1 14.147 20H2.217A2.212 2.212 0 0 1 0 17.799V2.2C0 .987.994 0 2.217 0h11.93zm-.096 17.192V3.242c0-.47-.364-.851-.811-.851H3.124c-.448 0-.812.382-.812.85v13.951c0 .47.364.851.812.851H13.24c.447 0 .811-.381.811-.85zM4.024 6.304a.734.734 0 0 1 0-1.467h8.315a.734.734 0 1 1 0 1.467H4.024zm-.734 2.69c0 .406.329.734.734.734h8.315a.734.734 0 1 0 0-1.467H4.024a.734.734 0 0 0-.734.733zm.734 4.158a.734.734 0 0 1 0-1.467h4.402a.734.734 0 0 1 0 1.467H4.024z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
