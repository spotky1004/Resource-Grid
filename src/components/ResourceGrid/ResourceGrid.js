import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
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
const SelectModeButtons = styled.div`
  position: absolute;
  left: calc(var(--h) / 50);
  bottom: calc(var(--w) / 100);

  z-index: 1;
`;
const SelectModeButton = styled.div`
  padding: calc(var(--h) / 100) calc(var(--w) / 200);
  margin: 0 calc(var(--w) / 200);

  display: inline-block;
  
  font-weight: bold;
  color: var(--colReverseWeak);

  box-shadow: var(--baseShadow);
  background-color: var(--colMain3);

  cursor: pointer;

  transition: all 0.5s cubic-bezier(.12,.74,.14,.99);

  &:hover {
    background-color: var(--colMain4);
    transform: scale(1.2);
  }
`;

function ResourceGrid({ craftStart }) {
  const [selectMode, setSelectMode] = useState(null);
  const resourceSave = useSelector(state => state.resources);
  const EmpowerLeft = resourceSave[74].have - resourceSave.reduce((a, b) => a+b.empower, 0);

  return (
    <>
      <SelectModeButtons>
        <SelectModeButton
          onClick={useCallback(() => {
            if (selectMode !== "AutoToggle") {
              setSelectMode("AutoToggle");
            } else {
              setSelectMode(null);
            }
          }, [selectMode])}
          style={selectMode === "AutoToggle" ? {
            backgroundColor: "var(--colAlt1)",
            color: "var(--colMain1)",
          } : {}}
        >
          Toggle Auto
        </SelectModeButton>
        <SelectModeButton
          onClick={useCallback(() => {
            if (selectMode !== "Empower") {
              setSelectMode("Empower");
            } else {
              setSelectMode(null);
            }
          }, [selectMode])}
          style={selectMode === "Empower" ? {
            backgroundColor: "var(--colAlt1)",
            color: "var(--colMain1)",
          } : {}}
        >
          Empower ({EmpowerLeft})
        </SelectModeButton>
      </SelectModeButtons>
      <ResourceWarpper>
          {ResourceArr.map((Resource, index) => (
            <Rescource
              key={Resource !== null ? Resource.name : `empty_${index}`}
              Resource={Resource}
              selectMode={selectMode}
              index={index}
              craftStart={craftStart}
              empowerLeft={EmpowerLeft}
            />
          ))}
      </ResourceWarpper>
    </>
  );
}

export default ResourceGrid;
