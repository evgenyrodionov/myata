import styled from 'styled-components';

export default styled.button`
  background-color: #109cf1;
  color: #fff;
  box-shadow: 0 4px 10px rgba(52, 175, 249, 0.24);
  border: 0 solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #34aff9;
    box-shadow: 0 8px 16px rgba(52, 175, 249, 0.2);
  }
`;
