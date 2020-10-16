import React, { useState, useMemo, useContext, useCallback } from 'react';
import { Row } from '@morten-olsen/iot-ui';
import EnvironmentContext from '../../contexts/Environment';
import Device from '../../contexts/Environment/Device';

interface Props {
  onAdd: (device: Device) => void;
}

const AddDevice: React.FC<Props> = ({ onAdd }) => {
  const { deviceTypes } = useContext(EnvironmentContext);
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
    setConfig((current) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  return (
    <>
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
    </>
  );
};

export default AddDevice;
