import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = ({ size, color = '#000000', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50" fill={color} {...props}>
    <G id="surface139238">
      <Path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: color,
          fillOpacity: 1,
        }}
        d="M 14.90625 -0.03125 C 14.863281 -0.0234375 14.820312 -0.0117188 14.78125 0 L 11.875 0 C 11.84375 0 11.8125 0 11.78125 0 C 11.320312 0.0390625 10.945312 0.386719 10.875 0.84375 C 10.875 0.84375 10.40625 4.164062 9.9375 7.6875 C 9.703125 9.449219 9.488281 11.25 9.3125 12.75 C 9.136719 14.25 9 15.371094 9 16 C 9 16.824219 9.335938 17.503906 9.75 18.21875 C 10.164062 18.933594 10.699219 19.65625 11.21875 20.3125 C 12.101562 21.433594 12.730469 22.089844 12.96875 22.34375 L 12 45.96875 C 12 45.980469 12 45.988281 12 46 C 12 47.335938 12.695312 48.449219 13.65625 49.09375 C 14.617188 49.738281 15.808594 50 17 50 C 18.191406 50 19.382812 49.738281 20.34375 49.09375 C 21.304688 48.449219 22 47.335938 22 46 C 22 45.988281 22 45.980469 22 45.96875 L 21 22.34375 C 21.230469 22.097656 21.890625 21.417969 22.78125 20.28125 C 23.296875 19.621094 23.835938 18.898438 24.25 18.1875 C 24.664062 17.476562 25 16.820312 25 16 C 25 15.382812 24.863281 14.277344 24.6875 12.78125 C 24.511719 11.285156 24.296875 9.484375 24.0625 7.71875 C 23.59375 4.183594 23.125 0.875 23.125 0.875 C 23.0625 0.371094 22.632812 -0.00390625 22.125 0 L 19.1875 0 C 19.054688 -0.0273438 18.914062 -0.0273438 18.78125 0 L 15.1875 0 C 15.097656 -0.0234375 15 -0.0351562 14.90625 -0.03125 Z M 38 0 C 37.070312 0 36.28125 0.449219 35.4375 1.09375 C 34.59375 1.738281 33.734375 2.632812 32.9375 3.71875 C 31.339844 5.890625 30 8.867188 30 12.15625 C 30 17.222656 31.046875 20.59375 32.09375 22.90625 C 32.617188 24.0625 33.140625 24.9375 33.5 25.625 C 33.859375 26.3125 34 26.785156 34 27 C 34 31.414062 32 36.46875 32 46 C 32 47.257812 32.519531 48.347656 33.375 49.03125 C 34.230469 49.714844 35.324219 50 36.5 50 C 37.675781 50 38.769531 49.714844 39.625 49.03125 C 40.480469 48.347656 41 47.257812 41 46 L 41 3.8125 C 41 2.8125 40.894531 1.945312 40.40625 1.1875 C 39.917969 0.429688 38.984375 0 38 0 Z M 12.75 2 L 14 2 L 14 15 C 13.996094 15.359375 14.183594 15.695312 14.496094 15.878906 C 14.808594 16.058594 15.191406 16.058594 15.503906 15.878906 C 15.816406 15.695312 16.003906 15.359375 16 15 L 16 2 L 18 2 L 18 15 C 17.996094 15.359375 18.183594 15.695312 18.496094 15.878906 C 18.808594 16.058594 19.191406 16.058594 19.503906 15.878906 C 19.816406 15.695312 20.003906 15.359375 20 15 L 20 2 L 21.25 2 C 21.347656 2.695312 21.65625 4.894531 22.0625 7.96875 C 22.296875 9.730469 22.542969 11.550781 22.71875 13.03125 C 22.894531 14.511719 23 15.734375 23 16 C 23 16.066406 22.835938 16.605469 22.5 17.1875 C 22.164062 17.769531 21.703125 18.445312 21.21875 19.0625 C 20.253906 20.296875 19.28125 21.3125 19.28125 21.3125 C 19.09375 21.503906 18.992188 21.765625 19 22.03125 L 20 46 C 20 46.011719 20 46.019531 20 46.03125 C 19.992188 46.710938 19.730469 47.097656 19.21875 47.4375 C 18.699219 47.785156 17.878906 48 17 48 C 16.121094 48 15.300781 47.785156 14.78125 47.4375 C 14.269531 47.097656 14.007812 46.710938 14 46.03125 L 14 46 L 15 22.03125 C 15.007812 21.765625 14.90625 21.503906 14.71875 21.3125 C 14.71875 21.3125 13.746094 20.285156 12.78125 19.0625 C 12.300781 18.449219 11.835938 17.800781 11.5 17.21875 C 11.164062 16.636719 11 16.101562 11 16 C 11 15.707031 11.105469 14.484375 11.28125 13 C 11.457031 11.515625 11.703125 9.695312 11.9375 7.9375 C 12.347656 4.863281 12.652344 2.675781 12.75 2 Z M 38 2 C 38.546875 2 38.589844 2.082031 38.71875 2.28125 C 38.847656 2.480469 39 2.984375 39 3.8125 L 39 46 C 39 46.78125 38.792969 47.160156 38.40625 47.46875 C 38.019531 47.777344 37.363281 48 36.5 48 C 35.636719 48 35.011719 47.777344 34.625 47.46875 C 34.238281 47.160156 34 46.777344 34 46 C 34 36.75 36 31.980469 36 27 C 36 26.15625 35.640625 25.472656 35.25 24.71875 C 34.859375 23.964844 34.382812 23.121094 33.90625 22.0625 C 32.953125 19.949219 32 16.953125 32 12.15625 C 32 9.414062 33.136719 6.800781 34.53125 4.90625 C 35.226562 3.957031 35.996094 3.191406 36.65625 2.6875 C 37.316406 2.183594 37.910156 2 38 2 Z M 38 2 "
      />
    </G>
  </Svg>
);

export default SvgComponent;
