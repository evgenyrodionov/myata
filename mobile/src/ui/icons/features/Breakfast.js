import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50" fill="#000000" {...props}>
    <G id="surface138428">
      <Path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: '#000000',
          fillOpacity: 1,
        }}
        d="M 22 5 C 16.722656 5 11.921875 5.234375 8.304688 6.222656 C 6.492188 6.714844 4.960938 7.398438 3.824219 8.421875 C 2.6875 9.445312 2 10.867188 2 12.5 C 2 14.621094 2.894531 16.328125 4.359375 17.433594 C 4.757812 17.734375 5 18.277344 5 18.863281 L 5 40 C 5 42.199219 6.800781 44 9 44 L 41.167969 44 C 43.277344 44 45 42.1875 45 40 L 45 18.863281 C 45 18.191406 45.195312 17.664062 45.503906 17.40625 C 46.789062 16.347656 48 14.71875 48 12.5 C 48 10.890625 47.382812 9.484375 46.332031 8.453125 C 45.28125 7.417969 43.855469 6.726562 42.183594 6.226562 C 38.9375 5.261719 34.675781 5.019531 30 5.007812 L 30 5 Z M 29.582031 7 C 34.355469 7 38.65625 7.265625 41.613281 8.148438 C 43.09375 8.585938 44.214844 9.175781 44.929688 9.875 C 45.644531 10.578125 46 11.359375 46 12.5 C 46 14.015625 45.242188 15.03125 44.234375 15.863281 C 43.285156 16.644531 43 17.816406 43 18.863281 L 43 40 C 43 41.128906 42.097656 42 41.167969 42 L 19.703125 42 C 18.773438 42 18 41.179688 18 40 L 18 18.863281 C 18 17.714844 17.527344 16.601562 16.636719 15.863281 C 15.652344 15.054688 15 14.0625 15 12.5 C 15 11.304688 15.296875 10.476562 15.855469 9.796875 C 16.414062 9.117188 17.28125 8.5625 18.515625 8.132812 C 20.976562 7.277344 24.808594 7 29.582031 7 Z M 15.859375 7.179688 C 15.261719 7.558594 14.738281 8.003906 14.308594 8.53125 C 13.445312 9.585938 13 10.945312 13 12.5 C 13 14.671875 14.050781 16.324219 15.363281 17.40625 C 15.730469 17.710938 16 18.292969 16 18.863281 L 16 40 C 16 40.71875 16.195312 41.402344 16.515625 42 L 9 42 C 7.882812 42 7 41.117188 7 40 L 7 18.863281 C 7 17.730469 6.539062 16.574219 5.5625 15.839844 C 4.527344 15.054688 4 14.113281 4 12.5 C 4 11.382812 4.375 10.617188 5.164062 9.90625 C 5.949219 9.195312 7.199219 8.597656 8.828125 8.152344 C 10.730469 7.632812 13.15625 7.347656 15.859375 7.179688 Z M 23 13 C 22.449219 13 22 13.449219 22 14 C 22 14.550781 22.449219 15 23 15 C 23.550781 15 24 14.550781 24 14 C 24 13.449219 23.550781 13 23 13 Z M 38 13 C 37.449219 13 37 13.449219 37 14 C 37 14.550781 37.449219 15 38 15 C 38.550781 15 39 14.550781 39 14 C 39 13.449219 38.550781 13 38 13 Z M 29.5 18 C 28.671875 18 28 18.671875 28 19.5 C 28 20.328125 28.671875 21 29.5 21 C 30.328125 21 31 20.328125 31 19.5 C 31 18.671875 30.328125 18 29.5 18 Z M 37.5 23 C 36.671875 23 36 23.671875 36 24.5 C 36 25.328125 36.671875 26 37.5 26 C 38.328125 26 39 25.328125 39 24.5 C 39 23.671875 38.328125 23 37.5 23 Z M 23.5 25 C 22.671875 25 22 25.671875 22 26.5 C 22 27.328125 22.671875 28 23.5 28 C 24.328125 28 25 27.328125 25 26.5 C 25 25.671875 24.328125 25 23.5 25 Z M 29 30 C 28.449219 30 28 30.449219 28 31 C 28 31.550781 28.449219 32 29 32 C 29.550781 32 30 31.550781 30 31 C 30 30.449219 29.550781 30 29 30 Z M 35.5 34 C 34.671875 34 34 34.671875 34 35.5 C 34 36.328125 34.671875 37 35.5 37 C 36.328125 37 37 36.328125 37 35.5 C 37 34.671875 36.328125 34 35.5 34 Z M 22 36 C 21.449219 36 21 36.449219 21 37 C 21 37.550781 21.449219 38 22 38 C 22.550781 38 23 37.550781 23 37 C 23 36.449219 22.550781 36 22 36 Z M 22 36 "
      />
    </G>
  </Svg>
);

export default SvgComponent;
