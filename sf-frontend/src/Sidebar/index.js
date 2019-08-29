import React from 'react';
import styled from 'styled-components';
import { NavLink as RouterLink } from 'react-router-dom';
import media from '../ui/media';

const Nav = styled.nav`
  display: none;

  ${media.greaterThan('sm')`
    display: block;
    background: #fff;
    box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
    height: 100vh;
    transition: width 0.3s ease-in-out;
    width: 256px;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 32px;
    position: fixed;
  `}
`;

const Logo = styled(RouterLink)`
  margin: 0;
  font-size: 24px;
  color: #2ed47a;

  &:hover {
    color: #23a960;
  }
`;

const User = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const UserName = styled.h5`
  color: #192a3e;
  font-size: 14px;
  line-height: 21px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  margin: 0;
`;

const UserPhoneNumber = styled.h6`
  line-height: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  margin: 0;
  color: #90a0b7;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const NavLink = styled(RouterLink)`
  align-items: center;
  color: #323c47;
  display: flex;
  font-weight: 500;
  justify-content: flex-start;
  letter-spacing: 0.01em;
  transition: color 0.2s ease-in-out;
  white-space: nowrap;

  &.active {
    color: #2ed47a;
  }
`;

const NavItem = styled.li`
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    ${NavLink} {
      color: #2ed47a;
    }
  }
`;

const Divider = styled.hr`
  margin-top: 18px;
  margin-bottom: 18px;
`;

export default function ({ user = {} }) {
  return (
    <Nav>
      <Logo to="/">СФ</Logo>

      <User>
        <UserName>{user.displayName}</UserName>
        <UserPhoneNumber>{user.formattedPhoneNumber}</UserPhoneNumber>
      </User>

      <NavList>
        <NavItem>
          <NavLink exact to="/">
            Главная
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/guests">Гости</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contracts">Контракты</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/docs">Документы</NavLink>
        </NavItem>

        <Divider />

        <NavItem>
          <NavLink as="a" href="https://secure.usedesk.ru">
            База знаний
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as="a" href="https://secure.usedesk.ru">
            Поддержка
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
}
