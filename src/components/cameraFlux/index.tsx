import { useRef, useState } from 'react';
import { Camera, CameraApi, CameraType } from 'react-native-camera-kit';
import { Button, Text, View } from 'react-native';
import CapturedView from '../../screens/auth/Report/Forms/components/CapturedView';
import { styles } from './styles';
import { CameraBtn } from '../../screens/auth/Report/Forms/components/Buttons/CameraBtn';
import { useCameraController } from './hooks/useCameraController';
import { Props } from './types';

const CameraFlux = ({ onConfirm }: Props) => {
  const [processingImage, setProcessingImage] = useState(false);
  const [tempImage, setTempImage] = useState<string | undefined>('');
  const [showPreview, setShowPreview] = useState(false);
  const cameraRef = useRef<CameraApi>(null);
  const { showCamera, checkPermissions, takePhoto, setShowCamera, confirm } =
    useCameraController();
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
  return (
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
            <Button title="Tomar foto" onPress={handleTake} />
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
  );
};

export default CameraFlux;
