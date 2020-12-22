import {AbstractEntity} from './response/abstract.entity.model';

export interface NotificationModel extends AbstractEntity {
  // id: number;
  idFrom: number;
  idTo: number;
  status: string;
  theme: string;
  text: string;
}
