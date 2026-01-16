'use client';

import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0051cc;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface ExampleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ExampleButton = ({ children, onClick }: ExampleButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
