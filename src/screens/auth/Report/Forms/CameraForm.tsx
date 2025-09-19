import { useRef, useState } from 'react';
import { Button, Platform, View } from 'react-native';
import { Camera, CameraApi, CameraType } from 'react-native-camera-kit';
import { styles } from './style';
import { FromCamera } from './types';
import { useModalError } from '../../../../hooks/useModalError';
import { Portal, Text } from 'react-native-paper';
import CapturedView from './components/CapturedView';

export const CameraForm = ({
  showCamera,
  setShowCamera,
  confirm,
  retake,
}: FromCamera) => {
  const [processingImage, setProcessingImage] = useState(false);
  const [tempImage, setTempImage] = useState<string | undefined>('');
  const [showPreview, setShowPreview] = useState(false);
  const { showModalError } = useModalError();
  const cameraRef = useRef<CameraApi>(null);

  const takePhoto = async () => {
    setProcessingImage(true);
    try {
      if (!cameraRef.current) {
        const message =
          'No se encontro la camara en el dispositivo ' + cameraRef;
        showModalError(message);
        return;
      }
      const photo = await cameraRef.current.capture();
      if (photo) {
        const path = photo?.path ?? '';
        const uri = path.startsWith('file://') ? path : `file://${path}`;
        setTempImage(uri);
        setShowPreview(true);
      } else {
        showModalError('No se encontro la ruta de la foto');
      }
    } catch (error) {
      showModalError('Error al capturar la foto:' + error);
    }
    setProcessingImage(false);
  };

  const handleConfirm = async () => {
    const tempUri = tempImage || '';
    setShowCamera(false);
    setShowPreview(false);
    await confirm(tempUri);
  };

  const handleRetake = () => {
    setShowPreview(false);
    retake();
  };

  if (!showCamera) return null;
  return (
    <Portal>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          cameraType={CameraType.Back}
          flashMode="auto"
        />
        {!showPreview && (
          <View style={styles.cameraBtnContainer}>
            {!processingImage ? (
              <Button title="Tomar foto" onPress={takePhoto} />
            ) : (
              <Text style={styles.description}>Cargando foto</Text>
            )}
          </View>
        )}
        {showPreview && (
          <CapturedView
            capturedPhoto={tempImage}
            confirm={handleConfirm}
            retake={handleRetake}
          />
        )}
      </View>
    </Portal>
  );
};
