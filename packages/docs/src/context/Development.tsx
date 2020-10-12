import { createContext } from 'react';
import DevelopmentUnit from '../utils/DevelopmentUnit';

const DevelopmentContext = createContext<DevelopmentUnit>(undefined as any);

export default DevelopmentContext;
