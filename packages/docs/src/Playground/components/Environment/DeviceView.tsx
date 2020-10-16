import React, { useContext, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { H5, Modal, Row, IconCell } from '@morten-olsen/iot-ui';
import EnvironmentContext from '../../contexts/Environment';
import AddDevice from './AddDevice';
import Device from '../../contexts/Environment/Device';

interface Props {
  onlyBaseKeys?: string[];
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

const Environment: React.FC<Props> = ({ onlyBaseKeys }) => {
  const [adding, setAdding] = useState(false);
  const { devices, deviceTypes, addDevice } = useContext(EnvironmentContext);
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
          <RoomWrapper>
            <Row>
              <H5>{roomName}</H5>
            </Row>
            <Row>
              <RoomElements>{deviceElements}</RoomElements>
            </Row>
          </RoomWrapper>
        ))}
      </Wrapper>
      <Row
        title="Add device"
        left={<IconCell name="plus-circle" />}
        onPress={() => setAdding(true)}
      />
    </Scroll>
  );
};

export default Environment;
