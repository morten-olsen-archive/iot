import React, { useState, useMemo, useCallback } from 'react';
import { Modal, Row, IconCell } from '@morten-olsen/iot-ui';
import { useHomes } from '../../../hooks/homes';
import { useHome } from '../../../hooks/home';

const ManageHomes = () => {
  const { name, selectHome } = useHome();
  const { homes, removeHome, addHome } = useHomes();
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState('');

  const select = (key: string) => {
    selectHome(key);
    setVisible(false);
    setNewName('');
  };

  const create = useCallback(() => {
    addHome(newName);
    setNewName('');
  }, [newName, addHome]);

  return (
    <>
      <Row
        left={<IconCell name="home" />}
        title={name}
        onPress={() => setVisible(true)}
      />
      <Modal
        title="Select home"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        {Object.entries(homes).map(([key, homeName]) => (
          <Row
            key={key}
            title={homeName}
            onPress={() => select(key)}
            right={<IconCell name="trash" onPress={() => removeHome(key)} />}
          />
        ))}
        <hr />
        <Row>
          <input
            value={newName}
            onChange={(evt) => setNewName(evt.target.value)}
          />
          <button onClick={create}>Create</button>
        </Row>
      </Modal>
    </>
  );
};

export default ManageHomes;
