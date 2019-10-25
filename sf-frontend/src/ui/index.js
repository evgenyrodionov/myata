import styled from 'styled-components';

export const Label = styled.p`
  margin: 0;
  padding: 6px 8px;
  border-radius: 10px;
  background-color: #eee;
  display: inline-block;
  line-height: 1;
  font-size: 0.9rem;
`;

export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as TextOrInput } from './TextOrInput';
export { default as SaveButton } from './SaveButton';
export { default as IconEdit } from './icons/Edit';

export {
  Table, Thead, Tbody, Th, Tr, Td,
} from './Table';
