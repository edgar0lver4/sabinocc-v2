import { ScrollView, StatusBar, View } from 'react-native';
import { BLUE_DARK } from '../../styles/colors';
import { styles } from './style';
import { Props } from './types';

export const ScreenContainer = ({
  children,
  style,
  variant = 'DEFAULT',
}: Props) => {
  if (variant === 'SCROLL')
    return (
      <ScrollView style={[styles.container, style]}>
        <StatusBar backgroundColor={BLUE_DARK} />
        {children}
      </ScrollView>
    );

  return (
    <View style={[styles.container, style]}>
      <StatusBar backgroundColor={BLUE_DARK} />
      {children}
    </View>
  );
};
