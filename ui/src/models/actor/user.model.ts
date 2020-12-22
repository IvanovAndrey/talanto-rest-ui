import {AbstractEntity} from '../response/abstract.entity.model';
import {Credentials} from '../info/credentials.model';

export interface User extends AbstractEntity {
  name: string;
  personType: string;
  isAuthenticated: boolean;
  credentials: Credentials;
}
