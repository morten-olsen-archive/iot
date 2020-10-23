import React, { ReactNode } from 'react';
import { Row, IconCell } from '@morten-olsen/iot-ui';

interface Props {
  title: string;
  overline: string;
  children: ReactNode;
  icon?: string;
}

const ListItem: React.FC<Props> = ({ title, overline, children, icon }) => (
  <Row
    left={<IconCell name={icon || 'box'} />}
    overline={overline}
    title={title}
    description={children}
  />
);

export default ListItem;
