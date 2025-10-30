import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Typography from '../../../../../components/typography';
import { Image, ImageSourcePropType, View } from 'react-native';
import { style } from './style';
import { Props } from './type';
import { useMemo } from 'react';

export const ReportVisualizer = ({
  date,
  description,
  image,
  ref,
  type,
  ubication,
  isBase64,
}: Props) => {
  const ImageSource: ImageSourcePropType = useMemo(() => {
    if (isBase64) {
      return {
        uri: `data:image/png;base64,${image}`,
      };
    }
    return {
      uri: image,
    };
  }, [image, isBase64]);

  return (
    <BottomSheetModal
      enableDynamicSizing
      ref={ref}
      index={1}
      snapPoints={['80%', '80%']}
    >
      <BottomSheetView style={style.container}>
        <Typography.Title>Detalles del reporte</Typography.Title>
        <View>
          <Image source={ImageSource} style={style.referenceImage} />
        </View>
        <View style={style.details}>
          <Typography.DescriptionBold>
            Donde: {ubication}
          </Typography.DescriptionBold>
          <Typography.DescriptionBold>Tipo: {type}</Typography.DescriptionBold>
        </View>
        <View>
          <Typography.DescriptionBold>
            Fecha programada: {date}
          </Typography.DescriptionBold>
          <Typography.Subtitle>Descripción del problema</Typography.Subtitle>
          <Typography.DescriptionBold>{description}</Typography.DescriptionBold>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
