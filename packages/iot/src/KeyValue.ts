type AllowedValues = string | number | boolean | null | undefined;

interface KeyValue {
  current: AllowedValues;
  previous?: AllowedValues;
  action: string;
  actor?: string;
  changed: number;
}

export { AllowedValues };

export default KeyValue;
