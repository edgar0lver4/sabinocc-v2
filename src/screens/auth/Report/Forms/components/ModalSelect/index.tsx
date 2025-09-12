import { useState } from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { Props } from './types';
import { ScrollView, TouchableOpacity } from 'react-native';
import { style } from './style';
import Option from '../../../../../../components/option';

export const ModalSelect = ({
  title,
  titleModal,
  value,
  diasabled,
  options,
  onPress,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);

  const styleContainerSelected =
    value && value !== '' ? style.containerSelected : style.container;
  const styleContainer = diasabled
    ? style.containerDisabled
    : styleContainerSelected;

  const styleActiveTxt =
    value && value !== '' ? style.titleActive : style.title;
  const styleDisabledTxt = diasabled ? style.titleDisabled : styleActiveTxt;

  const handlePress = (val: string | number | boolean) => {
    onPress && onPress(val);
    toggleModal();
  };
  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        style={[styleContainer]}
        disabled={diasabled}
      >
        <Text style={styleDisabledTxt}>{title}</Text>
        {value && <Text style={style.title}>{value}</Text>}
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={showModal}
          contentContainerStyle={style.containerOptions}
          onDismiss={toggleModal}
        >
          <Text>{titleModal}</Text>
          <ScrollView>
            {options.map(itm => (
              <Option
                isSelect={itm.value === value}
                onPress={handlePress}
                value={itm.value}
                key={`key-${itm.value}`}
              >
                {itm.label}
              </Option>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
};
