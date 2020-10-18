import React, { useState, useMemo, useCallback } from 'react';
import { Modal, Row, IconCell } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../../hooks/environment';
import { useHome } from '../../../hooks/home';

const AddDevice: React.FC = () => {
  const home = useHome();
  const [visible, setVisible] = useState(false);
  const { deviceTypes } = useEnvironment();
  const [selectedTypeKey, setSelectedTypeKey] = useState<string | undefined>(
    undefined
  );
  const [room, setRoom] = useState('');
  const [baseKey, setBaseKey] = useState('');
  const [config, setConfig] = useState<any>({});
  const selectedType = useMemo(
    () => (selectedTypeKey ? deviceTypes[selectedTypeKey] : undefined),
    [deviceTypes, selectedTypeKey]
  );

  const setConfigValue = useCallback((key: string, value: any) => {
    setConfig((current: any) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  const onAdd = useCallback(
    (device: any) => {
      home.setDevice(device);
      setVisible(false);
    },
    [home]
  );

  return (
    <>
      <Row
        title="Add device"
        left={<IconCell name="plus-circle" />}
        onPress={() => setVisible(true)}
      />
      <Modal
        title="Add Device"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        {!selectedType || !selectedTypeKey ? (
          <>
            {Object.entries(deviceTypes).map(([key, type]) => (
              <Row
                key={key}
                title={type.name}
                onPress={() => setSelectedTypeKey(key)}
              />
            ))}
          </>
        ) : (
          <>
            <Row
              title="Base key"
              right={
                <input
                  value={baseKey}
                  onChange={(evt) => setBaseKey(evt.target.value)}
                />
              }
            />
            <Row
              title="Room"
              right={
                <input
                  value={room}
                  onChange={(evt) => setRoom(evt.target.value)}
                />
              }
            />
            {Object.entries(selectedType.config).map(([key, configDef]) => (
              <Row
                key={key}
                title={configDef.name}
                right={
                  <input
                    value={config[key] || ''}
                    onChange={(evt) => setConfigValue(key, evt.target.value)}
                  />
                }
              />
            ))}
            <button
              onClick={() =>
                onAdd({ type: selectedTypeKey, baseKey, room, config })
              }
            >
              Add
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddDevice;
