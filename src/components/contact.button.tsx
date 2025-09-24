import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAwasome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  iconName: string;
  description: string;
  onPress: () => void;
};

const ContactButton = ({iconName, description, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      {iconName === 'tiktok' ? (
        <IconMaterialIcon name={iconName} size={32} color="#fff" />
      ) : iconName === 'youtube' ? (
        <IconAntDesign name={iconName} size={32} color="#fff" />
      ) : iconName === 'linkedin' ? (
        <IconAwasome name={iconName} size={32} color="#fff" />
      ) : (
        <IconMaterial name={iconName} size={32} color="#fff" />
      )}
      <Text style={style.text}>{description}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    color: '#fff',
  },
});

export default ContactButton;
