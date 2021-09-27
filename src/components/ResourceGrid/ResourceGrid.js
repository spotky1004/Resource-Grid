import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import Rescource from "./Resource.js";
import { ResourceArr, getCooldown } from "../../data/resources.js";
import { doRespec } from '../../modules/prestige.js';
import timeNotation from '../../util/timeNotation.js';

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

  min-width: 20%;

  display: inline-block;
  
  font-weight: bold;
  color: var(--colReverseWeak);
  text-align: center;

  box-shadow: var(--baseShadow);
  background-color: var(--colMain3);

  cursor: pointer;

  transition: all 0.5s cubic-bezier(.12,.74,.14,.99);

  &:hover {
    background-color: var(--colMain4);
    transform: scale(1.2);
  }
`;

function ResourceGrid() {
  const [selectMode, setSelectMode] = useState(null);
  const savefile = useSelector(state => state);
  const resourceSave = savefile.resources;
  const EmpowerLeft = resourceSave[74].have - resourceSave.reduce((a, b) => a+b.empower, 0);

  const Time = new Date().getTime();
  const RespecTime = savefile.prestige.empowererRespecTime;
  const RespecCooldown = 10*60*1000 - (Time-RespecTime);

  const dispatch = useDispatch();

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
        {resourceSave[74].unlocked && (
        <>
          <SelectModeButton
            onClick={() => {
              if (selectMode !== "Empower") {
                setSelectMode("Empower");
              } else {
                setSelectMode(null);
              }}
            }
            style={selectMode === "Empower" ? {
              backgroundColor: "var(--colAlt1)",
              color: "var(--colMain1)",
            } : {}}
          >
            Empower ({EmpowerLeft})
          </SelectModeButton>
          <SelectModeButton
            onClick={() => dispatch(doRespec())}
            style={RespecCooldown > 0 ? {
              opacity: 0.4,
              pointerEvents: 'none'
            } : {}}
          >
            {RespecCooldown > 0 ? timeNotation(RespecCooldown) : "Respec"}
          </SelectModeButton>
        </>)}
      </SelectModeButtons>
      <ResourceWarpper>
          {ResourceArr.map((Resource, index) => (
            <Rescource
              key={Resource !== null ? Resource.name : `empty_${index}`}
              Resource={Resource}
              selectMode={selectMode}
              index={index}
              empowerLeft={EmpowerLeft}
              cooldown={Resource !== null ? getCooldown(Resource.name, savefile) || Infinity : Infinity}
            />
          ))}
      </ResourceWarpper>
    </>
  );
}

export default ResourceGrid;
