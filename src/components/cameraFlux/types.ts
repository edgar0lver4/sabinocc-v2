export type PhotoData = {
  fileName: any;
  contentType: any;
  fileContent: string;
};

export type Props = {
  onConfirm: (val: PhotoData) => void;
};
