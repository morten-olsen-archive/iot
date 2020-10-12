type AllowedValues = string | number | boolean | null | undefined;

interface KeyValue {
  current: AllowedValues;
  previous: AllowedValues;
  changed: number;
}

export { AllowedValues };

export default KeyValue;
