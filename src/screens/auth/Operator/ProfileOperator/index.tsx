import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../../redux';
import { ScreenContainer } from '../../../../components/container';
import KPICard from '../../../../components/KPICard';
import Header from '../../../../components/header';
import { FlatList, View } from 'react-native';
import { style } from './style';
import { useState } from 'react';
import { TicketBtnKPI } from '../../../../core/tickets/enums';
import { useProfileOperator } from './hooks/useProfileOperator';
import { Ticket } from '../../../../core/tickets/types';
import CardList from '../../../../components/cardList';

const ProfileOperatorScreen = () => {
  const {
    btnSelected,
    listTickets,
    active,
    close,
    total,
    handleSelectBtn,
    handleSelectTicket,
  } = useProfileOperator();
  const { goBack } = useNavigation();
  const operatorStore = useAppSelector(store => store.operator);
  const sessionStore = useAppSelector(store => store.session);

  const TITLE = `${operatorStore.selectedProperty?.prototipo} | ${operatorStore.selectedProperty?.numero}`;
  const SUBTITLE = `Proyecto: ${sessionStore.selectedProyect?.name} | Seleccione un ticket`;

  const renderItem = (ticket: Ticket) => {
    return (
      <CardList
        title={`${ticket.numTicket} | ${ticket.tipoReporte}`}
        subtitle={`Area: ${ticket.tipoArea} | ${ticket.descripcion}`}
        onPress={() => handleSelectTicket(ticket)}
      />
    );
  };

  return (
    <ScreenContainer>
      <Header handleLogout={goBack} title={TITLE} subtitle={SUBTITLE} />
      <View style={style.views}>
        <KPICard
          isActive={btnSelected === TicketBtnKPI.ACTIVE}
          number={active}
          title="Activos"
          variant="DANGER"
          onPress={() => handleSelectBtn(TicketBtnKPI.ACTIVE)}
        />
        <KPICard
          isActive={btnSelected === TicketBtnKPI.CLOSE}
          number={close}
          title="Cerrados"
          variant="SUCCESS"
          onPress={() => handleSelectBtn(TicketBtnKPI.CLOSE)}
        />
        <KPICard
          isActive={btnSelected === TicketBtnKPI.TOTAL}
          number={total}
          title="Total"
          onPress={() => handleSelectBtn(TicketBtnKPI.TOTAL)}
        />
      </View>
      <FlatList
        data={listTickets}
        renderItem={({ item }) => renderItem(item)}
        style={style.list}
      />
    </ScreenContainer>
  );
};

export default ProfileOperatorScreen;
