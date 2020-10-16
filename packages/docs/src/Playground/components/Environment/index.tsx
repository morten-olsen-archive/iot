import React, { useContext, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { Row, IconCell } from '@morten-olsen/iot-ui';

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
  },
  store: {
    name: 'Store',
    icon: 'activity',
    component: StoreView,
  },
};

const Environment = () => {
  const [currentView, setCurrentView] = useState<keyof typeof views>('devices');
  const View = views[currentView].component;

  return (
    <>
      <TabBar>
        {Object.entries(views).map(([key, view]) => (
          <Row
            left={<IconCell name={view.icon} />}
            key={key}
            title={view.name}
            onPress={() => setCurrentView(key)}
            selected={key === currentView}
          />
        ))}
      </TabBar>
      <View />
    </>
  );
};

export default Environment;
