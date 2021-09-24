import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { getCooldown } from '../../data/resources.js';
import notation from '../../util/notation';

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ProductionDisplay = styled.div`
  position: absolute;
  bottom: 18%;
  left: 47%;
  transform: translateX(-100%);

  padding: 2%;

  color: var(--colReverse);
  font-size: 0.7em;
  font-weight: bold;

  background-color: var(--colOverlayReverse);
  border-radius: 25%;

  animation: ${appearAnimation} 0.2s ease-out forwards;
  z-index: 1;
  pointer-events: none;
`;

function ResourcProduction({ Resource, autoConnected, save }) {
  const cooldown = getCooldown(Resource.name, save) || 0;
  const isAuto = autoConnected !== -1 ? save.resources[autoConnected].have >= 1 : false;

  return ( cooldown !== 0 ?
    (
      <ProductionDisplay>
        {isAuto ?
          notation(Math.max(0, 1000/cooldown)) + "/s":
          (cooldown/1000).toFixed(2) + "s"}
      </ProductionDisplay>
    )
  : <></>)
}

export default connect(
  (state) => ({
    save: state
  }),
)(ResourcProduction);
