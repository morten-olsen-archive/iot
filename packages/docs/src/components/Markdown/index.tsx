import React from 'react';
import { useHistory } from 'react-router';
import MarkdownDisplay from 'react-native-markdown-display';

const Markdown: React.FC = ({ children }) => {
  const history = useHistory();
  return (
    <MarkdownDisplay
      style={{
        body: {
          color: '#fff',
        },
        code_inline: {
          backgroundColor: '#000',
          borderWidth: 0,
        },
      }}
      onLinkPress={(url) => {
        history.push(url);
        return false;
      }}
    >
      {children}
    </MarkdownDisplay>
  );
};

export default Markdown;
