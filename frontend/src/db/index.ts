import * as localforage from 'localforage';
const strage_bag = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'bag db',
  version: 4,
});
const strage_like = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'like db',
  version: 4,
});
export interface Product {
  id: string;
  longDescription: string;
  name: string;
  price: string;
  useage: string;
  KeyFeatures: string;
  Details?: null;
  ShppingRestrictions?: null;
  Catagory: string;
  subCatagory: string;
  gallery?: GalleryEntity[];
  curr: number;
}
export interface GalleryEntity {
  id: string;
  url: string;
  isImage: boolean;
}
export const add_cart = async (prodict: Product) =>
  await strage_bag.setItem(prodict.id, prodict);
export const ischack_product_in_cart = async (id: string) =>
  (await strage_bag.getItem(id)) ? true : false;
export const ischack_product_in_like = async (id: string) =>
  (await strage_bag.getItem(id)) ? true : false;
export const count_product_in_bag = async () => await strage_bag.length();
export const count_product_in_like = async () => await strage_like.length();
export const remove_product_cart = (id: string) => {};
export const add_like = async (prodict: Product) =>
  await strage_like.setItem(prodict.id, prodict);
export const chack_product_in_like = (id: string) => {};
export const remove_product_like = (id: string) => {};
