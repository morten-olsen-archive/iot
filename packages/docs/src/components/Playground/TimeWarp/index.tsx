import React, { useState, useEffect } from 'react';
import { Row, IconCell } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../../hooks/environment';
import WarpButton from './WarpButton';

const TimeWarp: React.FC = () => {
  const { timeWarp } = useEnvironment();
  const [time, setTime] = useState(new Date(new Date().getTime() + timeWarp));

  useEffect(() => {
    setTime(new Date(new Date().getTime() + timeWarp));
  }, [timeWarp]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTime(new Date(new Date().getTime() + timeWarp));
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [time, timeWarp]);

  return (
    <Row
      left={<IconCell name="clock" />}
      right={
        <>
          <WarpButton label="+1m" amount={60 * 1000} />
          <WarpButton label="+10m" amount={10 * 60 * 1000} />
          <WarpButton label="+1h" amount={60 * 60 * 1000} />
          <WarpButton label="+6h" amount={6 * 60 * 60 * 1000} />
          <WarpButton label="+1d" amount={24 * 60 * 60 * 1000} />
          <WarpButton label="+1w" amount={7 * 24 * 60 * 60 * 1000} />
          <WarpButton label="+30d" amount={30 * 24 * 60 * 60 * 1000} />
          <WarpButton label="+1y" amount={365 * 24 * 60 * 60 * 1000} />
        </>
      }
      title={`${time.getDay()}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`}
    />
  );
};

export default TimeWarp;
