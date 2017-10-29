import StoreModel from "../../models/store";

const staticStore = new StoreModel(42);
export function getStore() {
  return staticStore;
}
