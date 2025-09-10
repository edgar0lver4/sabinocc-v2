export type TActivitiesResponse = {
  data: Array<TActivity>;
};

export type TActivity = {
  id: number;
  title: string;
  description: string;
  date: string;
  hour: string;
  image: string;
  isRegister: boolean;
};
