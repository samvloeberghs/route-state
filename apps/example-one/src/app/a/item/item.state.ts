import { Item } from './item.model';

export interface ItemStateModel {
  item?: Item;
  url?: string;
  oneForm?: {
    data: {[p:string]: any};
    submitted: boolean;
  }
}
