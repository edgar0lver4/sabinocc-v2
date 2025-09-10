import Lottie from 'lottie-react-native';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BLUE_DARK } from '../../../styles/colors';
import { Button } from 'react-native-paper';
import { useCallback, useState } from 'react';
import {
  EReportStepsTutorial,
  EReportTutorialTitle,
} from '../../../enums/report.tutorial.enum';
import storage from '../../../db/storage';
import { EStorage } from '../../../enums/storage.enum';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch } from '../../../redux';
import { closeLoader } from '../../../redux/slicer/loader.slicer';

const ANIM_STEP1 = require('../../../animations/report_anm_1.json');
const ANIM_STEP2 = require('../../../animations/report_anm_2.json');
const ANIM_STEP3 = require('../../../animations/report_anm_3.json');
const ANIM_STEP4 = require('../../../animations/report_anm_4.json');

const ReportTutorialScreen = ({ navigation: { navigate } }: any) => {
  const [step, setStep] = useState(EReportStepsTutorial.STEP1);
  const [animation, setAnimation] = useState(ANIM_STEP1);
  const [title, setTitle] = useState(EReportTutorialTitle.STEP1);

  const dispatch = useAppDispatch();

  const handleContinue = () => {
    switch (step) {
      case EReportStepsTutorial.STEP1:
        setAnimation(ANIM_STEP2);
        setStep(EReportStepsTutorial.STEP2);
        setTitle(EReportTutorialTitle.STEP2);
        break;
      case EReportStepsTutorial.STEP2:
        setAnimation(ANIM_STEP3);
        setStep(EReportStepsTutorial.STEP3);
        setTitle(EReportTutorialTitle.STEP3);
        break;
      case EReportStepsTutorial.STEP3:
        setAnimation(ANIM_STEP4);
        setStep(EReportStepsTutorial.STEP4);
        setTitle(EReportTutorialTitle.STEP4);
        break;
      default:
        setAnimation(ANIM_STEP1);
        setStep(EReportStepsTutorial.STEP1);
        setTitle(EReportTutorialTitle.STEP1);
        break;
    }
  };

  const finishTutorial = () => {
    storage.save({
      key: EStorage.reportTutorial,
      data: {
        finish: true,
      },
    });
    navigate('ReportHome');
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(closeLoader());
      storage
        .load({
          key: EStorage.reportTutorial,
          autoSync: true,
          syncInBackground: true,
        })
        .then(val => {
          if (val.finish) navigate('Profile');
        });
    }, []),
  );

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>{title}</Text>
      <View style={{ height: '80%' }}>
        <Lottie
          source={animation}
          autoPlay
          style={{ display: 'flex', flex: 1 }}
        />
      </View>
      <View style={Platform.OS === 'ios' && { marginHorizontal: 16 }}>
        {step < EReportStepsTutorial.STEP4 ? (
          <Button
            onPress={handleContinue}
            mode="contained"
            textColor={'#fff'}
            buttonColor={BLUE_DARK}
          >
            Continuar
          </Button>
        ) : (
          <Button
            onPress={finishTutorial}
            mode="contained"
            textColor={'#fff'}
            buttonColor={BLUE_DARK}
          >
            Terminar
          </Button>
        )}
        {step < EReportStepsTutorial.STEP4 && (
          <Button mode="text" textColor={BLUE_DARK} onPress={finishTutorial}>
            Omitir
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 8,
    lineHeight: 22,
    fontSize: 20,
    color: BLUE_DARK,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ReportTutorialScreen;
