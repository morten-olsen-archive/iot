import Unit from '@morten-olsen/iot';

class RandomColorUnit extends Unit {
  changeColor = () => {
    this.change({
      'lights.0.on': true,
      'lights.0.hue': Math.round(Math.random() * 180),
    });
    setTimeout(this.changeColor, 3000);
  };

  onSetup = async () => {
    this.changeColor();
  };

  onChange = async () => {};
}

export default RandomColorUnit;
