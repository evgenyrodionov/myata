import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = ({ size, color = '#000000', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50" fill={color} {...props}>
    <G id="surface139233">
      <Path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: color,
          fillOpacity: 1,
        }}
        d="M 11 11 C 4.9375 11 0 15.9375 0 22 C 0 24.347656 0.746094 26.519531 2 28.308594 L 2 42.003906 C 2 43.664062 3.339844 45 5 45 L 7.09375 45 C 7.570312 47.828125 10.039062 50 13 50 C 15.960938 50 18.429688 47.828125 18.90625 45 L 28.15625 45 C 28.898438 45 29.574219 44.699219 30.082031 44.226562 C 30.59375 44.679688 31.246094 44.992188 31.992188 45 L 33.09375 45 C 33.570312 47.828125 36.039062 50 39 50 C 42.300781 50 45 47.300781 45 44 C 45 40.699219 42.300781 38 39 38 C 36.039062 38 33.570312 40.171875 33.09375 43 L 32.007812 43 C 31.820312 43 31.539062 42.882812 31.328125 42.671875 C 31.113281 42.457031 31 42.183594 31 42 L 31 23 C 31 22.625 31.625 22 32 22 L 40 22 C 40.792969 22 41.921875 22.867188 42.6875 23.785156 L 42.84375 24 L 38 24 C 36.40625 24 35 25.289062 35 27 L 35 31 C 35 31.832031 35.386719 32.550781 35.917969 33.082031 C 36.449219 33.613281 37.167969 34 38 34 L 48 34 L 48 42 C 48 42.375 47.375 43 47 43 L 45 43 L 45 45 L 47 45 C 48.660156 45 50 43.660156 50 42 L 50 32.386719 C 50 30.097656 48.402344 28.074219 48.402344 28.074219 L 48.390625 28.0625 L 44.246094 22.535156 L 44.230469 22.515625 C 43.308594 21.402344 41.914062 20 40 20 L 32 20 C 31.644531 20 31.3125 20.070312 31 20.183594 L 31 17.90625 C 31 16.371094 29.789062 15 28.1875 15 L 19.480469 15 C 17.457031 12.558594 14.40625 11 11 11 Z M 11 13 C 15.980469 13 20 17.019531 20 22 C 20 26.980469 15.980469 31 11 31 C 6.019531 31 2 26.980469 2 22 C 2 17.019531 6.019531 13 11 13 Z M 10.984375 13.984375 C 10.433594 13.996094 9.992188 14.449219 10 15 L 10 20.78125 C 9.632812 21.082031 9.421875 21.527344 9.421875 22 C 9.421875 22.050781 9.425781 22.101562 9.429688 22.15625 L 7.292969 24.292969 C 7.03125 24.542969 6.925781 24.917969 7.019531 25.265625 C 7.109375 25.617188 7.382812 25.890625 7.734375 25.980469 C 8.082031 26.074219 8.457031 25.96875 8.707031 25.707031 L 10.84375 23.570312 C 10.894531 23.574219 10.949219 23.578125 11 23.578125 C 11.871094 23.578125 12.578125 22.871094 12.578125 22 C 12.578125 21.527344 12.367188 21.082031 12 20.78125 L 12 15 C 12.003906 14.730469 11.898438 14.46875 11.707031 14.277344 C 11.515625 14.085938 11.253906 13.980469 10.984375 13.984375 Z M 20.785156 17 L 28.1875 17 C 28.617188 17 29 17.414062 29 17.90625 L 29 22.980469 C 29 22.988281 29 22.992188 29 23 L 29 42 C 29 42.007812 29 42.011719 29 42.015625 L 29 42.15625 C 29 42.628906 28.628906 43 28.15625 43 L 18.90625 43 C 18.429688 40.171875 15.960938 38 13 38 C 10.039062 38 7.570312 40.171875 7.09375 43 L 5 43 C 4.625 43 4 42.375 4 42.003906 L 4 30.472656 C 5.902344 32.050781 8.34375 33 11 33 C 17.0625 33 22 28.0625 22 22 C 22 20.199219 21.558594 18.5 20.785156 17 Z M 38 26 L 44.34375 26 L 46.773438 29.238281 C 46.777344 29.246094 47.691406 30.804688 47.882812 32 L 38 32 C 37.832031 32 37.550781 31.886719 37.332031 31.667969 C 37.113281 31.449219 37 31.167969 37 31 L 37 27 C 37 26.496094 37.59375 26 38 26 Z M 13 40 C 15.222656 40 17 41.777344 17 44 C 17 46.222656 15.222656 48 13 48 C 10.777344 48 9 46.222656 9 44 C 9 41.777344 10.777344 40 13 40 Z M 39 40 C 41.222656 40 43 41.777344 43 44 C 43 46.222656 41.222656 48 39 48 C 36.777344 48 35 46.222656 35 44 C 35 41.777344 36.777344 40 39 40 Z M 39 40 "
      />
    </G>
  </Svg>
);

export default SvgComponent;
