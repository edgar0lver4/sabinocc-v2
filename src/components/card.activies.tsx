import IconFather from 'react-native-vector-icons/Feather';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TActivity} from '../services/activities/services.type';
import {
  BLUE_LIGHT,
  BLUE_TRANSPARENT,
  GREEN_DARK,
  GREEN_DARK_TRANSPARENT,
  GREEN_TRANSPARENT,
} from '../styles/colors';
import {transformDate} from '../utils/format';

type Props = {
  itm: TActivity;
  onPress: (val: any) => void;
};

const CardActivities = ({itm, onPress}: Props) => {
  const isFinalized = () => {
    const dateA: any = new Date(`${transformDate(itm.date)}T${itm.hour}:00Z`);
    const dateB: any = new Date();
    return dateA - dateB <= 0;
  };

  const handlePress = () => {
    onPress(itm.id);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ImageBackground source={{uri: itm.image}} style={styles.imageActivity}>
        {isFinalized() && (
          <View style={styles.courtainNormal}>
            <IconFather name="check-circle" size={32} color={'#fff'} />
            <Text style={{color: '#FFF'}}>Finalizado</Text>
          </View>
        )}
        {!isFinalized() && itm.isRegister && (
          <View style={styles.courtineRegister}>
            <IconFather name="user-check" size={32} color={'#fff'} />
            <Text style={{color: '#FFF'}}>Registrado</Text>
          </View>
        )}
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{itm.title}</Text>
        <Text style={styles.dateText}>
          Cuando: {itm.date}-{itm.hour}
        </Text>
        <Text style={styles.descriptionText}>{itm.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 5,
  },
  textContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    flexDirection: 'column',
  },
  courtainNormal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREEN_TRANSPARENT,
  },
  courtineRegister: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE_TRANSPARENT,
  },
  imageActivity: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BLUE_LIGHT,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  descriptionText: {
    textAlign: 'justify',
    width: '80%',
    color: BLUE_LIGHT,
    marginTop: 8,
  },
});

export default CardActivities;
