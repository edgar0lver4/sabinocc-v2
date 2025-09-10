import { StyleSheet, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { BLUE_DARK } from '../styles/colors';
import { useAppDispatch, useAppSelector } from '../redux';
import { closeError } from '../redux/slicer/errors.slicer';

const ModalErrors = () => {
  const dispatch = useAppDispatch();
  const errorStore = useAppSelector(store => store.errors);
  const handleClose = () => {
    dispatch(closeError());
  };

  return (
    <Portal>
      <Modal visible={errorStore.isOpen} contentContainerStyle={style.modal}>
        <Text style={style.title}>{errorStore.title}</Text>
        <Text style={style.description}>{errorStore.status}</Text>
        <Button
          mode="contained"
          style={{ marginTop: 16 }}
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
    padding: 16,
    borderRadius: 8,
    width: 360,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: BLUE_DARK,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    color: BLUE_DARK,
  },
});

export default ModalErrors;
