import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { H5, Row } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../../hooks/environment';
import { useHomes } from '../../../hooks/homes';
import { useHome } from '../../../hooks/home';
import AddDevice from './AddDevice';

interface Props {
  onlyBaseKeys?: string[];
  showRooms?: boolean;
}

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Wrapper = styled.View``;

const RoomWrapper = styled.View``;

const RoomElements = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Environment: React.FC<Props> = ({ onlyBaseKeys, showRooms }) => {
  const { devices, deviceTypes } = useEnvironment();
  const { removeDevice } = useHome();
  const preparedDevices = useMemo(
    () =>
      devices
        .filter((d) => !onlyBaseKeys || onlyBaseKeys.includes(d.baseKey))
        .reduce((output, device) => {
          const type = deviceTypes[device.type];
          const element = (
            <type.component
              key={device.baseKey}
              room={device.room}
              onRemove={() => removeDevice(device.baseKey)}
              channels={type.createChannels(device.baseKey)}
            />
          );
          return {
            ...output,
            [device.room]: [...(output[device.room] || []), element],
          };
        }, {} as { [room: string]: any }),
    [devices, deviceTypes, onlyBaseKeys, removeDevice]
  );

  return (
    <Scroll>
      <Wrapper>
        {Object.entries(preparedDevices).map(([roomName, deviceElements]) => (
          <RoomWrapper key={roomName}>
            {showRooms && (
              <Row>
                <H5>{roomName}</H5>
              </Row>
            )}
            <Row>
              <RoomElements>{deviceElements}</RoomElements>
            </Row>
          </RoomWrapper>
        ))}
      </Wrapper>
      <AddDevice />
    </Scroll>
  );
};

export default Environment;
