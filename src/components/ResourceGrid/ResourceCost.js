import styled from 'styled-components';
import notation from "../../util/notation.js";
import { Resources } from '../../data/resources';
import ResourceImage from "./ResourceImage.js";

const RescouceCostList = styled.div`
  --itemHeight: calc(var(--cellHeight) / 6);

  display: flex;
  flex-direction: column;

  & > div:nth-child(1) {
    border-radius: 0 var(--borderRadius) 0 0;
  }
  & > div:nth-child(2n-1) {
    background-color: var(--colOverlay);
  }
`;
const RescouceCostItem = styled.div`
  width: var(--cellWidth);

  display: flex;
  align-items: center;
`;
const ResourceCostText = styled.span`
  font-weight: bold;
`;


function ResourceCost({ cost }) {
  return (
    <RescouceCostList>
      {
        cost.map(([costResourceName, costQuantity], index) => {
          const Resource = Resources[costResourceName];

          return (
            <RescouceCostItem key={index}>
              <ResourceImage
                size="min(var(--itemHeight), var(--itemHeight))"
                position={Resource.position}
                style={{
                  filter: "drop-shadow(var(--baseShadowSmall))"
                }}
              />
              <ResourceCostText>{notation(costQuantity)}</ResourceCostText>
            </RescouceCostItem>
          )
        })
      }
    </RescouceCostList>
  )
}

export default ResourceCost;