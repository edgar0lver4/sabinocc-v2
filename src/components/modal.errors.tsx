import { StyleSheet, Text, View } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { BLUE_DARK, STEEL_WHITE } from '../styles/colors';
import { useAppDispatch, useAppSelector } from '../redux';
import { closeError } from '../redux/slicer/errors.slicer';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalErrors = () => {
  const dispatch = useAppDispatch();
  const errorStore = useAppSelector(store => store.errors);
  const handleClose = () => {
    dispatch(closeError());
  };

  return (
    <Portal>
      <Modal visible={errorStore.isOpen} contentContainerStyle={style.modal}>
        <View style={style.modalHeader}>
          <Icon name="warning" size={18} color={STEEL_WHITE} />
          <Text style={style.modalHeaderText}>Ocurrio un error</Text>
        </View>
        <Text style={style.title}>{errorStore.title}</Text>
        {errorStore.status !== 0 && (
          <Text style={style.description}>{errorStore.status}</Text>
        )}
        <Button
          mode="contained"
          style={style.buttonAction}
          buttonColor={BLUE_DARK}
          onPress={handleClose}
        >
          Aceptar
        </Button>
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 360,
    alignSelf: 'center',
  },
  modalHeader: {
    backgroundColor: BLUE_DARK,
    paddingVertical: 12,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  modalHeaderText: {
    color: STEEL_WHITE,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: BLUE_DARK,
    textAlign: 'center',
    marginVertical: 24,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 16,
    color: BLUE_DARK,
  },
  buttonAction: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default ModalErrors;
