import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { SelectorProps } from './type';
import Typography from '../typography';
import Option from '../option';
import { useRef, useState } from 'react';
import Select from '../select';
import { Portal } from 'react-native-paper';
import { TCatalog } from '../../types/catalogs.type';
import { styles } from './style';

export const Selector = ({ options, title, onSelect }: SelectorProps) => {
  const [optionSelected, setOptionSelected] = useState<TCatalog>();
  const optionsRef = useRef<BottomSheetModal>(null);
  const onActive = () => optionsRef.current?.present();
  const onPressOption = (val: TCatalog) => {
    setOptionSelected(val);
    optionsRef.current?.close();
    return onSelect(val);
  };
  const VAL_SELECT = optionSelected && optionSelected.key;
  return (
    <>
      <Select title={title} value={VAL_SELECT} onActive={onActive} />
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            enableDynamicSizing
            ref={optionsRef}
            index={1}
            snapPoints={['55%', '85%']}
          >
            <BottomSheetView style={styles.optionContainer}>
              <Typography.DescriptionBold>
                Seleccione una opción
              </Typography.DescriptionBold>
              {options.map((itm, idx) => (
                <Option
                  key={'key-' + idx}
                  value={itm}
                  onPress={onPressOption}
                  isSelect={itm.id === optionSelected?.id}
                >
                  {itm?.key || ''}
                </Option>
              ))}
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </>
  );
};
