import { useSelector, connect } from 'react-redux';
import { doPrestige } from '../../modules/prestige.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ResourceImage from "../ResourceGrid/ResourceImage.js";

const Title = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ExchangeDispaly = styled.div`
  padding: 0.5% 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8em;

  background-color: var(--colOverlay);
`;
const ResourceQuantity = styled.span`
  margin-right: 1%;
`;
const PrestigeButtonContainer = styled.div`
  flex: 2;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const PrestigeButton = styled.span`
  padding: 10% 10%;

  font-size: 0.7em;

  background-color: var(--colMain3);
  border-radius: calc(var(--asideWidth) / 70);
  box-shadow: var(--baseShadow);

  cursor: pointer;
  transition:
    color 0.15s cubic-bezier(.06,.71,.44,1),
    background-color 0.15s cubic-bezier(.06,.71,.44,1),
    transform 0.15s cubic-bezier(.06,.71,.44,1);

  &:hover {
    background-color: var(--colMain4);
    transform: scale(1.2);
  }
  &:active {
    color: var(--colMain1);
    background-color: var(--colAlt1);
    transform: scale(1.05);
  }
`;

function Prestige({ isUnlocked, style, doPrestige }) {
  const PowderHave = useSelector(state => state.resources[72].have);
  const ShardHave = useSelector(state => state.resources[73].have);
  const canPrestige = PowderHave >= 50;

  return (
    <div style={{
      ...style,
      "--_imageSize": "calc(var(--w) / 40)"
    }}>
      { isUnlocked ?
        (
          <>
            <Title>Prestige</Title>
            <ExchangeDispaly>
              <ResourceQuantity>
                {PowderHave}
              </ResourceQuantity>
              <ResourceImage
                size="var(--_imageSize)"
                position={{x: 0, y: 8}}
                style={{
                  filter: "drop-shadow(var(--baseShadow))"
                }}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{
                  margin: "0 2%",
                  color: "var(--colReverseWeak)"
                }}
              />
              <ResourceQuantity>
                {`${ShardHave}(+${PowderHave})`}
              </ResourceQuantity>
              <ResourceImage
                size="var(--_imageSize)"
                position={{x: 1, y: 8}}
                style={{
                  filter: "drop-shadow(var(--baseShadow))"
                }}
              />
            </ExchangeDispaly>
            <PrestigeButtonContainer>
              <PrestigeButton
                style={!canPrestige ? {opacity: 0.2, pointerEvents: 'none'} : undefined}
                onClick={() => canPrestige && window.confirm("Do you really want to Prestige?") && doPrestige(PowderHave)}
              >
                {canPrestige ?
                  "Prestige!" :
                  <>
                    <span>{`${50-PowderHave} more `}</span>
                    <ResourceImage
                      size="calc(var(--_imageSize) / 2)"
                      position={{x: 0, y: 8}}
                      style={{
                        filter: "drop-shadow(var(--baseShadow))",
                        margin: "0 5%"
                      }}
                    />
                  </>
                }
              </PrestigeButton>
            </PrestigeButtonContainer>
          </>
        ) : 
        (
          "Locked"
        )
      }
    </div>
  );
}

export default connect(
  () => ({}),
  {
    doPrestige
  }
)(Prestige);
