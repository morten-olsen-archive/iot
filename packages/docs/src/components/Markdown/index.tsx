import React from 'react';
import { useHistory } from 'react-router';
import MarkdownDisplay from 'react-native-markdown-display';

const Markdown: React.FC = ({ children }) => {
  const history = useHistory();
  return (
    <MarkdownDisplay
      onLinkPress={(url) => {
        history.push(url);
      }}
    >
      {children}
    </MarkdownDisplay>
  );
};

export default Markdown;
