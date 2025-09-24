import { FlatList, Image } from 'react-native';
import { Props } from './types';
import { PhotoData } from '../../types';
import { style } from './style';

const ImageVisor = ({ items }: Props) => {
  const renderItem = (item: PhotoData) => {
    return (
      <Image
        source={{ uri: 'data:image/png;base64,' + item.fileContent }}
        width={120}
        height={120}
        style={style.image}
      />
    );
  };

  if (items.length === 0) return null;
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => renderItem(item)}
      numColumns={3}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ImageVisor;
