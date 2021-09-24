import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Prestige from './Prestige.js';
import NewGame from './NewGame.js';
import Booster from './Booster.js';
import Stats from './Stats.js';

const Container = styled.div`
  flex: 7;

  margin-left: 1.5%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  color: var(--colReverseWeak);
  font-weight: bold;
  font-size: 2em;

  & > div {
    margin: 1%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    background-color: var(--colMain3);
    border-radius: 5%;
    box-shadow: var(--baseShadow);
  }

  & > div:nth-child(1) {
    flex: 3;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
  & > div:nth-child(3) {
    flex: 3;
  }
  & > div:nth-child(4) {
    flex: 5;
  }
`;

function Aside() {
  const unlockStatus = useSelector(state => state.aside.unlockStatus);
  const lockedStyle = {
    opacity: 0.4,
    pointerEvents: 'none'
  };

  return (
    <Container>
      <Prestige
        isUnlocked={unlockStatus.Prestige}
        style={!unlockStatus.Prestige ? lockedStyle : {}}
      />
      <NewGame
        isUnlocked={unlockStatus.NewGame}
        style={!unlockStatus.NewGame ? lockedStyle : {}}
      />
      <Booster
        isUnlocked={unlockStatus.Booster}
        style={!unlockStatus.Booster ? lockedStyle : {}}
      />
      <Stats />
    </Container>
  );
}

export default Aside;
