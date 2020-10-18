import iot from '!!raw-loader!@morten-olsen/iot/dist/index.d.ts';
import Unit from '!!raw-loader!@morten-olsen/iot/dist/Unit.d.ts';
import Api from '!!raw-loader!@morten-olsen/iot/dist/Api.d.ts';
import Iql from '!!raw-loader!@morten-olsen/iot/dist/Iql.d.ts';
import Store from '!!raw-loader!@morten-olsen/iot/dist/Store.d.ts';
import KeyValue from '!!raw-loader!@morten-olsen/iot/dist/KeyValue.d.ts';
import Changes from '!!raw-loader!@morten-olsen/iot/dist/Changes.d.ts';
import Multiplexer from '!!raw-loader!@morten-olsen/iot-multiplex/dist/index.d.ts';
import timewarp from '!!raw-loader!@morten-olsen/timewarp/dist/index.d.ts';
import Timer from '!!raw-loader!@morten-olsen/timewarp/dist/Timer.d.ts';

const time = `
import TimeWarp from 'file:///node_modules/@types/morten-olsen__timewarp/index';

declare var time: TimeWarp;
export default time;
`;

const typings: { [name: string]: string } = {
  'morten-olsen__iot/index.d.ts': iot,
  'morten-olsen__iot/unit.d.ts': Unit,
  'morten-olsen__iot/Api.d.ts': Api,
  'morten-olsen__iot/Iql.d.ts': Iql,
  'morten-olsen__iot/Store.d.ts': Store,
  'morten-olsen__iot/KeyValue.d.ts': KeyValue,
  'morten-olsen__iot/Changes.d.ts': Changes,
  'morten-olsen__timewarp/index.d.ts': timewarp,
  'morten-olsen__timewarp/Timer.d.ts': Timer,
  'morten-olsen__iot-multiplexer/index.d.ts': Timer,
  'time/index.d.ts': time,
};

export default typings;
