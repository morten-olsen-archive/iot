import React, { useContext, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { Row, IconCell } from '@morten-olsen/iot-ui';
import ManageHomes from './ManageHomes';

import DeviceView from './DeviceView';
import StoreView from './StoreView';

const TabBar = styled.View`
  flex-direction: row;
  padding: 5px;
`;

const views = {
  devices: {
    name: 'Devices',
    icon: 'grid',
    component: DeviceView,
    props: { showRooms: true, allowModifications: true },
  },
  store: {
    name: 'Store',
    icon: 'activity',
    component: StoreView,
    props: {},
  },
};

const Environment = () => {
  const [currentView, setCurrentView] = useState<keyof typeof views>('devices');
  const View = views[currentView].component;
  const props = views[currentView].props;

  return (
    <>
      <TabBar>
        {Object.entries(views).map(([key, view]) => (
          <Row
            left={<IconCell name={view.icon} />}
            key={key}
            title={view.name}
            onPress={() => setCurrentView(key as any)}
            selected={key === currentView}
          />
        ))}
        <ManageHomes />
      </TabBar>
      <View {...props} />
    </>
  );
};

export default Environment;
