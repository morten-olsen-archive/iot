import React, { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { H5, Modal, Row, IconCell } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../../hooks/environment';
import Device from '../../../context/Environment/Device';
import AddDevice from './AddDevice';

interface Props {
  onlyBaseKeys?: string[];
  allowModifications?: boolean;
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

const Environment: React.FC<Props> = ({
  onlyBaseKeys,
  allowModifications,
  showRooms,
}) => {
  const [adding, setAdding] = useState(false);
  const { devices, deviceTypes, addDevice } = useEnvironment();
  const preparedDevices = useMemo(
    () =>
      devices
        .filter((d) => !onlyBaseKeys || onlyBaseKeys.includes(d.baseKey))
        .reduce((output, device) => {
          const type = deviceTypes[device.type];
          const element = (
            <type.component
              key={device.baseKey}
              channels={type.createChannels(device.baseKey)}
            />
          );
          return {
            ...output,
            [device.room]: [...(output[device.room] || []), element],
          };
        }, {} as { [room: string]: any }),
    [devices, deviceTypes, onlyBaseKeys]
  );

  const onAdd = useCallback(
    (device: Device) => {
      addDevice(device);
      setAdding(false);
    },
    [addDevice]
  );

  return (
    <Scroll>
      <Modal
        title="Add Device"
        visible={adding}
        onClose={() => setAdding(false)}
      >
        <AddDevice onAdd={onAdd} />
      </Modal>
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
      {allowModifications && (
        <Row
          title="Add device"
          left={<IconCell name="plus-circle" />}
          onPress={() => setAdding(true)}
        />
      )}
    </Scroll>
  );
};

export default Environment;
