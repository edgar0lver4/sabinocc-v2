import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Props } from './types';
import { style } from './style';
import { YELLOW_LIGHT } from '../../styles/colors';

const Header = ({
  title,
  subtitle,
  handleLogout,
  variant = 'default',
}: Props) => {
  const imageStyle =
    variant === 'subscreen'
      ? { width: 40, height: 40 }
      : { width: 56, height: 56 };
  const titleStyle =
    variant === 'subscreen' ? style.titleSubscreen : style.title;
  const imageContainerStyle =
    variant === 'subscreen'
      ? style.imageSubscreenContainer
      : style.imageContainer;
  return (
    <View style={style.headerContainer}>
      <View style={imageContainerStyle}>
        {variant === 'subscreen' && (
          <TouchableOpacity onPress={handleLogout}>
            <Icon
              name="arrow-left"
              color="#fff"
              size={32}
              style={style.topBtn}
            />
          </TouchableOpacity>
        )}
        {variant !== 'subscreen' && (
          <Image
            source={require('../../assets/logo_dorado.webp')}
            style={imageStyle}
          />
        )}
      </View>
      <View style={style.bottomActionsContainer}>
        <View style={style.textContainer}>
          <Text style={titleStyle}>{title}</Text>
          {subtitle && <Text style={style.textSubtitle}>{subtitle}</Text>}
        </View>
        {variant !== 'subscreen' && (
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out" color="#fff" size={32} />
          </TouchableOpacity>
        )}
        {variant === 'subscreen' && (
          <Image
            source={require('../../assets/logo_dorado.webp')}
            style={imageStyle}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
