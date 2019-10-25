import React from 'react';
import Svg, { Path, LinearGradient, Stop } from 'react-native-svg';

import { colorsToGradient } from '../../colorsToGradient'

const SvgComponent = ({
  size,
  color = '#000000',
  withGradient = false,
  ...props
}) => {
  const [start, end] = colorsToGradient[color.toLowerCase()];

  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" {...props}>
      {withGradient && (
        <LinearGradient id="grad" y1="0" y2={size}>
          <Stop offset="0" stopColor={start} stopOpacity="1" />
          <Stop offset="1" stopColor={end} stopOpacity="1" />
        </LinearGradient>
      )}

      <Path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: withGradient ? 'url(#grad)' : color,
          fillOpacity: 1,
        }}
        d="M 11.535156 3 C 9.460938 3 7.589844 4.292969 6.859375 6.234375 L 4.0625 13.644531 C 3.917969 14.03125 4.023438 14.464844 4.328125 14.742188 C 4.636719 15.019531 5.078125 15.078125 5.445312 14.894531 L 10.800781 12.21875 L 13.292969 14.707031 C 13.597656 15.011719 14.0625 15.085938 14.449219 14.894531 L 19.800781 12.21875 L 22.292969 14.707031 C 22.597656 15.011719 23.0625 15.085938 23.449219 14.894531 L 28.800781 12.21875 L 31.292969 14.707031 C 31.53125 14.945312 31.878906 15.050781 32.210938 14.976562 C 32.542969 14.90625 32.816406 14.671875 32.9375 14.355469 L 36.09375 5.976562 C 36.304688 5.40625 36.847656 5 37.5 5 C 38.339844 5 39 5.660156 39 6.5 L 39 10.796875 L 34.078125 22.613281 C 34.023438 22.738281 34 22.867188 34 23 L 34 45 L 6 45 L 6 23.203125 L 9.367188 15.171875 L 6.621094 16.542969 L 4.078125 22.613281 C 4.027344 22.734375 4 22.867188 4 23 L 4 46 C 4 46.554688 4.449219 47 5 47 L 45 47 C 45.550781 47 46 46.550781 46 46 L 46 23 C 46 22.867188 45.972656 22.738281 45.921875 22.613281 L 41 10.796875 L 41 6.5 C 41 4.636719 39.507812 3.105469 37.664062 3.015625 C 37.648438 3.015625 37.628906 3.011719 37.613281 3.007812 C 37.582031 3.003906 37.546875 3 37.515625 3 C 37.507812 3 37.503906 3 37.5 3 Z M 11.535156 5 L 34.433594 5 C 34.382812 5.105469 34.261719 5.164062 34.21875 5.273438 L 31.609375 12.199219 L 29.707031 10.292969 C 29.402344 9.988281 28.9375 9.914062 28.550781 10.105469 L 23.199219 12.78125 L 20.707031 10.292969 C 20.402344 9.988281 19.9375 9.914062 19.550781 10.105469 L 14.199219 12.78125 L 11.707031 10.292969 C 11.402344 9.988281 10.9375 9.914062 10.550781 10.105469 L 6.835938 11.964844 L 8.730469 6.941406 C 9.171875 5.769531 10.285156 5 11.535156 5 Z M 40 13.601562 L 44 23.199219 L 44 45 L 36 45 L 36 23.199219 Z M 13 28 C 12.449219 28 12 28.449219 12 29 L 12 39 C 12 39.550781 12.449219 40 13 40 L 27 40 C 27.550781 40 28 39.550781 28 39 L 28 29 C 28 28.449219 27.550781 28 27 28 Z M 14 30 L 26 30 L 26 38 L 14 38 Z M 14 30 "
      />
    </Svg>
  );
};

export default SvgComponent;
