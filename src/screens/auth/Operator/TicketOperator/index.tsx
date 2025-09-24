import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../../../components/container';
import Header from '../../../../components/header';
import { useAppSelector } from '../../../../redux';
import { Modal, TextInput } from 'react-native-paper';
import { Text, View } from 'react-native';
import dayjs from 'dayjs';
import { style } from './style';
import FormOperator from './components/FormOperator';
import CameraFlux from '../../../../components/cameraFlux';
import { useTicketOperator } from './hooks/useTicketOperator';
import ImageVisor from '../../../../components/cameraFlux/components/Visor';
import { AppButton } from '../../Report/Forms/components/Buttons';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useState } from 'react';
import { ModalAccpet } from './components/ModalAcept';

const TicketOperatorScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState('');
  const { photos, onTakePhoto, handleReplyTicket, handleReplyAndCloseTicket } =
    useTicketOperator();
  const { goBack } = useNavigation();
  const operatorStore = useAppSelector(store => store.operator);
  const sesionStore = useAppSelector(store => store.session);
  const toggleModal = () => setOpenModal(!openModal);

  const ticket = operatorStore.selectedTicket;
  const CREATE_AT = dayjs(ticket?.createDate).format('DD/MM/YYYY [a] HH:MM');
  const MODIFIED_AT = dayjs(ticket?.modificationDate).format(
    'DD/MM/YYYY [a] HH:MM',
  );

  const TITLE = `Ticket: ${operatorStore.selectedTicket?.numTicket}`;
  const SUBTITLE = `Propiedad: ${operatorStore.selectedProperty?.prototipo} ${operatorStore.selectedProperty?.numero}\nProyecto: ${sesionStore.selectedProyect?.name} | ${sesionStore.selectedProyect?.description}`;
  const themeInput: ThemeProp = {
    colors: {
      onSurfaceVariant: 'white',
      onSurfaceDisabled: 'white',
    },
  };

  const DISABLE_SEND = comment === '' || photos.length === 0;

  const _handleReply = async () => {
    await handleReplyTicket(photos, comment);
  };

  const _handleReplyAndClose = async () => {
    await handleReplyAndCloseTicket(photos, comment);
  };

  return (
    <>
      <ScreenContainer variant="SCROLL">
        <Header
          handleLogout={goBack}
          title={TITLE}
          subtitle={SUBTITLE}
          variant="subscreen"
        />
        <View style={style.datesContainer}>
          <View>
            <Text style={style.titleDate}>Fecha de creación</Text>
            <Text style={style.textDate}>{CREATE_AT}</Text>
          </View>
          <View>
            <Text style={style.titleDate}>Fecha de modificación</Text>
            <Text style={style.textDate}>{MODIFIED_AT} </Text>
          </View>
        </View>
        <FormOperator ticket={ticket} />
        <View style={style.photoViews}>
          <TextInput
            label="Comentarios"
            mode="flat"
            textColor="#fff"
            activeUnderlineColor="#fff"
            underlineColor="#fff"
            underlineColorAndroid="#fff"
            multiline
            numberOfLines={3}
            style={style.comments}
            theme={themeInput}
            value={comment}
            onChangeText={val => setComment(val)}
          />
          <ImageVisor items={photos} />
        </View>
        <CameraFlux onConfirm={onTakePhoto} />
        <View style={style.btnsContainer}>
          <AppButton
            label="Responder reporte"
            disabled={DISABLE_SEND}
            onPress={_handleReply}
            iconName="comment"
            style={style.mb16}
          />
          <AppButton
            label="Responder y cerrar reporte"
            disabled={DISABLE_SEND}
            onPress={toggleModal}
            variant="WARNING"
            style={style.mb16}
            iconName="check-all"
          />
        </View>
      </ScreenContainer>
      <ModalAccpet
        visible={openModal}
        onAccept={_handleReplyAndClose}
        onCancel={toggleModal}
      />
    </>
  );
};

export default TicketOperatorScreen;
