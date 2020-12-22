import {AbstractEntity} from './response/abstract.entity.model';

export class Lesson extends AbstractEntity {
  idTeacher: number;
  theme: string;
  commentary: string;
  status: string;
  dateOfLesson: Date;
}
