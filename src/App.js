import "./font/font.css";
import styled, { createGlobalStyle } from 'styled-components';
import ResourceGrid from "./components/ResourceGrid/ResourceGrid.js"; 
import Aside from "./components/Aside/Aside.js";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  
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

    overflow: hidden;

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
    --colReverseWeaker: #cdcdcd;
    --colAlt1: #13d1f2;
    --colOverlay: #fff3;
    --colOverlayReverse: #0006;
  }
  body#theme-light {
    --colStrong: #ffffff;
    --colMain1: #ffffff;
    --colMain2: #efefef;
    --colMain3: #dedede;
    --colMain4: #cdcdcd;
    --colReverse: #191919;
    --colReverseWeak: #2a2a2a;
    --colReverseWeaker: #4a4a4a;
    --colAlt1: #f29913;
    --colOverlay: #0003;
    --colOverlayReverse: #fff6;
  }
`;
const MainContainer = styled.div`
  --resourceGridFlexGrow: 9;
  --asideFlexGrow: 7;
  --totalFlexGrow: calc(var(--resourceGridFlexGrow) + var(--asideFlexGrow));

  --baseShadow: calc(var(--h) / 250) calc(var(--h) / 250) 0 var(--colStrong);
  --baseShadowSmall: calc(var(--h) / 500) calc(var(--h) / 500) 0 var(--colStrong);

  display: flex;

  width: var(--w);
  height: var(--h);

  border-radius: calc(var(--h) / 50);

  transition: 
    background-image 0.5s linear,
    background-color 0.3s ease-out;

  @media only screen and (orientation: portrait) {
    --baseSize: 90vw;
  }
  @media only screen and (orientation: landscape) {
    --baseSize: min(83vw, 160vh);
  }
  --w: var(--baseSize);
  --h: calc(var(--baseSize) * 9 / 16);
  font-size: calc(var(--h) / 70);
  @media only screen and (min-width: 1600px) and (min-height: 900px) {
    --w: 1600px;
    --h: 900px;
    font-size: calc(var(--h) / 70);
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <MainContainer>
        {
          (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
          <span style={{
            top: 0, left: 0,
            position: 'absolute',
            color: "var(--colReverse)",
            fontSize: "1.3em",
            pointerEvents: "none",
            opacity: 0.6,
            fontWeight: "bold"
          }}>Dev Mode Activated (Speed x10)</span>
        }
        <ResourceGrid />
        <Aside />
      </MainContainer>
    </div>
  );
}

export default App;
