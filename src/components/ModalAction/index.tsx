import { Modal, Portal } from 'react-native-paper';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppButton } from '../../screens/auth/Report/Forms/components/Buttons';
import { STEEL_WHITE } from '../../styles/colors';
import { style } from './style';
import { Props } from './type';

const ModalAction = ({
  isVisible,
  header,
  title,
  description,
  btnPrimaryLabel,
  btnSecondaryLabel,
  btnPrimaryDisabled,
  btnSecondaryDisabled,
  onPressAccept,
  onPressCancel,
}: Props) => {
  return (
    <Portal>
      <Modal visible={isVisible} contentContainerStyle={style.modal}>
        <View style={style.modalHeader}>
          <Icon color={STEEL_WHITE} name="send-circle-outline" size={24} />
          <Text style={style.modalHeaderText}>{header}</Text>
        </View>
        <View style={style.modalContainer}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.description}>{description}</Text>
          <AppButton
            label={btnPrimaryLabel}
            onPress={onPressAccept}
            variant="SUCCESS"
            style={style.btn}
            iconName="check"
            disabled={btnPrimaryDisabled}
          />
          <AppButton
            label={btnSecondaryLabel}
            onPress={onPressCancel}
            variant="DANGER"
            iconName="cancel"
            disabled={btnSecondaryDisabled}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalAction;
