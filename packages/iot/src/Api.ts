import { AllowedValues } from './KeyValue';

interface ChangeRequest {
  [key: string]: AllowedValues;
}

interface Api {
  setValues: (changes: ChangeRequest) => Promise<void>;
}

export { ChangeRequest };

export default Api;
