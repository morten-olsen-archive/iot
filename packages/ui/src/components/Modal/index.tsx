import React, { useRef, ReactNode, useEffect } from 'react';
import styled from 'styled-components/native';
import ReactDOM from 'react-dom';
import Row, { Icon } from '../Row';

interface Props {
  visible: boolean;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

const Background = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .8);
  backdrop-filter: blur(20px);
`;

const Content = styled.View`
  background: #fff;
  min-width: 400px;
  box-shadow: 0 0 135px rgba(0,0,0,.4);
`;

const createDomElement = () => {
  const elm = document.createElement('div');
  elm.style.position = 'fixed';
  elm.style.left = '0';
  elm.style.top = '0';
  elm.style.right = '0';
  elm.style.bottom = '0';
  return elm;
};

const Modal: React.FC<Props> = ({ visible, children, title, onClose }) => {
  const domElement = useRef(createDomElement());

  useEffect(() => {
    document.body.appendChild(domElement.current);
    return () => { domElement.current.remove(); };
  }, [domElement]);

  useEffect(() => {
    domElement.current.style.display = visible ? 'block' : 'none';
  }, [domElement, visible]);

  if (!visible) {
    return <></>;
  }

  const node = (
    <Background>
      <Content>
        <Row
          title={title}
          right={onClose && <Icon onPress={onClose} name="x" />}
        />
        {children}
      </Content>
    </Background>
  );

  return ReactDOM.createPortal(node, domElement.current);
};

export default Modal;
