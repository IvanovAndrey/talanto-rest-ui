import {AbstractEntity} from '../response/abstract.entity.model';
import {Credentials} from '../info/credentials.model';

export interface User extends AbstractEntity {
  name: string;
  login: string;
  status: string;
  isAuthenticated: boolean;
  credentials: Credentials;
}
