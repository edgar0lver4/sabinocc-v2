import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TReport} from '../../../../types/report.type';
import {BLUE_DARK, BLUE_LIGHT} from '../../../../styles/colors';
import {dateTimeISO} from '../../../../utils/format';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  reports: Array<TReport>;
  onPress?: (val: string) => void;
};

const ReportIncidentScreen = ({reports, onPress}: Props) => {
  const list: Array<TReport> = reports.filter(
    itm =>
      itm.closed === false &&
      itm.nextWorkDate === null &&
      itm.evaluationDate === null,
  );
  const handlePress = (val: any) => {
    onPress && onPress(val);
  };
  return (
    <ScrollView style={style.container}>
      {list?.length === 0 && (
        <Text style={style.textWithNotReports}>
          No hay incidentes activos sin atender
        </Text>
      )}
      {list?.length > 0 &&
        list.map((itm, idx) => (
          <TouchableOpacity
            key={'id-' + idx}
            style={style.targetContainer}
            onPress={() => handlePress(itm.numTicket)}>
            <Text style={style.textTypeReport}>
              #{itm.numTicket} - Reporte de {itm.tipoReporte}
            </Text>
            <Text style={style.targetDescription}>{itm.descripcion}</Text>
            <View style={style.targetDateContainer}>
              <Text style={style.targetDateText}>Fecha de reporte:</Text>
              <Text style={style.targetDateTextDate}>
                {dateTimeISO(itm.createDate)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  textWithNotReports: {
    paddingTop: 16,
    color: BLUE_LIGHT,
    fontWeight: 'bold',
    fontSize: 18,
  },
  targetContainer: {
    flexDirection: 'column',
    display: 'flex',
    backgroundColor: BLUE_DARK,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    elevation: 6,
  },
  textTypeReport: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  targetDescription: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 8,
  },
  targetDateContainer: {
    flexDirection: 'row',
  },
  targetDateText: {
    color: '#C8C8C8',
    fontWeight: '600',
    fontSize: 12,
  },
  targetDateTextDate: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default ReportIncidentScreen;
