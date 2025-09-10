import { Modal, Text } from 'react-native-paper';
import { Props } from './type';
import { View } from 'react-native';
import { style } from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppButton } from '../../../../Report/Forms/components/Buttons';

export const ModalAccpet = ({ visible, onAccept, onCancel }: Props) => {
  return (
    <Modal visible={visible} contentContainerStyle={style.modal}>
      <View style={style.titleModal}>
        <Icon name="alert" size={24} color={'#fff'} style={style.iconModal} />
        <Text style={style.textTitle}>Acción irreversible</Text>
      </View>
      <View style={style.descriptionContainer}>
        <Text style={style.textDescription}>
          ¿Estas seguro de realizar está acción?
        </Text>
      </View>
      <View style={style.buttonsContainer}>
        <AppButton
          iconName="check"
          label="Aceptar"
          variant="SUCCESS"
          onPress={onAccept}
          style={style.mb8}
        />
        <AppButton
          iconName="cancel"
          label="Cancelar"
          variant="DANGER"
          onPress={onCancel}
        />
      </View>
    </Modal>
  );
};
