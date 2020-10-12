import index from '!!raw-loader!@morten-olsen/iot/dist/index.d.ts';
import Unit from '!!raw-loader!@morten-olsen/iot/dist/Unit.d.ts';
import Api from '!!raw-loader!@morten-olsen/iot/dist/Api.d.ts';
import Iql from '!!raw-loader!@morten-olsen/iot/dist/Iql.d.ts';
import Store from '!!raw-loader!@morten-olsen/iot/dist/Store.d.ts';
import KeyValue from '!!raw-loader!@morten-olsen/iot/dist/KeyValue.d.ts';
import Changes from '!!raw-loader!@morten-olsen/iot/dist/Changes.d.ts';

const typings: { [name: string]: string } = {
  'morten-olsen__iot/index.d.ts': index,
  'morten-olsen__iot/unit.d.ts': Unit,
  'morten-olsen__iot/Api.d.ts': Api,
  'morten-olsen__iot/Iql.d.ts': Iql,
  'morten-olsen__iot/Store.d.ts': Store,
  'morten-olsen__iot/KeyValue.d.ts': KeyValue,
  'morten-olsen__iot/Changes.d.ts': Changes,
};

export default typings;
