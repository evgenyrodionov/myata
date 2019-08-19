import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
`;

const Header = styled.header`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid #ebeff2;
`;
const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  margin: 0;
`;

const Content = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
`;

export default function ({ title, children }) {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
    </Card>
  );
}
