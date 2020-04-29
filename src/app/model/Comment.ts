import {ShortUserDto} from './ShortUserDto';

export interface Comment {
  id: number;
  user: ShortUserDto;
  text: string;
  karma: number;
  parentId: number;
  postId: number;
  creationTime: Date;
}
