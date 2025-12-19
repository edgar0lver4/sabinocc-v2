import { Animated, TouchableOpacity, View } from 'react-native';
import { Props } from './types';
import { useBellAnimation } from '../../hooks/useBellAnimation';
import Icon from 'react-native-vector-icons/Feather';
import { style } from './style';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '../../../../routes/names.enum';

export const Bell = () => {
  const { rotationZ } = useBellAnimation();
  const { navigate } = useNavigation();
  const handlePress = () => {
    navigate(RoutesName.NOTIFICATION as never);
  };
  return (
    <View style={style.bellView}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={{
            transform: [{ rotateZ: rotationZ }],
          }}
        >
          <Icon name="bell" color="#fff" size={24} style={style.topBtn} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
