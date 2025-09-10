import {ReactNode} from 'react';
import {Text, View} from 'react-native';

type Props = {
  title: string;
  children: ReactNode | ReactNode[];
};

const Section = ({title, children}: Props) => {
  return (
    <View>
      <Text style={{fontWeight: '600', color: '#fff'}}>{title}</Text>
      {children}
    </View>
  );
};

export default Section;
