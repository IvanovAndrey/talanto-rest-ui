import {AbstractEntity} from './response/abstract.entity.model';

export class Complaint extends AbstractEntity {
  // id: number;
  idLesson: number;
  theme: string;
  text: string;
}
