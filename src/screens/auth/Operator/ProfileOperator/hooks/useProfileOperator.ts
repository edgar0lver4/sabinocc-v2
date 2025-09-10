import { useCallback, useEffect, useMemo, useState } from 'react';
import { TicketBtnKPI } from '../../../../../core/tickets/enums';
import { Ticket } from '../../../../../core/tickets/types';
import { useAppDispatch, useAppSelector } from '../../../../../redux';
import { getOperatorTicketWarranty } from '../../../../../services/operator/service';
import { useLoader } from '../../../../../hooks/useLoader';
import { useModalError } from '../../../../../hooks/useModalError';
import { useNavigation } from '@react-navigation/native';
import { selectTicketRdx } from '../../../../../redux/slicer/operator.slicer';
import { RoutesName } from '../../../../../routes/names.enum';

export const useProfileOperator = () => {
  const [btnSelected, setSelectedBtn] = useState(TicketBtnKPI.ACTIVE);
  const [initialList, setInitialList] = useState<Ticket[]>([]);
  const { hiddeLoader, showLoader } = useLoader();
  const { showModalError } = useModalError();
  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();
  const operatorStore = useAppSelector(store => store.operator);

  const { active, close, total } = useMemo(() => {
    const active = initialList.filter(itm => !itm.closed).length;
    const close = initialList.filter(itm => itm.closed).length;
    const total = initialList.length;
    return {
      active,
      close,
      total,
    };
  }, [initialList, btnSelected]);

  const listTickets: Ticket[] = useMemo(() => {
    if (btnSelected === TicketBtnKPI.ACTIVE) {
      return initialList.filter(itm => !itm.closed);
    }
    if (btnSelected === TicketBtnKPI.CLOSE) {
      return initialList.filter(itm => itm.closed);
    }
    return initialList;
  }, [initialList, btnSelected]);

  const handleSelectBtn = (val: TicketBtnKPI) => {
    setSelectedBtn(val);
  };

  const handleSelectTicket = (ticket: Ticket) => {
    dispatch(selectTicketRdx(ticket));
    navigate(RoutesName.TICKET_OPERATOR);
  };

  const initData = useCallback(async () => {
    showLoader('Cargando tickets');
    try {
      const propertyId = operatorStore.selectedProperty?.id || 0;
      const listTickets = await getOperatorTicketWarranty(propertyId);
      setInitialList(listTickets);
    } catch (e) {
      showModalError('No se pudo cargar la información de los tickets');
    }
    hiddeLoader();
  }, [operatorStore]);

  useEffect(() => {
    initData();
  }, [operatorStore]);

  return {
    btnSelected,
    listTickets,
    active,
    close,
    total,
    handleSelectBtn,
    handleSelectTicket,
  };
};
