import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import documents from '../../docs';

const Wrapper = styled.div`
  padding: 50px;
  margin: auto;
  max-width: 900px;
  width: 100%;
  box-shadow: 0px 10px 200px 0px rgba(0, 0, 0, 0.3);

  code {
    color: red;
    padding: 0 5px;
  }
`;

const Document = () => {
  const { name } = useParams<{ name: string }>();
  const DocumentBody = useMemo(() => documents[name], [name]);
  return (
    <Wrapper>{DocumentBody ? <DocumentBody /> : <div>Not found</div>}</Wrapper>
  );
};

export default Document;
