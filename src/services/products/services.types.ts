export type TProductResponse = {
  id: number;
  name: string;
  description: string;
  web: string;
  image: string;
  ubication: string;
  ubicationURL: string;
  price: number;
  isProxime: boolean;
};

export type TProductDetailResponse = {
  id: number;
  name: string;
  description: string;
  web: string;
  images: Array<string> | null;
  image: string;
  ubication: string;
  ubicationURL: string;
  price: number;
  isProxime: boolean;
  videoId: string | null;
  lat: number;
  lon: number;
};

export type TProductLeadRequest = {
  id_product: number;
  email: string;
  name: string;
  phone: string;
};
