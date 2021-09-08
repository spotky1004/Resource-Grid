import styled, { createGlobalStyle } from 'styled-components';
import ResourceGrid from "./components/ResourceGrid.js";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  
    font-family: 'Azeret Mono', monospace;
    white-space: nowrap;
    
    user-select: none;
  }
  
  body {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: var(--colReverse);

    background-color: var(--colMain1);
  }
  body#theme-dark, body:not(#theme-light){
    --colStrong: #000000;
    --colMain1: #191919;
    --colMain2: #2a2a2a;
    --colMain3: #3a3a3a;
    --colMain4: #4a4a4a;
    --colReverse: #ffffff;
    --colReverseWeak: #efefef;
    --colAlt1: #13d1f2;
  }
  body#theme-light {
    --colStrong: #ffffff;
    --colMain1: #ffffff;
    --colMain2: #efefef;
    --colMain3: #dedede;
    --colMain4: #cdcdcd;
    --colReverse: #191919;
    --colReverseWeak: #2a2a2a;
    --colAlt1: #f29913;
  }
`;
const MainContainer = styled.div`
  --min: min(var(--w), var(--h));

  --baseShadow: calc(var(--min) / 250) calc(var(--min) / 250) 0 var(--colStrong);

  display: flex;

  width: var(--w);
  height: var(--h);

  border-radius: calc(var(--min) / 50);

  transition: 
    background-image 0.5s linear,
    background-color 0.3s ease-out;
  
  @media only screen and (orientation: portrait) {
    & {
      --w: 100vw;
      --h: calc(100vw * 9 / 16);
      font-size: calc(var(--w) / 70);
    }
  }
  @media only screen and (orientation: landscape) {
    & {
      --w: 100vh;
      --h: calc(100vh * 9 / 16);
      font-size: calc(var(--h) / 70);
    }
  }
  @media only screen and (min-width: 1600px) and (min-height: 900px) {
    & {
      --w: 1600px;
      --h: 900px;
      font-size: calc(var(--h) / 70);
    }
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <MainContainer>
        <ResourceGrid />
      </MainContainer>
    </div>
  );
}

export default App;
