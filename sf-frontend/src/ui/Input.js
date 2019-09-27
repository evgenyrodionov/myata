import styled from 'styled-components';

export default styled.input`
  width: 100%;
  font-size: 16px;
  border: 0;
  border-bottom: 1px solid #eee;
  padding-top: 8px;
  padding-bottom: 8px;
  transition: border-bottom-color 0.2s;

  &:focus {
    border-bottom-color: #23a960;
    outline: 0;
  }
`;
