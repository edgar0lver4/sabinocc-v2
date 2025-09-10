import { Text, TouchableOpacity, View } from 'react-native';
import { Props } from './type';
import { style } from './style';

const CardList = ({ title, subtitle, onPress }: Props) => {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={style.outSelectLine} />
      <View style={style.detailsContainer}>
        <View>
          <Text style={style.textTitle}>{title}</Text>
        </View>
        <View>
          <Text style={style.textSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardList;
