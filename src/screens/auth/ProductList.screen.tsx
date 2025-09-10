import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE_DARK, BLUE_LIGHT, YELLOW_LIGHT} from '../../styles/colors';
import {useCallback, useState} from 'react';
import Loader from '../../components/loader';
import {getProductList} from '../../services/products/service';
import {useFocusEffect} from '@react-navigation/native';
import ProductCard from '../../components/product.card';
import {TProductResponse} from '../../services/products/services.types';

const ProductsListScreen = ({navigation: {navigate}}: any) => {
  const [productList, setProductList] = useState<Array<TProductResponse>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    setIsLoading(true);
    const products = await getProductList();
    if (products.length > 0) {
      setProductList(products);
    }
    setIsLoading(false);
  };

  const handleChangeScreen = (id: string | number) => {
    setIsLoading(true);
    navigate('Product', {id: id});
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      init();
    }, []),
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BLUE_LIGHT}}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <View style={style.headerContainer}>
        <Text
          style={{
            color: YELLOW_LIGHT,
            fontWeight: 'bold',
            fontSize: 24,
            letterSpacing: 0.5,
          }}>
          Nuestros desarrollos
        </Text>
      </View>
      <ScrollView style={style.containerList}>
        {productList.map(itm => (
          <ProductCard
            key={itm.id}
            product={itm}
            onPress={handleChangeScreen}
          />
        ))}
      </ScrollView>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    paddingBottom: 16,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: BLUE_DARK,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    elevation: 5,
  },
  containerList: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default ProductsListScreen;
