import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const Button = styled.button`
  font-size: 12px;
  font-weight: bold;
  border: 0;
  background: none;
  line-height: 1;
  background-color: #2ed47a;
  color: #fff;
  padding: 10px 12px 10px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  &:hover,
  &:active {
    color: #fff;
  }
`;

export default function({ title, children, buttonLink, buttonTitle }) {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>

        {buttonLink && (
          <Button to={buttonLink} as={Link}>
            {buttonTitle}
          </Button>
        )}
      </Header>
      <Content>{children}</Content>
    </Card>
  );
}
