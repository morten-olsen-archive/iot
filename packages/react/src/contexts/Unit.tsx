import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import Unit, { ChangeRequest, Changes, Store } from '@morten-olsen/iot';
import EventEmitter from 'eventemitter3';

type Listener = (changes: Changes) => void;

interface UnitContextValue {
  store: Store;
  change: (change: ChangeRequest) => Promise<void>;
  onChange: (fn: Listener) => void;
  offChange: (fn: Listener) => void;
}

interface UnitProviderProps {
  setup: (unit: Unit) => Promise<void>;
  children: ReactNode;
  loader: ReactNode;
}

class ReactUnit extends Unit {
  emitter = new EventEmitter();

  onSetup = async () => {
    this.emitter.emit('updated', this.store);
  };

  onChange = async (changes: Changes) => {
    this.emitter.emit('updated', this.store);
    this.emitter.emit('changes', changes);
  };

  setValues = async (changes: ChangeRequest) => {
    this.change(changes);
  };
}

const noProvider = () => {
  throw new Error('No provider');
};

const UnitContext = createContext<UnitContextValue>({
  store: {},
  change: noProvider,
  onChange: noProvider,
  offChange: noProvider,
});

const UnitProvider: React.FC<UnitProviderProps> = ({
  setup,
  children,
  loader,
}) => {
  const [reactUnit, setReactUnit] = useState<ReactUnit | undefined>(undefined);
  const [store, setStore] = useState<Store>({});
  const [listeners, setListeners] = useState<Listener[]>([]);

  useEffect(() => {
    const run = async () => {
      const unit = new ReactUnit();
      unit.emitter.on('updated', (updatedStore: Store) => {
        setStore(updatedStore);
      });
      unit.emitter.on('changed', (changes: Changes) => {
        listeners.forEach((l) => l(changes));
      });
      await setup(unit);
      setReactUnit(unit);
    };

    run();
  }, []);

  const onChange = useCallback((listener: Listener) => {
    setListeners((current) => ({
      ...current,
      listener,
    }));
  }, []);

  const offChange = useCallback((listener: Listener) => {
    setListeners((current) => current.filter((l) => l !== listener));
  }, []);

  const change = useCallback(
    async (changes: ChangeRequest) => {
      if (reactUnit) {
        await reactUnit.setValues(changes);
      }
    },
    [reactUnit]
  );

  if (!reactUnit) {
    return <>{loader}</>;
  }

  return (
    <UnitContext.Provider
      value={{
        store,
        change,
        onChange,
        offChange,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export { UnitProvider };

export default UnitContext;
