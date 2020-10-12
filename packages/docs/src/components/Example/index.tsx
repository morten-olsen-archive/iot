import React, { ReactNode, useCallback, useMemo } from 'react';
import { Margin } from '@morten-olsen/iot-ui';
import { UnitProvider } from '@morten-olsen/iot-react';
import Initial from '@morten-olsen/iot-initial';
import Master from '@morten-olsen/iot-master';
import Unit, { AllowedValues } from '@morten-olsen/iot';
import Multiplex from '@morten-olsen/iot-multiplex';
import DevelopmentUnit from '../../utils/DevelopmentUnit';
import Store from '../../components/Store';
import DevelopmentContext from '../../context/Development';

interface Props {
  initial?: { [name: string]: AllowedValues };
  children: ReactNode;
}

const Example: React.FC<Props> = ({ initial = {}, children }) => {
  const developmentUnit = useMemo(() => {
    const unit = new DevelopmentUnit();
    return unit;
  }, []);

  const setup = useCallback(
    async (unit: Unit) => {
      const multiplex = new Multiplex([developmentUnit, unit]);
      const initialUnit = new Initial(multiplex, initial);
      const master = new Master(initialUnit);
      await master.initialize();
    },
    [initial, developmentUnit]
  );

  return (
    <Margin top bottom>
      <UnitProvider setup={setup}>
        <DevelopmentContext.Provider value={developmentUnit}>
          {children}
        </DevelopmentContext.Provider>
      </UnitProvider>
    </Margin>
  );
};

export default Example;
