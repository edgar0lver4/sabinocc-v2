import { RefObject, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { CameraApi } from 'react-native-camera-kit';
import { useModalError } from '../../../hooks/useModalError';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PhotoData } from '../types';

export const useCameraController = () => {
  const [showCamera, setShowCamera] = useState(false);
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
            const isPermission =
              granted[PCAM] === 'granted' && granted[PRMI] === 'granted';
            setShowCamera(isPermission);
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
        }
      }
    } catch (e) {
      Alert.alert('No se tienen los permisos correctos');
    }
  };

  const takePhoto = async (
    cameraRef: RefObject<CameraApi | null>,
  ): Promise<string | undefined> => {
    try {
      if (cameraRef.current !== null) {
        if (!cameraRef.current) {
          const message =
            'No se encontro la camara en el dispositivo ' + cameraRef;
          showModalError(message);
        }
        const photo = await cameraRef.current.capture();
        if (photo) {
          const uri =
            Platform.OS === 'ios' ? photo.path : `file://${photo.path}`;
          return uri;
        } else {
          showModalError('No se encontro la ruta de la foto');
        }
      } else {
        showModalError(
          'No se encontro la camara por favor revise los permisos de la aplicación',
        );
      }
    } catch (error) {
      showModalError('Error al capturar la foto:' + error);
    }

    return;
  };

  const confirm = async (imageUri: string): Promise<undefined | PhotoData> => {
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
        return payload;
      } catch (e: any) {
        Alert.alert('Error:', e);
        console.log('Error in save image:', e);
      }
    } else {
      showModalError('Error al tomar la foto, por vaor vuelva a intentarlo');
    }
  };

  return {
    showCamera,
    checkPermissions,
    takePhoto,
    confirm,
    setShowCamera,
  };
};
