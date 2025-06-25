import { IUniversity } from '../University/university.interface';

export interface ICountry {
  cid: string;
  name: string;
  flagUrl?: string;
  continent?: string;
  universities?: IUniversity[];
}
