import styled from 'styled-components/native';
import { Theme } from '../theme';

export const BaseText = styled.Text<{
  textAlign?: string;
  bold?: boolean;
  color?: string;
  theme: Theme;
}>`
  text-align: ${({ textAlign }) => textAlign || 'left'};
  ${({ bold }) => (bold ? 'font-weight: bold;' : '')}
  color: ${({ theme, color }) => color || theme.colors.text};
`;

export const H1 = styled(BaseText)`
  letter-spacing: -1.5px;
  font-weight: 100;
  font-size: 96px;
`;

export const H2 = styled(BaseText)`
  font-size: 60px;
  letter-spacing: -0.5px;
  font-weight: 100l;
`;

export const H3 = styled(BaseText)`
  font-weight: normal;
  letter-spacing: 0px;
  font-size: 48px;
`;

export const H4 = styled(BaseText)`
  font-weight: normal;
  letter-spacing: 0.25px;
  font-size: 34px;
`;

export const H5 = styled(BaseText)`
  font-weight: normal;
  font-size: 24px;
  letter-spacing: 0px;
`;

export const H6 = styled(BaseText)`
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.15px;
`;

export const Code = styled(BaseText)<{ theme: Theme }>`
  font-family: monospace;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const Subtitle1 = styled(BaseText)`
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.15px;
`;

export const Subtitle2 = styled(BaseText)`
  font-weight: medium;
  font-size: 14px;
  letter-spacing: 0.1px;
`;

export const Body1 = styled(BaseText)`
  font-weight: normal;
  line-height: 23px;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

export const Body2 = styled(BaseText)`
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.25px;
`;

export const ButtonText = styled(BaseText)`
  text-transform: uppercase;
  color: ${({ theme, color }) => color || theme.colors.text};
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1.75px;
`;

export const Caption = styled(BaseText)`
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.4px;
`;

export const Overline = styled(BaseText)`
  font-weight: normal;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;
