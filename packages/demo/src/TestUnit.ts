import Unit from '@morten-olsen/iot';

class TestUnit extends Unit {
  private _name;

  constructor(name: string) {
    super();
    this._name = name;
  }

  changeValue = () => {
    this.change({
      [this._name]: Math.random(),
    });
    setTimeout(this.changeValue, 3000);
  };

  onSetup = async () => {
    this.changeValue();
  };

  onChange: Unit['onChange'] = async (changes) => {
    console.log(this._name, 'changes', changes, this.store);
  };
}

export default TestUnit;
