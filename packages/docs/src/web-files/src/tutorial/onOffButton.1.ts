import Unit, { Changes, iql } from '@morten-olsen/iot';

class OnOffButtonUnit extends Unit {
  onChange = async (_changes: Changes, key: iql) => {
    if (key('dimmerSwitches.0.pressed').became('on').$) {
      this.change({ 'lights.0.on': true });
    }
    if (key('dimmerSwitches.0.pressed').became('off').$) {
      this.change({ 'lights.0.on': false });
    }
  };
}

export default new OnOffButtonUnit();
