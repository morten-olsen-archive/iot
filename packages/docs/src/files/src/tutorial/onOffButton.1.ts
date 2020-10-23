import Unit, { Changes, iql } from '@morten-olsen/iot';

class OnOffButtonUnit extends Unit {
  onChange = async (changes: Changes, key: iql) => {
    if (key('buttons.0.pressed').became(true).$) {
      this.change({ 'lights.0.on': true });
    }
    if (key('buttons.1.pressed').became(true).$) {
      this.change({ 'lights.0.on': false });
    }
  };
}

export default new OnOffButtonUnit();
