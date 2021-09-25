import { useState, useCallback } from 'react';
import styled from "styled-components";
import Rescource from "./Resource.js";
import { ResourceArr } from "../../data/resources.js";

const ResourceWarpper = styled.div`
  --cellSize: calc(var(--h) / 9);

  flex: var(--resourceGridFlexGrow);

  display: grid;
  grid-template-columns: repeat(9, minmax(var(--cellSize), 1fr));
  grid-auto-rows: var(--cellSize);
  grid-auto-columns: var(--cellSize);
  place-items: center;
`;
const AutoToggleButton = styled.div`
  position: absolute;
  left: calc(var(--h) / 50);
  bottom: calc(var(--w) / 100);

  padding: calc(var(--h) / 100) calc(var(--w) / 200);
  
  font-weight: bold;
  color: var(--colReverseWeak);

  box-shadow: var(--baseShadow);
  background-color: var(--colMain3);

  cursor: pointer;
  z-index: 1;

  transition: all 0.5s cubic-bezier(.12,.74,.14,.99);

  &:hover {
    background-color: var(--colMain4);
    transform: scale(1.2);
  }
`;

function ResourceGrid({ craftStart }) {
  const [autoToggle, setAutoToggle] = useState(false);

  return (
    <>
      <AutoToggleButton
        onClick={useCallback(() => {
          setAutoToggle(!autoToggle);
        }, [autoToggle])}
        style={{
          backgroundColor: autoToggle ? "var(--colAlt1)" : undefined,
          color: autoToggle ? "var(--colMain1)" : undefined,
        }}
      >
        Toggle Auto
      </AutoToggleButton>
      <ResourceWarpper>
          {ResourceArr.map((Resource, index) => (
            <Rescource
              key={Resource !== null ? Resource.name : `empty_${index}`}
              Resource={Resource}
              autoToggleMode={autoToggle}
              index={index}
              craftStart={craftStart}
            />
          ))}
      </ResourceWarpper>
    </>
  );
}

export default ResourceGrid;
