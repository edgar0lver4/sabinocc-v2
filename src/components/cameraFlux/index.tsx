import { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import CapturedView from '../../screens/auth/Report/Forms/components/CapturedView';
import { styles } from './styles';
import { CameraBtn } from '../../screens/auth/Report/Forms/components/Buttons/CameraBtn';
import { useCameraController } from './hooks/useCameraController';
import { Props } from './types';
import { Portal } from 'react-native-paper';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { STEEL_WHITE } from '../../styles/colors';
import Button from '../buttons';

const CameraFlux = ({ onConfirm }: Props) => {
  const [processingImage, setProcessingImage] = useState(false);
  const [tempImage, setTempImage] = useState<string | undefined>('');
  const [showPreview, setShowPreview] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const { showCamera, checkPermissions, takePhoto, setShowCamera, confirm } =
    useCameraController();

  const device = useCameraDevice('back');

  const handleTake = async () => {
    setProcessingImage(true);
    const uri = await takePhoto(cameraRef);
    if (uri) {
      setTempImage(uri);
      setShowPreview(true);
    }
    setProcessingImage(false);
  };

  const handleConfirm = async () => {
    const tempUri = tempImage || '';
    const photo = await confirm(tempUri);
    if (photo) {
      onConfirm(photo);
      setShowPreview(false);
      setShowCamera(false);
    }
  };

  const handleRetake = () => {
    setShowPreview(false);
  };

  if (!showCamera)
    return (
      <CameraBtn onPress={checkPermissions} style={{ marginHorizontal: 16 }} />
    );
  if (!device) return <></>;
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
                onPress={handleTake}
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

export default CameraFlux;
