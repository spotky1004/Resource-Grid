import styled from 'styled-components';
import notation from "../util/notation.js";
import { Resources } from '../data/resources';
import resourceImage from "../resources/Resources.png";

const RescouceCostTable = styled.div`
  --costCellWidth: calc(var(--cellWidth) / 2);
  --costCellHeight: calc(var(--cellHeight) / 3);

  display: grid;
  grid-template-columns: repeat(2, minmax(calc(var(--cellWidth) / 2), 1fr));
  grid-auto-rows: var(--costCellHeight);
  grid-auto-columns: var(--costCellWidth);
  place-items: center;
`;
const CostDisplay = styled.div`
  --imageSize: min(var(--costCellWidth), var(--costCellHeight));
  --resourceGap: calc(var(--imageSize) * 9 / 8);
  --imageScale: calc(81 / 8);

  box-sizing: content-box;

  width: var(--imageSize);
  height: var(--imageSize);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  color: var(--colReverse);
  font-size: 0.8em;
  font-weight: 900;
  text-shadow:
    calc(var(--imageSize) / 30) calc(var(--imageSize) / 30) 0 var(--colMain1),
    calc(var(--imageSize) / -30) calc(var(--imageSize) / -30) 0 var(--colMain1),
    calc(var(--imageSize) / 30) calc(var(--imageSize) / -30) 0 var(--colMain1),
    calc(var(--imageSize) / -30) calc(var(--imageSize) / 30) 0 var(--colMain1);
  text-align: right;

  border: calc(var(--imageSize) / 15) solid var(--colMain2);
  border-radius: calc(var(--imageSize) / 2);
  background-image: url(${resourceImage});
  background-repeat: no-repeat;
  background-size: calc(100% * var(--imageScale));
  image-rendering: pixelated;
  filter: drop-shadow(calc(var(--min) / 500) calc(var(--min) / 500) 0 var(--colStrong));
`;

function ResourceCost({ cost }) {
  return (
    <RescouceCostTable>
      {
        cost.map(([costResourceName, costQuantity], index) => {
          const costResource = Resources[costResourceName];

          return (
            <div key={index}>
              <CostDisplay
                style={{backgroundPosition: `calc(var(--resourceGap) * -${costResource.position.x}) calc(var(--resourceGap) * -${costResource.position.y})` }}
              >
                {notation(costQuantity)}
              </CostDisplay>
            </div>
          )
        })
      }
    </RescouceCostTable>
  )
}

export default ResourceCost;