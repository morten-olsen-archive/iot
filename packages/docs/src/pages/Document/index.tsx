import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import documents from '../../docs';

const Document = () => {
  const { name } = useParams();
  const DocumentBody = useMemo(() => documents[name], [name]);
  return <>{DocumentBody ? <DocumentBody /> : <div>Not found</div>}</>;
};

export default Document;
