import styled, { keyframes } from 'styled-components';
// eslint-disable-next-line
import Resource from '../class/Resource';
import resourceImage from "../resources/Resources.png";
import ResourceCost from "./ResourceCost.js";

const namespaceAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%) scale(0.2, 1);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1, 1);
  }
`;
const ResourceWarp = styled.div`
  --margin: calc(var(--cellSize) / 10);
  --boxRatio: 1.3;
  --boxSize: calc(var(--cellSize) - var(--margin));
  --cellWidth: calc(var(--boxSize) / var(--boxRatio));
  --cellHeight: var(--boxSize);

  margin: calc(var(--margin) / 2);

  width: var(--cellWidth);
  height: var(--cellHeight);
  
  background-color: var(--colMain3);
  border-radius: calc(var(--boxSize) / 15);
  box-shadow: var(--baseShadow);

  transform: scale(1);
  cursor: pointer;

  transition: all 0.3s cubic-bezier(0,.79,.32,1);

  &:hover {
    width: calc(var(--boxSize) / var(--boxRatio) * 2);
    background-color: var(--colMain4);
    transform: scale(1.4);
    z-index: 1;
  }

  &:hover::before {
    content: attr(name);

    padding: 1% 5%;
    
    min-width: 60%;
    height: 15%;

    position: absolute;
    top: -15%;
    left: 5%;

    color: var(--colMainReverse);
    word-spacing: -0.3em;
    font-size: 0.9em;
    text-align: center;

    background-color: var(--colMain4);
    border-radius: calc(var(--cellSize) / 30);

    animation: ${namespaceAppear} 0.4s cubic-bezier(.12,.81,.31,.95);
  }
`;
const ResourceInfo = styled.div`
  display: flex;
  overflow: hidden;
  
  & > span {
    display: inline-block;

    width: calc(var(--boxSize) / var(--boxRatio));
    height: calc(var(--boxSize));
  }
`;
const ResourceImage = styled.div`
  --imageSize: calc(var(--boxSize) / var(--boxRatio) - var(--margin));
  --resourceGap: calc(var(--imageSize) * 9 / 8);
  --imageScale: calc(81 / 8);

  box-sizing: content-box;
  margin: calc(var(--margin) / 2);

  width: var(--imageSize);
  height: var(--imageSize);

  background-image: url(${resourceImage});
  background-repeat: no-repeat;
  background-size: calc(100% * var(--imageScale));
  image-rendering: pixelated;
  filter: drop-shadow(var(--baseShadow));
`;
const ResourceQuantity = styled.div`
  padding-right: calc(var(--boxSize) / 20);

  text-align: right;
  font-weight: bolder;
  color: var(--colReverse);
`;

/**
 * @param {object} obj
 * @param {Resource} obj.data 
 */
function ResourceGridItem({ data, index, save, craftStart, craftEnd }) {
    const displayName = data ? data.name.replace(/(.)([A-Z])/g, (_, g1, g2) => `${g1} ${g2}`) : "";

    const have = save.have;
    const cost = data ? Object.entries(data.cost(have) ?? {}) : [];

    return (
    <ResourceWarp onClick={() => craftStart(index)} name={displayName}>
      {
        data &&
        <ResourceInfo>
          <span>
            <ResourceImage
              style={{backgroundPosition: `calc(var(--resourceGap) * -${data.position.x}) calc(var(--resourceGap) * -${data.position.y})` }}
            ></ResourceImage>
            <ResourceQuantity>
              {have}
            </ResourceQuantity>
          </span>
          <span>
            <ResourceCost
              cost={cost}
            />
          </span>
        </ResourceInfo>
      }
    </ResourceWarp>
  );
}

export default ResourceGridItem;
