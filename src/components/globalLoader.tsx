import { useAppSelector } from '../redux';
import Loader from './loader';

const GlobalLoader = () => {
  const loaderStore = useAppSelector(store => store.loader);

  if (!loaderStore.isOpen) return null;

  return <Loader title={loaderStore.title} />;
};

export default GlobalLoader;
