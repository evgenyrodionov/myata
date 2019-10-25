import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Value = styled.p`
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #111;
`;

export default function({ isEdit, InputComponent, children, ...props }) {
  if (isEdit) {
    return InputComponent ? (
      React.createElement(InputComponent, props)
    ) : (
      <Input {...props} />
    );
  }

  return <Value {...props}>{children}</Value>;
}
