const context = (require as any).context('.', true, /\/.*\/index.tsx$/);

const getName = (input: string) => {
  return input.substring(2).slice(0, -10).toLowerCase();
};

const docs = context.keys().reduce(
  (output: any, current: string) => ({
    ...output,
    [getName(current)]: context(current).default,
  }),
  {}
);

export default docs;
