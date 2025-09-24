import { PayloadAction } from '@reduxjs/toolkit';
import { TSession } from '../../types/session.types';
import { Property } from '../../types/properties.type';
import { Proyect } from '../../core/proyects/type';

export const setSessionInfo = (
  state: TSession & { isLogin: boolean },
  action: PayloadAction<TSession>,
) => {
  state.email = action.payload.email;
  state.image = action.payload.image;
  state.isLogin = true;
  state.name = action.payload.name;
  state.token = action.payload.token;
  state.type = action.payload.type;
  state.properties = action.payload.properties;
};

export const setHouseSelected = (
  state: TSession & { isLogin: boolean },
  action: PayloadAction<Property>,
) => {
  state.selectedProperty = action.payload;
};

export const setProyectSelected = (
  state: TSession & { isLogin: boolean },
  action: PayloadAction<Proyect>,
) => {
  state.selectedProyect = action.payload;
};

export const setProperties = (
  state: TSession & { isLogin: boolean },
  action: PayloadAction<Property[]>,
) => {
  state.properties = action.payload;
};
