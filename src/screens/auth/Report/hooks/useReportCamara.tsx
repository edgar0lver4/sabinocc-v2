import { FormikProps } from 'formik';
import { useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { TFormikReport } from '../../../../types/report.type';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useModalError } from '../../../../hooks/useModalError';

export const useReportCamara = (formik: FormikProps<TFormikReport>) => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState('');
  const [imgBase64, setImgBase64] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const { showModalError } = useModalError();

  const checkPermissions = async () => {
    const PCAM = PermissionsAndroid.PERMISSIONS.CAMERA;
    const PRMI = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    const PRES = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const PWES = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    try {
      const status = 'granted';

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(PRMI);
        if (Number(Platform.Version) >= 33) {
          if (status === 'granted' && granted) {
            setShowCamera(true);
          } else {
            const granted = await PermissionsAndroid.requestMultiple([
              PCAM,
              PRMI,
            ]);
            setShowCamera(
              granted[PCAM] === 'granted' && granted[PRMI] === 'granted',
            );
          }
        } else {
          if (status === 'granted') {
            setShowCamera(true);
          } else {
            const granted = await PermissionsAndroid.requestMultiple([
              PCAM,
              PRMI,
              PRES,
              PWES,
            ]);
            const isPermission =
              granted[PCAM] === 'granted' &&
              granted[PRMI] === 'granted' &&
              granted[PRES] === 'granted' &&
              granted[PWES] === 'granted';
            setShowCamera(isPermission);
          }
        }
      } else {
        if (status === 'granted') {
          setShowCamera(true);
        } else {
          //const granted = await Camera.requestCameraPermission();
          //setShowCamera(granted === 'granted');
        }
      }
    } catch (e) {
      Alert.alert('No se tienen los permisos correctos');
    }
  };

  const confirm = async (imageUri: string) => {
    if (imageUri !== '') {
      try {
        const prevRequest = await fetch(imageUri);
        const prevData: any = await prevRequest.blob();
        const destination =
          Platform.OS === 'android'
            ? `file://${RNFS.TemporaryDirectoryPath}/report-${prevData['_data'].name}`
            : `${RNFS.TemporaryDirectoryPath}/report-${prevData['_data'].name}`;
        const existPath = await RNFS.exists(destination);
        if (existPath) {
          Platform.OS !== 'ios' ? await RNFS.unlink(destination) : null;
        }
        await RNFS.moveFile(imageUri, destination);
        const save = await CameraRoll.save(destination, {
          type: 'photo',
        });
        let savedUri = destination;
        if (Platform.OS !== 'ios') {
          const stat = await RNFS.stat(save);
          savedUri = `file://${stat.originalFilepath}`;
        }
        const request = await fetch(savedUri);
        const data: any = await request.blob();
        const readFile = await RNFS.readFile(savedUri, 'base64');

        const payload = {
          fileName: data['_data'].name,
          contentType: data['_data'].type,
          fileContent: readFile,
        };
        formik.setFieldValue('adjuntos', [payload]);
        setImgBase64(readFile);
      } catch (e: any) {
        Alert.alert('Error:', e);
        console.log('Error in save image:', e);
      }
    } else {
      showModalError('Error al tomar la foto, por favor vuelva a intentarlo');
    }
  };

  const retake = () => {
    setCapturedPhoto('');
    setShowPreview(false);
    formik.setFieldValue('adjuntos', null);
  };

  return {
    showCamera,
    showPreview,
    capturedPhoto,
    imgBase64,
    checkPermissions,
    setCapturedPhoto,
    setShowCamera,
    confirm,
    retake,
  };
};
