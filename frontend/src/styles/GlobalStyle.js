import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #f7f7fb;
    color: #222;
  }

  a {
    font-family: inherit;
  }
`;

export default GlobalStyle;
