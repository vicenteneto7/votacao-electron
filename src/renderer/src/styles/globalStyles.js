import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;

    outline: none;
    list-style: none;
    text-decoration: none;
  }

  #root{
    width: 100vw;
    height: 100vh;
  }

  body {
    width: 100vw;
    height: 100vh;
    
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
  }
`