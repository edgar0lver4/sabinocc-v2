import { useRef, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { FromCamera } from './types';
import { useModalError } from '../../../../hooks/useModalError';
import { Portal, Text } from 'react-native-paper';
import CapturedView from './components/CapturedView';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Button from '../../../../components/buttons';
import { STEEL_WHITE } from '../../../../styles/colors';

export const CameraForm = ({
  showCamera,
  setShowCamera,
  confirm,
  retake,
}: FromCamera) => {
  const device = useCameraDevice('back');

  const [processingImage, setProcessingImage] = useState(false);
  const [tempImage, setTempImage] = useState<string | undefined>('');
  const [showPreview, setShowPreview] = useState(false);
  const { showModalError } = useModalError();
  const cameraRef = useRef<Camera>(null);

  const takePhoto = async () => {
    setProcessingImage(true);
    try {
      if (!cameraRef.current) {
        const message =
          'No se encontro la camara en el dispositivo ' + cameraRef;
        showModalError(message);
        return;
      }
      const photo = await cameraRef.current.takePhoto();
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

  if (!showCamera || !device) return null;
  return (
    <Portal>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          photo={true}
          device={device}
          isActive
        />
        {!showPreview && (
          <View style={styles.cameraBtnContainer}>
            {!processingImage ? (
              <Button.Icon
                colorIcon={STEEL_WHITE}
                iconSize={40}
                onPress={takePhoto}
                name="camera"
              />
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
