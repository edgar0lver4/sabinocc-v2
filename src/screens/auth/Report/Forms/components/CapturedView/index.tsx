import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Props } from './types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CapturedView = ({ capturedPhoto, confirm, retake }: Props) => {
  return (
    <>
      <View style={styles.courtine} />
      <View style={styles.viewerContainer}>
        <Image source={{ uri: capturedPhoto }} style={styles.imageConfirm} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.p8} onPress={retake}>
            <Icon name="camera-retake" color={'#fff'} size={32} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.p8} onPress={confirm}>
            <Icon name="check" color={'#fff'} size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CapturedView;
