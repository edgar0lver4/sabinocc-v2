import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Proyect } from '../../core/proyects/type';
import { getProperties, getProyectList } from '../../services/operator/service';
import { useAppDispatch } from '../../redux';
import { setProyectSelectedRdx } from '../../redux/slicer/session.slicer';
import {
  selectOperatorPropertyRdx,
  setOperatorPropertiesRdx,
} from '../../redux/slicer/operator.slicer';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '../../routes/names.enum';
import { PropertyOperator } from '../../core/operator/types';

export const useProyects = () => {
  const [proyects, setProyects] = useState<Proyect[]>([]);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const setProyect = (proyect: Proyect) =>
    dispatch(setProyectSelectedRdx(proyect));

  const setPropertyOperator = (property: PropertyOperator) =>
    dispatch(selectOperatorPropertyRdx(property));

  const setPropertiesWithIdProyect = async (id: number) => {
    try {
      const properties = await getProperties(id);
      if (properties.length > 0) {
        dispatch(setOperatorPropertiesRdx(properties));
        navigate(RoutesName.LIST_PROPERTIES);
      }
    } catch (e) {
      throw e;
    }
  };

  const initData = useCallback(async () => {
    const list = await getProyectList();
    setProyects(list);
  }, []);

  useEffect(() => {
    initData();
  }, []);

  return {
    proyects,
    setProyect,
    setPropertiesWithIdProyect,
    setPropertyOperator,
  };
};
