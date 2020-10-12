import Unit, { ChangeRequest } from '@morten-olsen/iot';
import * as iot from '@morten-olsen/iot';
import typescript from 'typescript';

const compile = (code: string, libs: { [name: string]: any } = {}) => {
  const allLibs: { [name: string]: any } = {
    '@morten-olsen/iot': iot,
    ...libs,
  };
  const module = {
    exports: {} as any,
  };

  const require = (name: string) => allLibs[name];

  const api = {
    require,
    module,
    exports: module.exports,
  };

  const transpiled = typescript.transpile(code, {
    target: typescript.ScriptTarget.ES2018,
    module: typescript.ModuleKind.CommonJS,
    esModuleInterop: true,
  });
  const fn = new Function(...Object.keys(api), transpiled);
  fn(...Object.values(api));

  return module.exports.default;
};

let unit: Unit | undefined;

const change = (changes: ChangeRequest) => {
  postMessage({ type: 'change', changes }, undefined as any);
};

onmessage = ({ data }) => {
  const { type } = data;
  if (type === 'setup') {
    const UnitClass = compile(data.code);

    unit = new UnitClass();
    unit.setup(data.store, {
      setValues: change,
    });
  } else if (type === 'update') {
    if (unit) {
      unit.handleChanges(data.changes);
    }
  }
};
