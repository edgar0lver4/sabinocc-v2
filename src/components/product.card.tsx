import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BLUE_DARK, BLUE_LIGHT, YELLOW_LIGHT} from '../styles/colors';
import {TProductResponse} from '../services/products/services.types';

type Props = {
  product: TProductResponse;
  onPress: (val: string | number) => void;
};

const ProductCard = ({product, onPress}: Props) => {
  const handlePress = () => {
    onPress(product.id);
  };
  return (
    <View style={style.container} key={product.id}>
      <Image source={{uri: product.image}} style={style.imageProduct} />
      <Text
        style={{
          ...style.titleText,
          color: product.isProxime ? YELLOW_LIGHT : '#fff',
        }}>
        {product.isProxime && 'Proximamente '}
        {product.name}
      </Text>
      <Text style={style.textDescription}>{product.description}</Text>
      <TouchableOpacity style={style.button} onPress={handlePress}>
        <Text style={style.buttonText}>Mas información</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: BLUE_DARK,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  imageProduct: {width: '100%', height: 160, borderRadius: 8},
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  textDescription: {fontSize: 16, color: '#fff', textAlign: 'justify'},
  button: {
    height: 48,
    width: '100%',
    backgroundColor: BLUE_LIGHT,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ProductCard;
