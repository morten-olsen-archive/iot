const context = (require as any).context('.', true, /.mdx$/);

const getName = (input: string) => {
  return input.substring(2).toLowerCase();
};

const docs = context.keys().reduce(
  (output: any, current: string) => ({
    ...output,
    [getName(current)]: context(current).default,
  }),
  {}
);

export default docs;
