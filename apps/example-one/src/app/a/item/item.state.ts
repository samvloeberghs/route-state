export interface ItemState {
  url?: string;
  oneForm?: {
    data: {[p:string]: any};
    submitted: boolean;
  }
}
