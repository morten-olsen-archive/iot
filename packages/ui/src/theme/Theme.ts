interface Theme {
  sizes: {
    corner: number;
    icons: number;
  };
  paddings: {
    sm: number;
    md: number;
    lg: number;
  };
  colors: {
    primary: string;
    text: string;
    background: string;
    backgroundShade1: string;
    backgroundSelected: string;
    destructive: string;
  };
}

export default Theme;
