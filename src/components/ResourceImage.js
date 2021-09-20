import styled from 'styled-components';
import resourceImage from "../resources/Resources.png";

const Image = styled.div`
  --resourceGap: calc(var(--imageSize) * 9 / 8);
  --imageScale: calc(81 / 8);

  width: var(--imageSize);
  height: var(--imageSize);

  background-image: url(${resourceImage});
  background-repeat: no-repeat;
  background-size: calc(100% * var(--imageScale));
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

function ResourceImage({ size, position, style, content }) {
  return (
    <Image
      style={{
        "--imageSize": size,
        backgroundPosition: `calc(var(--resourceGap) * -${position.x}) calc(var(--resourceGap) * -${position.y})`,
        ...style
      }}
    >{content}</Image>
  )
}

export default ResourceImage;