import { Proyect } from '../core/proyects/type';
import { Property } from './properties.type';

export type TSession = {
  type: string;
  token: string;
  name: string;
  image?: string;
  email: string;
  properties: Property[];
  selectedProperty?: Property;
  selectedProyect?: Proyect;
};
