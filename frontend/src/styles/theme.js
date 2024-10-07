
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: var(--background);
    color: var(--foreground);
    transition: all 0.3s linear;
  }

  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-primary {
    @apply bg-blue-500 text-white;
  }

  .btn-primary:hover {
    @apply bg-blue-700;
  }
`;

export const lightTheme = {
  background: '#ffffff',
  foreground: '#333333',
};

export const darkTheme = {
  background: '#333333',
  foreground: '#ffffff',
};