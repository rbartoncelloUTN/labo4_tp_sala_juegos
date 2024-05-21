import { Flags } from '../../services/Country/interface';
export interface Country {
  name: string;
  flag: {
    image: string;
    alt?: string;
  };
  isAnwer?: boolean;
}
