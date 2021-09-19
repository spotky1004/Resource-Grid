import styled from 'styled-components';
import notation from "../util/notation.js";
import { Resources } from '../data/resources';
import ResourceImage from "./ResourceImage.js";

const RescouceCostTable = styled.div`
  --costCellWidth: calc(var(--cellWidth) / 2);
  --costCellHeight: calc(var(--cellHeight) / 3);

  display: grid;
  grid-template-columns: repeat(2, minmax(calc(var(--cellWidth) / 2), 1fr));
  grid-auto-rows: var(--costCellHeight);
  grid-auto-columns: var(--costCellWidth);
  place-items: center;
`;

function ResourceCost({ cost }) {
  return (
    <RescouceCostTable>
      {
        cost.map(([costResourceName, costQuantity], index) => {
          const Resource = Resources[costResourceName];

          return (
            <div key={index}>
              <ResourceImage
                size="min(var(--costCellWidth), var(--costCellHeight))"
                position={Resource.position}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                
                  color: "var(--colReverse)",
                  fontSize: "0.8em",
                  fontWeight: 900,
                  textShadow:
                    `calc(var(--imageSize) / 30) calc(var(--imageSize) / 30) 0 var(--colMain1),
                    calc(var(--imageSize) / -30) calc(var(--imageSize) / -30) 0 var(--colMain1),
                    calc(var(--imageSize) / 30) calc(var(--imageSize) / -30) 0 var(--colMain1),
                    calc(var(--imageSize) / -30) calc(var(--imageSize) / 30) 0 var(--colMain1)`,
                  textAlign: "right",
                
                  border: "calc(var(--imageSize) / 15) solid var(--colMain2)",
                  borderRadius: "calc(min(var(--costCellWidth), var(--costCellHeight)) / 2)",
                  filter: "drop-shadow(calc(var(--min) / 500) calc(var(--min) / 500) 0 var(--colStrong))"
                }}
                content={notation(costQuantity)}
              />
            </div>
          )
        })
      }
    </RescouceCostTable>
  )
}

export default ResourceCost;