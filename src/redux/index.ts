import { configureStore } from '@reduxjs/toolkit';
import sessionStore from './slicer/session.slicer';
import loaderStore from './slicer/loader.slicer';
import errorStore from './slicer/errors.slicer';
import operatorStore from './slicer/operator.slicer';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    session: sessionStore,
    loader: loaderStore,
    errors: errorStore,
    operator: operatorStore,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
