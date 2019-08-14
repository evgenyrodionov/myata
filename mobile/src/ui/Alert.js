import React from 'react';
import styled from 'styled-components';

const Alert = styled.View`
  padding-vertical: 8;
  padding-bottom: 16;
  padding-horizontal: 16;
  border-radius: 10;
  margin-bottom: 16;

  background: rgba(17, 17, 17, 0.3);
`;

const AlertText = styled.Text`
  color: #ccc;
  margin-top: 8;
  font-size: 16;
  text-align: center;
`;

export default function ({ children }) {
  return (
    <Alert>
      <AlertText>{children}</AlertText>
    </Alert>
  );
}
