import React from 'react';

export const nodeOrText = (input: any, Component: any, props: any = {}) => {
  if (typeof input === 'string') {
    return <Component {...props}>{input}</Component>;
  }
  return input;
};
