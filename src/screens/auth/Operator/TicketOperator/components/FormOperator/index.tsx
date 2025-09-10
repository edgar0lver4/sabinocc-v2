import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { styles } from './style';
import { Props } from './type';

const FormOperator = ({ ticket }: Props) => {
  const themeInput: ThemeProp = {
    colors: {
      onSurfaceVariant: 'white',
      onSurfaceDisabled: 'white',
    },
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Ubicación"
        mode="flat"
        textColor="#fff"
        activeUnderlineColor="#fff"
        underlineColor="#fff"
        underlineColorAndroid="#fff"
        value={ticket?.tipoArea}
        theme={themeInput}
        style={styles.textInput}
        disabled
      />
      <TextInput
        label="Tipo de reporte"
        mode="flat"
        textColor="#fff"
        activeUnderlineColor="#fff"
        underlineColor="#fff"
        underlineColorAndroid="#fff"
        value={ticket?.tipoReporte}
        theme={themeInput}
        style={[styles.textInput, styles.mt16]}
        disabled
      />
      <TextInput
        label="Descripción de lo sucedido"
        multiline
        mode="flat"
        textColor="#fff"
        activeUnderlineColor="#fff"
        underlineColor="#fff"
        underlineColorAndroid="#fff"
        value={ticket?.descripcion}
        theme={themeInput}
        style={[styles.textInput, styles.mt16]}
        disabled
      />
    </View>
  );
};

export default FormOperator;
