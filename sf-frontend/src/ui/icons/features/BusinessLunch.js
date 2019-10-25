import React from 'react';

const SvgComponent = ({ size, color = '#000000', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill={color} {...props}>
    <g id="surface139404">
      <path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: color,
          fillOpacity: 1,
        }}
        d="M 10 2 C 5.59375 2 2 5.59375 2 10 C 2 14.40625 5.59375 18 10 18 C 14.40625 18 18 14.40625 18 10 C 18 5.59375 14.40625 2 10 2 Z M 10 4 C 13.324219 4 16 6.675781 16 10 C 16 13.324219 13.324219 16 10 16 C 6.675781 16 4 13.324219 4 10 C 4 6.675781 6.675781 4 10 4 Z M 35.8125 7 C 35.335938 7.089844 34.992188 7.511719 35 8 L 35 15 L 34 15 C 33.96875 15 33.9375 15 33.90625 15 C 33.355469 15.027344 32.925781 15.496094 32.953125 16.046875 C 32.980469 16.597656 33.449219 17.027344 34 17 L 48 17 C 48.359375 17.003906 48.695312 16.816406 48.878906 16.503906 C 49.058594 16.191406 49.058594 15.808594 48.878906 15.496094 C 48.695312 15.183594 48.359375 14.996094 48 15 L 47 15 L 47 12 C 47 11.449219 46.550781 11 46 11 L 44 11 L 44 8 C 44 7.449219 43.550781 7 43 7 L 36 7 C 35.96875 7 35.9375 7 35.90625 7 C 35.875 7 35.84375 7 35.8125 7 Z M 37 9 L 42 9 L 42 11.6875 C 41.941406 11.882812 41.941406 12.085938 42 12.28125 L 42 15 L 37 15 Z M 44 13 L 45 13 L 45 15 L 44 15 Z M 30.8125 18 C 30.261719 18.050781 29.855469 18.542969 29.90625 19.09375 C 29.957031 19.644531 30.449219 20.050781 31 20 L 46 20 C 46.359375 20.003906 46.695312 19.816406 46.878906 19.503906 C 47.058594 19.191406 47.058594 18.808594 46.878906 18.496094 C 46.695312 18.183594 46.359375 17.996094 46 18 L 31 18 C 30.96875 18 30.9375 18 30.90625 18 C 30.875 18 30.84375 18 30.8125 18 Z M 5 20 C 4.179688 20 2.203125 20.195312 0.84375 20.40625 C 0.46875 20.433594 0.140625 20.671875 -0.00390625 21.019531 C -0.148438 21.367188 -0.0859375 21.769531 0.160156 22.054688 C 0.40625 22.339844 0.789062 22.464844 1.15625 22.375 C 2.152344 22.222656 3.453125 22.117188 4.25 22.0625 L 9.03125 42.21875 C 9.144531 42.660156 9.542969 42.96875 10 42.96875 C 10.457031 42.96875 10.855469 42.660156 10.96875 42.21875 L 15.78125 22.03125 C 16.332031 22.046875 16.921875 22.058594 17.875 22.15625 C 18.53125 22.222656 19.210938 22.316406 19.71875 22.4375 C 20.207031 22.550781 20.511719 22.773438 20.46875 22.71875 C 20.46875 22.714844 20.503906 22.722656 20.5 22.71875 L 26.6875 31.875 C 26.855469 32.113281 27.113281 32.265625 27.402344 32.292969 C 27.691406 32.324219 27.976562 32.226562 28.1875 32.03125 L 34.40625 26 L 41.8125 26 C 41.570312 26.082031 41.414062 26.171875 41.15625 26.25 C 40.253906 26.519531 39.316406 26.761719 38.46875 27.03125 C 37.621094 27.300781 36.886719 27.488281 36.28125 28.09375 C 36.269531 28.113281 36.257812 28.136719 36.25 28.15625 C 36.25 28.15625 34.507812 30.160156 32.71875 32.25 C 31.824219 33.292969 30.9375 34.335938 30.21875 35.1875 C 29.5 36.039062 29.015625 36.578125 28.78125 36.90625 L 28.8125 36.90625 C 28.382812 37.480469 28.089844 37.765625 27.9375 37.875 C 27.785156 37.984375 27.773438 38 27.5 38 C 27.390625 38 27.265625 37.972656 27.03125 37.78125 C 26.796875 37.589844 26.507812 37.246094 26.15625 36.84375 L 21.75 31.84375 C 21.476562 31.53125 21.039062 31.421875 20.648438 31.570312 C 20.261719 31.714844 20.003906 32.085938 20 32.5 L 20 46 L 1 46 C 0.640625 45.996094 0.304688 46.183594 0.121094 46.496094 C -0.0585938 46.808594 -0.0585938 47.191406 0.121094 47.503906 C 0.304688 47.816406 0.640625 48.003906 1 48 L 21 48 C 21.550781 48 22 47.550781 22 47 L 22 35.15625 L 24.65625 38.15625 C 25.003906 38.554688 25.34375 38.953125 25.78125 39.3125 C 26.21875 39.671875 26.808594 40 27.5 40 C 28.023438 40 28.621094 39.839844 29.09375 39.5 C 29.566406 39.160156 29.9375 38.71875 30.40625 38.09375 C 30.421875 38.070312 31.003906 37.34375 31.71875 36.5 C 32.433594 35.65625 33.355469 34.574219 34.25 33.53125 C 36.019531 31.460938 37.691406 29.53125 37.71875 29.5 C 37.71875 29.5 37.75 29.46875 37.75 29.46875 C 37.777344 29.453125 38.316406 29.175781 39.0625 28.9375 C 39.828125 28.695312 40.800781 28.4375 41.75 28.15625 C 42.699219 27.875 43.625 27.582031 44.40625 27.15625 C 44.796875 26.945312 45.132812 26.683594 45.4375 26.34375 C 45.527344 26.242188 45.609375 26.121094 45.6875 26 L 46 26 C 48.210938 26 50 24.210938 50 22 C 50 21.449219 49.550781 21 49 21 L 29 21 C 28.96875 21 28.9375 21 28.90625 21 C 28.390625 21.046875 27.996094 21.480469 28 22 C 28 24.070312 29.578125 25.730469 31.59375 25.9375 L 27.65625 29.78125 L 22.03125 21.4375 C 21.996094 21.382812 21.953125 21.328125 21.90625 21.28125 C 21.378906 20.753906 20.804688 20.652344 20.15625 20.5 C 19.507812 20.347656 18.800781 20.226562 18.09375 20.15625 C 16.679688 20.011719 15.355469 20 15 20 C 14.535156 20.003906 14.132812 20.328125 14.03125 20.78125 L 10 37.71875 L 5.96875 20.78125 C 5.867188 20.328125 5.464844 20.003906 5 20 Z M 30.40625 23 L 47.59375 23 C 47.257812 23.566406 46.773438 24 46 24 L 32 24 C 31.226562 24 30.742188 23.566406 30.40625 23 Z M 30.40625 23 "
      />
    </g>
  </svg>
);

export default SvgComponent;
