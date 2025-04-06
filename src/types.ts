export interface BookData {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  description: string;
  coverImgUrl: string;
}

export interface ReviewData {
  id: number;
  content : string;
  author: string;
  createdAt : string;
  bookId : number;
}

// --------------------------------------------------------

export interface CGCproduct {
  id: number;
  name: string;
  expirationDate: string;
  expirationDateNewLot: string;
  suggestedRetailPrice: string;
  suggestedWholesalePrice: string;
  specification: string;
  category: string;
  type: string;
  itemFeatures: string;
  imageA: string;
  imageB: string;
}