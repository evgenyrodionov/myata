import React from 'react';

const SvgComponent = ({ size, color = '#000000', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill={color} {...props}>
    <g id="surface806016">
      <path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: color,
          fillOpacity: 1,
        }}
        d="M 9 4 C 6.253906 4 4 6.253906 4 9 L 4 41 C 4 43.746094 6.253906 46 9 46 L 41 46 C 43.746094 46 46 43.746094 46 41 L 46 9 C 46 6.253906 43.746094 4 41 4 Z M 9 6 L 41 6 C 42.65625 6 44 7.34375 44 9 L 44 41 C 44 42.65625 42.65625 44 41 44 L 9 44 C 7.34375 44 6 42.65625 6 41 L 6 9 C 6 7.34375 7.34375 6 9 6 Z M 17 14 L 17 36 L 21 36 L 21 28 L 29 28 C 32.308594 28 35 25.308594 35 22 L 35 20 C 35 16.691406 32.308594 14 29 14 Z M 21 18 L 29 18 C 30.101562 18 31 18.898438 31 20 L 31 22 C 31 23.101562 30.101562 24 29 24 L 21 24 Z M 21 18 "
      />
    </g>
  </svg>
);

export default SvgComponent;
