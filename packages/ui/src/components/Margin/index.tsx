import styled from 'styled-components/native';
import { Theme } from '../../theme';

interface Props {
  half?: boolean;
  top?: true | keyof Theme['paddings'];
  bottom?: true | keyof Theme['paddings'];
  left?: true | keyof Theme['paddings'];
  right?: true | keyof Theme['paddings'];
  all?: true | keyof Theme['paddings'];
  theme: Theme;
}

const format = (
  half: boolean,
  prop: string,
  theme: Theme,
  size?: true | keyof Theme['paddings']
) => {
  const factor = half ? 0.5 : 1;
  if (!size) {
    return '';
  }
  if (size === true) {
    return `${prop}: ${theme.paddings.md * factor}px;`;
  }
  return `${prop}: ${theme.paddings[size] * factor}px;`;
};

const Margin = styled.View<Props>`
  ${(props) => format(!!props.half, 'margin', props.theme, props.all)}
  ${(props) => format(!!props.half, 'margin-top', props.theme, props.top)}
  ${(props) => format(!!props.half, 'margin-bottom', props.theme, props.bottom)}
  ${(props) => format(!!props.half, 'margin-left', props.theme, props.left)}
  ${(props) => format(!!props.half, 'margin-right', props.theme, props.right)}
`;

export default Margin;
