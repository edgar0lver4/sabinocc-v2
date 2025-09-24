import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {BLUE_DARK, BLUE_LIGHT, STEEL_50, YELLOW_LIGHT} from '../styles/colors';

const CardInformation = ({
  title,
  modificationDate,
  documentURL,
}: TDocuments) => {
  const gotoDocument = async () => {
    const isOpen = await Linking.canOpenURL(documentURL);
    if (isOpen) {
      Linking.openURL(documentURL);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Text style={style.documentTitle}>{title}</Text>
        <Text style={style.documentModification}>
          Actualizado al {modificationDate}
        </Text>
      </View>
      <TouchableOpacity style={style.button} onPress={gotoDocument}>
        <IconMCI name="file-download-outline" size={32} color={YELLOW_LIGHT} />
        <Text style={style.downloadText}>Descargar</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: BLUE_DARK,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
    marginTop: 16,
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: BLUE_LIGHT,
    height: 42,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
  },
  documentTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  downloadText: {
    color: YELLOW_LIGHT,
  },
  documentModification: {
    color: STEEL_50,
  },
});

export default CardInformation;
