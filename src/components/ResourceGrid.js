import { useState } from 'react';
import styled from "styled-components";
import Rescouce from "./Rescouce.js";
import { ResourceArr } from "../data/resources.js";

const AutoToggleButton = styled.div`
  position: absolute;
  left: calc(var(--h) / 50);
  bottom: calc(var(--w) / 100);
  
  color: var(--colReverseWeak);

  background-color: var(--colMain3);
`;
const RescouceGrid = styled.div`
  --cellSize: calc(var(--min) / 9);

  flex: 9;

  display: grid;
  grid-template-columns: repeat(9, minmax(var(--cellSize), 1fr));
  grid-auto-rows: var(--cellSize);
  grid-auto-columns: var(--cellSize);
  place-items: center;
`;
const OtherContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: var(--colReverseWeak);
  font-weight: bold;
  font-size: 2em;
  opacity: 0.3;

  flex: 7;
`;

function ResourceGrid({ save, craftStart }) {
  const [autoToggle, setAutoToggle] = useState(false);

  return (
    <>
      <AutoToggleButton>
        Toggle Auto
      </AutoToggleButton>
      <RescouceGrid>
          {ResourceArr.map((ResourceData, index) => (
            <Rescouce
              key={ResourceData !== null ? ResourceData.name : `empty_${index}`}
              data={ResourceData}
              index={index}
              craftStart={craftStart}
            />
          ))}
      </RescouceGrid>
      <OtherContents>
        - Nothing -
      </OtherContents>
    </>
  );
}

export default ResourceGrid;
