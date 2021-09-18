import { connect } from "react-redux";
import { craftStart, craftUpdate } from "../modules/resources.js";
import styled from 'styled-components';
import { Resources } from "../data/resources.js";
import resourceImage from "../resources/Resources.png";

const ResourceRandomTable = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(100%);

  min-width: 50%;
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
const ChanceItemImage = styled.span`
  --imageSize: var(--itemHeight);
  --resourceGap: calc(var(--imageSize) * 9 / 8);
  --imageScale: calc(81 / 8);

  width: var(--imageSize);
  height: var(--imageSize);

  background-image: url(${resourceImage});
  background-repeat: no-repeat;
  background-size: calc(100% * var(--imageScale));
  image-rendering: pixelated;
`;


function ResourceRandom({ data, save }) {
  const EffectMultiply = data ? data.effectMultiply(save) : 1;
  const RandomTable = data.randomGrantOnCraft.map(e => [Math.min(1, e[0]*EffectMultiply), e[1]]);

  return (RandomTable.length !== 0 || EffectMultiply !== 1 ?
    <ResourceRandomTable>
      <EffectDisplay>{EffectMultiply.toFixed(1)}</EffectDisplay>
      <ChanceTable>
        {RandomTable.map(([chance, resource]) => {
          const Resource = Resources[resource];
          return (
            <ChanceItem>
              {save[Resource.order].unlocked ? <ChanceItemImage
                style={{backgroundPosition: `calc(var(--resourceGap) * -${Resource.position.x}) calc(var(--resourceGap) * -${Resource.position.y})`}}
              ></ChanceItemImage> : <span>?&nbsp;</span>}
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
