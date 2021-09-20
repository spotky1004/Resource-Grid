import { connect } from "react-redux";
import { craftStart, craftUpdate } from "../modules/resources.js";
import styled from 'styled-components';
import notation from "../util/notation.js";
import { Resources } from "../data/resources.js";
import ResourceImage from "./ResourceImage.js";

const ResourceRandomTable = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(100%);

  min-width: 60%;
  height: var(--boxSize);

  display: flex;
  flex-direction: column;

  border-radius: 0 calc(var(--boxSize) / 10) calc(var(--boxSize) / 10) 0;
  background-color: var(--colOverlayReverse);

  pointer-events: none;
`;
const EffectDisplay = styled.div`
  flex: 1;

  border-radius: 0 calc(var(--boxSize) / 10) 0 0;
  background-color: var(--colOverlayReverse);

  &::before {
    font-size: 0.8em;
    content: "Eff x";
  }
`;
const ChanceTable = styled.div`
  flex: 5;
`;
const ChanceItem = styled.div`
  --itemHeight: calc(var(--boxSize) / 6);

  height: var(--itemHeight);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8em;
  font-weight: bold;
`;


function ResourceRandom({ Resource, save }) {
  const EffectMultiply = Resource ? Resource.effectMultiply(save) : 1;
  const RandomTable = Resource.randomGrantOnCraft.map(e => [Math.min(1, e[0]*EffectMultiply), e[1]]);

  return (RandomTable.length !== 0 || EffectMultiply !== 1 ?
    <ResourceRandomTable>
      <EffectDisplay>{notation(EffectMultiply)}</EffectDisplay>
      <ChanceTable>
        {RandomTable.map(([chance, resource]) => {
          const Resource = Resources[resource];
          return (
            <ChanceItem
              key={Resource.name}
            >
              {save[Resource.order].unlocked ? <ResourceImage
                size="var(--itemHeight)"
                position={Resource.position}
              /> : <span>?&nbsp;</span>}
              <span>{(chance*100).toFixed(2).padStart(6, "0")}%</span>
            </ChanceItem>
          );
        })}
      </ChanceTable>
    </ResourceRandomTable>
  : <></>);
}

export default connect(
  (state) => ({
    save: state.resources
  }),
  {
    craftStart,
    craftUpdate
  }
)(ResourceRandom);
