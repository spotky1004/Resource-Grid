import styled, { keyframes } from 'styled-components';
import { Resources } from "../../data/resources.js";
import ResourceImage from "./ResourceImage.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons';

const appearAnimation = keyframes`
  from {
    transform: scale(0, 1);
    opacity: 0;
  }
  to {
    transform: scale(1, 1);
    opacity: 1;
  }
`;
const Warpper = styled.div`
  --height: calc(var(--cellHeight) / 10 * 1.75);

  padding: calc(var(--height) * 0.15) 0;

  position: absolute;
  bottom: calc(var(--height) * -1.4);
  
  min-width: 80%;
  height: var(--height);

  display: flex;
  justify-content: space-evenly;

  background: var(--colMain4);
  border-radius: calc(var(--height));
  box-shadow: var(--baseShadow);
  transform: scale(0, 1);

  pointer-events: none;
  animation: ${appearAnimation} 0.15s ease-out forwards;
  z-index: 1;
`;

function ResourceAutomate({ Resource, save }) {
  return (
    <>
      {(Resource.automates && Resource.automates.length > 0) &&
        <Warpper>
          <FontAwesomeIcon
            icon={faCogs}
            style={{
              position: "absolute",
              color: "var(--colReverseWeak)",

              left: 0,
              bottom: 0,
              transform: "translate(-50%, 50%)",

              filter: "drop-shadow(var(--baseShadow))",

              zIndex: 1,
            }}
          />
          {
            Resource.automates.map(_ResourceName => {
              const _Resource = Resources[_ResourceName];
              return (
                <ResourceImage
                  key={_Resource.name}
                  size="var(--height)"
                  position={_Resource.position}
                  style={{filter: "drop-shadow(var(--baseShadowSmall))"}}
                />
              );
            })
          }
        </Warpper>
      }
    </>
  )
}

export default ResourceAutomate;
