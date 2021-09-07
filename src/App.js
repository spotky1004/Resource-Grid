import styled, { css, createGlobalStyle } from 'styled-components';

import ResourceGrid from "./components/ResourceGrid";

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
      <MainContainer>
        <ResourceGrid />
      </MainContainer>
    </div>
  );
}

export default App;
