import { ItemState } from '../items.state';

export interface Item {
  id: number;
  name: string;
  role: string;
  state?: ItemState;
}
