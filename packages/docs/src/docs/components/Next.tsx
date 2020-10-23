import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from '@morten-olsen/iot-ui';
import styled from 'styled-components/native';

interface Props {
  title: string;
  to: string;
}

const Next: React.FC<Props> = ({ title, to }) => (
  <Link to={to}>
    <Row title={title} />
  </Link>
);

export default Next;
