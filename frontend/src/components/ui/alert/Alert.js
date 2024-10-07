import React from 'react';
import styled from 'styled-components';

const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid transparent;
  color: #4a5568; /* You can customize this color */
`;

const Alert = ({ children, className }) => {
  return (
    <AlertWrapper className={className}>
      {children}
    </AlertWrapper>
  );
};

export default Alert;
