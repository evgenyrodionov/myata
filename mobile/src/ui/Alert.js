import React from 'react';
import styled from 'styled-components';

const Alert = styled.View`
  padding-vertical: 16;
  padding-horizontal: 16;
  border-radius: 10;
  margin-bottom: 16;

  background: ${p => (p.white ? '#fff' : 'rgba(17, 17, 17, 0.3)')};
`;

const AlertText = styled.Text`
  color: ${p => (p.white ? 'rgba(0, 0, 0, 0.6)' : '#ccc')};
  font-size: 15;
  text-align: ${p => (p.center ? 'center' : 'left')};
`;

export default function ({
  white, center, children, ...props
}) {
  return (
    <Alert white={white} {...props}>
      <AlertText white={white} center={center}>
        {children}
      </AlertText>
    </Alert>
  );
}
